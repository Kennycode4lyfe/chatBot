const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const { connect } = require("./database/index");
const server = require("http").createServer(app);
const userRouter = require("../backend/routes/userRoutes");
const itemRouter = require("./routes/itemsRoute");
const orderModel = require("./model/index").OrderModel;
const itemModel = require("./model/index").ItemModel;
const io = require("socket.io")(server);

require("dotenv").config();
const Port = process.env.PORT;
const mongoUri = process.env.MONGODB_URL;
const path = require("path");
const { OrderModel } = require("./model/index");
const staticFilePath = path.join(
  "/Users",
  "HP",
  "Desktop",
  "chatBot",
  "frontend",
  "public"
);
const prodStaticFilePath = process.env.PROD_STATIC_PATH;

connect(mongoUri);

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
});

app.use(sessionMiddleware);
app.use(express.static(prodStaticFilePath || staticFilePath));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

require("./middleware/passport");
app.use(userRouter);
app.use(itemRouter);

// convert a connect middleware to a Socket.IO middleware
const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

io.use((socket, next) => {
  if (socket.request.user) {
    next();
  } else {
    next(new Error("unauthorized"));
  }
});

io.on("connect", (socket) => {
  console.log(`new connection ${socket.id}`);

  socket.on("num1", function (message) {
    socket.emit("order_options", message);
  });

  socket.on("orders", async function (message) {
    console.log(message);
    const options = {
      2: "chicken",
      4: "chips",
      6: "burger",
      8: "Sharwarma",
    };

    const orderNum = message.number;
    console.log(orderNum);
    const customerMeal = options[orderNum];

    const item = await itemModel.findOne({ name: customerMeal });
    console.log(item);
    const itemId = socket.request.user._id;
    const customerOrder = await OrderModel.findOne({ _id: itemId });

    if (customerOrder) {
      const customerMealPrice = item.price;

      const updatedCustomerOrder = await OrderModel.findOneAndUpdate(
        { _id: itemId },
        {
          total_price: customerOrder.total_price + customerMealPrice,
          $push: {
            items: {
              name: item.name,
              price: item.price,
            },
          },
        },
        {
          returnOriginal: false,
        }
      );
      const customerOrderDetails = {
        item: customerMeal,
        total_price: updatedCustomerOrder.total_price,
      };

      console.log(customerOrderDetails);
      socket.emit("order_details", customerOrderDetails);
    } else {
      const userOrder = await OrderModel.create({
        _id: itemId,
        total_price: 0 + item.price,

        items: [
          {
            name: item.name,
            price: item.price,
            quantity: 0,
          },
        ],
      });

      const newCustomerOrder = {
        item: customerMeal,
        total_price: userOrder.total_price,
      };

      console.log(newCustomerOrder);
      socket.emit("order_details", newCustomerOrder);
    }

  });

  console.log(socket.request.user);
  const session = socket.request.session;
  console.log(`saving sid ${socket.id} in session ${session.id}`);
  session.socketId = socket.id;
  session.save();
});

io.on("connect", (socket) => {
  socket.on("order_history", async function (message) {
    console.log(message);
    const userId = socket.request.user._id;
    const userOrder = await orderModel.findOne({ _id: userId });
    if (!userOrder) {
      socket.emit("show_order_history", {
        message: "you have no previous orders",
      });
    } else {
      const userOrderItems = userOrder.items;
      socket.emit("show_order_history", {message:userOrderItems});
    }
  });
});

io.on("connect", (socket) => {
  socket.on("cancel_order", async function (message) {
    console.log(message);
    const userId = socket.request.user._id;
    const userOrder = await orderModel.findOneAndDelete({ _id: userId });
    if (!userOrder) {
      socket.emit("order_cancelled", {
        name: "chatBot",
        message: "you have no orders",
      });
    } else {
      socket.emit("order_cancelled", {
        name: "chatBot",
        message: "your order is cancelled",
      });
    }
  });
});

io.on("connect", (socket) => {
  socket.on("checkout_order", async function (message) {
    console.log(message);
    const userId = socket.request.user._id;
    const userOrder = await orderModel.findOne({ _id: userId });
    console.log(userOrder);
    if (userOrder === null) {
      socket.emit("place_order", {
        name: "chatBot",
        total_price: "no order to be placed",
      });
    } else {
      socket.emit("place_order", {
        name: "chatBot",
        total_price: userOrder.total_price,
      });
    }
  });
});

io.on("connect", (socket) => {
  socket.on("current_order", async function (message) {
    console.log(message.number);
    const userId = socket.request.user._id;
    const userOrder = await orderModel.findOne({ _id: userId });

    if (!userOrder) {
      socket.emit("show_current_order", {
        name: "chatBot",
        currentOrder: "no current orders",
      });
    } else {
      const userOrderItems = userOrder.items;
      const current_order = userOrderItems[userOrderItems.length - 1];
      socket.emit("show_current_order", {
        name: "chatBot",
        currentOrder: current_order,
      });
    }
  });
});

server.listen(Port, () => {
  console.log(`server listening on port ${Port}`);
});
