(function () {
  const app = document.querySelector(".banner");
  let messageValue = app.querySelector(".chat-screen #message-input").value;
  const socket = io();
  let username;
  const messageScreen = document.querySelector(".banner");
  messageScreen.querySelector(".float").addEventListener("click", function () {
    const messageButton = document.getElementById("float");
    messageButton.style.display = "none";
    document.getElementById("chat-screen").style.display = "block";
	const messagePrompt= document.getElementById("message-check")
	if(messagePrompt){
		return
	}
	else{
    renderMessage("options", {
      username: "chatBot",
    });}
  });

  const exitButton = messageScreen.querySelector("#exit-chat");
  exitButton.addEventListener("click", function () {
    const messageButton = document.getElementById("float");
    messageButton.style.display = "block";
    document.getElementById("chat-screen").style.display = "none";
  });

  app
    .querySelector(".chat-screen #send-message")
    .addEventListener("click", function () {
      let message = app.querySelector(".chat-screen #message-input").value;
      console.log(message);

      if (message.length == 0) {
        return;
      }

     else if (message === "1") {
        console.log(message);
        renderMessage("my", {
          username: "chatBot",
          text: message,
        });
        socket.emit("num1", {
          username: "chatBot",
          text: message,
        });
        socket.on("order_options", function (message) {
          renderMessage("order_options", message);
          socket.off("order_options");
        });
      }

     else if (
        message === "6" ||
        message === "2" ||
        message === "4" ||
        message === "8"
      ) {
        console.log(message);
        renderMessage("my", {
          username: "You",
          text: message,
        });
        socket.emit("orders", {
          username: "chatBot",
          number: message,
        });

        socket.on("order_details", function (message) {
          console.log(message);
          renderMessage("order", message);
          renderMessage("checkout_order", {});
          socket.off("order_details");
        });
      }

     else if (message === "99") {
        console.log(message);
        renderMessage("my", {
          username: "You",
          text: message,
        });

       
        socket.emit("checkout_order", {
          username: "chatBot",
          number: message,
        });

        socket.on("place_order", function (message) {
          console.log(message);

          renderMessage("order_placed", message);
          socket.off("place_order");
        })
      
      }

     else if (message === "97") {
        console.log(message);
        renderMessage("my", {
          username: "You",
          text: message,
        });
        socket.emit("current_order", {
          username: "chatBot",
          number: message,
        });

        socket.on("show_current_order", function (message) {
          console.log(message);

          renderMessage("current_order", message);
          socket.off("show_current_order");
        });
      }

     else if (message === "98") {
        console.log(message);
        renderMessage("my", {
          username: "You",
          text: message,
        });
        socket.emit("order_history", {
          username: "chatBot",
          number: message,
        });

        socket.on("show_order_history", function (message) {
          console.log(message);

          renderMessage("order_history", message);
          socket.off("show_order_history");
        });
      }

     else if (message === "0") {
        console.log(message);
        renderMessage("my", {
          username: "You",
          text: message,
        });
        socket.emit("cancel_order", {
          username: "chatBot",
          number: message,
        });

        socket.on("order_cancelled", function (message) {
          console.log(message);

          renderMessage("cancel_order", message);
          socket.off("order_cancelled");
        });
      }

      app.querySelector(".chat-screen #message-input").value = "";
    });


  function renderMessage(type, message) {
    let messageContainer = app.querySelector(".chat-screen .messages");
    if (type == "my") {
      let el = document.createElement("div");
      el.setAttribute("class", "message my-message");
      el.innerHTML = `
				<div>
					<div class="name">You</div>
					<div class="text">${message.text}</div>
				</div>
			`;
      messageContainer.appendChild(el);
    } else if (type == "other") {
      let el = document.createElement("div");
      el.setAttribute("class", "message other-message");
      el.innerHTML = `
				<div>
					<div class="name">${message}</div>
					<div class="text">welcome ${message}</div>
				</div>
			`;

      messageContainer.appendChild(el);
    } else if (type == "order") {
      let el = document.createElement("div");
      el.setAttribute("class", "message other-message");
      el.innerHTML = `
				<div>
					<div class="name">chatBot</div>
					<div class="text">${message.item} added to order</div>
					<div class="text">total price is ${message.total_price}</div>
				</div>
			`;

      messageContainer.appendChild(el);
    } else if (type == "checkout_order") {
      let el = document.createElement("div");
      el.setAttribute("class", "message other-message");
      el.innerHTML = `
				<div>
					<div class="name">chatBot</div>
					<div class="text">select 99 to checkout order or 1 to place an order</div>
				</div>
			`;

      messageContainer.appendChild(el);
    } else if (type == "current_order") {
      if(typeof(message.currentOrder)==='string'){
        console.log(typeof(message.currentOrder))
        let el = document.createElement("div");
      el.setAttribute("class", "message other-message");
      el.innerHTML = `
				<div>
					<div class="name">${message.name}</div>
					<div class="text">${message.currentOrder}</div>
          <div> select 1 to order </div>					
				</div>
			`;

      messageContainer.appendChild(el);
      }
      else{
      let el = document.createElement("div");
      el.setAttribute("class", "message other-message");
      el.innerHTML = `
				<div>
					<div class="name">${message.name}</div>
					<div class="text">current order is:</div>
					<div class="text">${message.currentOrder.name} #${message.currentOrder.price}</div>
					
				</div>
			`;

      messageContainer.appendChild(el);}
    } else if (type == "order_history") {
      console.log(typeof(message))
      console.log(message)
      if(typeof(message.message)==='object'){
      let el = document.createElement("div");
      el.setAttribute("class", "message other-message");
      el.innerHTML = `
				<div>
				<table id="orders">
				<tr>
				  <th>item</th>
				  <th>price</th>
				</tr>
			  </table>
				</div>
			`;
      messageContainer.appendChild(el);

      console.log(message);
      message.message.forEach((element) => {
        console.log(element.name);
        const orderTable = document.querySelectorAll("#orders");
        console.log(orderTable);
        const row = orderTable[orderTable.length - 1].insertRow(-1);

        let column1 = row.insertCell(0);
        let column2 = row.insertCell(1);

        column1.innerText = element.name;
        column2.innerText = element.price;
      })}
      else{
        let el = document.createElement("div");
      el.setAttribute("class", "message other-message");
      el.innerHTML = `
				<div>
					<div class="name">chatBot</div>
					<div class="text">${message.message}</div>
          <div>select 1 to order</div>
				</div>
			`;

      messageContainer.appendChild(el); 
      }
    } else if (type == "order_placed") {
      let el = document.createElement("div");
      el.setAttribute("class", "message other-message");
      console.log(typeof message);
      if (typeof message.total_price == "string") {
        el.innerHTML = `
				<div>
					<div class="name">${message.name}</div>
					<div class="text">${message.total_price}</div>
					<div> select 1 to place an order <div>
				</div>
			`;
        messageContainer.appendChild(el);
      } else {
        el.innerHTML = `
				<div>
					<div class="name">${message.name}</div>
					<div class="text">order placed</div>
					<div class="text">total price is ${message.total_price}</div>
				</div>
			`;

        messageContainer.appendChild(el);
      }
    } else if (type == "cancel_order") {
      let el = document.createElement("div");
      el.setAttribute("class", "message other-message");

      el.innerHTML = `
				<div>
					<div class="name">${message.name}</div>
					<div class="text">${message.message}</div>
					<div>select 1 to order</div>
				</div>
			`;

      messageContainer.appendChild(el);
    } else if (type == "options") {
      let el = document.createElement("div");
      el.setAttribute("class", "message other-message")
	  el.setAttribute("id", "message-check")
      el.innerHTML = `
				<div>
					<div class="name">${message.username}</div>
					<div>select 1 to place an order</div>
					<div>select 97 to see current order</div>
					<div>select 98 to see order history</div>
					<div>select 99 to checkout an order<div>
					<div>select 0 to cancel order</div>
				</div>
			`;
      messageContainer.appendChild(el);
    } else if (type == "order_options") {
      let el = document.createElement("div");
      el.setAttribute("class", "message other-message");
      el.innerHTML = `
				<div>
					<div class="name">${message.username}</div>
					<div>select 2 to order chicken</div>
					<div>select 4 to order chips</div>
					<div>select 6 to order burger</div>
					<div>select 8 to order sharwarma</div>
				</div>
			`;
      messageContainer.appendChild(el);
    } else if (type == "update") {
      let el = document.createElement("div");
      el.setAttribute("class", "update");
      el.innerText = message;
      messageContainer.appendChild(el);
    }
    // scroll chat to end
    messageContainer.scrollTop =
      messageContainer.scrollHeight - messageContainer.clientHeight;
  }
})();
