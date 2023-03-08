const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require("express-session");
const {connect} = require('./database/index')
const server = require("http").createServer(app);
const userRouter = require('../backend/routes/userRoutes')
const io = require("socket.io")(server);
require('dotenv').config()
const Port= process.env.PORT
const mongoUri = process.env.MONGODB_URL
connect(mongoUri)
require('./middleware/passport')

const sessionMiddleware = session({ secret:process.env.SESSION_SECRET ,
 resave: false, 
 saveUninitialized: false });

app.use(sessionMiddleware);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(userRouter)


passport.serializeUser((user, cb) => {
    console.log(`serializeUser ${user}`);
    cb(null, user._id);
  });
  
  passport.deserializeUser((id, cb) => {
    console.log(`deserializeUser ${id}`);
    cb(null, id);
  });

// io.on("connection", function(socket){
// 	socket.on("newuser",function(username){
// 		socket.broadcast.emit("update", username + " joined the conversation");
// 	});
// 	socket.on("exituser",function(username){
// 		socket.broadcast.emit("update", username + " left the conversation");
// 	});
// 	socket.on("chat",function(message){
// 		socket.broadcast.emit("chat", message);
// 	});
// });

// convert a connect middleware to a Socket.IO middleware
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

io.use((socket, next) => {
  if (socket.request.user) {
    next();
  } else {
    next(new Error('unauthorized'))
  }
});

// io.on('connect', (socket) => {
//   console.log(`new connection ${socket.id}`);
//   socket.on('whoami', (cb) => {
//     cb(socket.request.user ? socket.request.user.username : '');
//   });

//   const session = socket.request.session;
//   console.log(`saving sid ${socket.id} in session ${session.id}`);
//   session.socketId = socket.id;
//   session.save();
// });


server.listen(Port,()=>{
    console.log("server listening on port 5000")
});