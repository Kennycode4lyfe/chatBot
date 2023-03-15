(function(){
	const app = document.querySelector(".banner");
	let messageValue = app.querySelector(".chat-screen #message-input").value 
	const socket = io();
let username
const messageScreen = document.querySelector('.banner')
messageScreen.querySelector('.float').addEventListener('click',function(){
 const messageButton = document.getElementById('float')
 messageButton.style.display = 'none'
document.getElementById('chat-screen').style.display='block'
renderMessage('options',{
	username:'chatBot'
})
})

const exitButton = messageScreen.querySelector('#exit-chat')
exitButton.addEventListener('click',function(){
    const messageButton = document.getElementById('float')
    messageButton.style.display = 'block'
   document.getElementById('chat-screen').style.display='none'
})
	














	app.querySelector(".chat-screen #send-message").addEventListener("click",function(){
		let message = app.querySelector(".chat-screen #message-input").value;
console.log(message)
		

		if(message.length  == 0 ){
			return;
		}
		if(message==='1'){
			console.log(message)
		renderMessage("my",{
			username:'chatBot',
			text:message
		});
		socket.emit("num9",{
			username:'chatBot',
			text:message
		});
		socket.on("chat",function(message){
		renderMessage("num9",message);
	});
		
	}

	if(message==='6'||message==='2'||message==='4'||message==='8'){
		console.log(message)
		renderMessage("my",{
			username:'You',
			text:message
		})
	socket.emit("num6",{
		username:'chatBot',
		text:'burger',
		number:message
	});
	
	socket.on('burger', function(message){
		renderMessage('order',message)
		})
}
	app.querySelector(".chat-screen #message-input").value = "";
	});


// socket.on("chat",function(message){
// 		renderMessage("num9",message);
// 	});

// socket.on('burger', function(message){
// renderMessage('order',message)
// })

	function renderMessage(type,message){
		let messageContainer = app.querySelector(".chat-screen .messages");
		if(type == "my"){
			let el = document.createElement("div");
			el.setAttribute("class","message my-message");
			el.innerHTML = `
				<div>
					<div class="name">You</div>
					<div class="text">${message.text}</div>
				</div>
			`;
			messageContainer.appendChild(el);
		} else if(type == "other"){
			let el = document.createElement("div");
			el.setAttribute("class","message other-message");
			el.innerHTML = `
				<div>
					<div class="name">${message}</div>
					<div class="text">welcome ${message}</div>
				</div>
			`;
			
			messageContainer.appendChild(el);
		}

		else if(type == "order"){
			let el = document.createElement("div");
			el.setAttribute("class","message other-message");
			el.innerHTML = `
				<div>
					<div class="name">chatBot</div>
					<div class="text">${message.item} added to order</div>
					<div class="text">total price is ${message.total_price}</div>
				</div>
			`;
			
			messageContainer.appendChild(el);
		}
		else if(type == "options"){
			let el = document.createElement("div");
			el.setAttribute("class","message other-message");
			el.innerHTML = `
				<div>
					<div class="name">${message.username}</div>
					<div class="text">
					<ul class="nav-details">
					<li>select 1 to place an order</li>
					<li>select 99 to checkout an order</li>
					<li>select 97 to see current order</li>
					<li>select 0 to cancel order</li>
				</ul>

					</div>
				</div>
			`
			messageContainer.appendChild(el);
		}
		else if(type == "num9"){
			let el = document.createElement("div");
			el.setAttribute("class","message other-message");
			el.innerHTML = `
				<div>
					<div class="name">${message.username}</div>
					<div class="text">
					<ul class="nav-details">
					<li>select 2 to order chicken</li>
					<li>select 4 to order chips</li>
					<li>select 6 to order burger</li>
					<li>select 8 to order sharwarma</li>
				</ul>

					</div>
				</div>
			`
			messageContainer.appendChild(el);
		}
		 else if(type == "update"){
			let el = document.createElement("div");
			el.setAttribute("class","update");
			el.innerText = message;
			messageContainer.appendChild(el);
		}
		// scroll chat to end
		messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
	}

})();