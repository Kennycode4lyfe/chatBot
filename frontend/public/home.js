(function(){

let username
const messageScreen = document.querySelector('.banner')
messageScreen.querySelector('.float').addEventListener('click',function(){
 const messageButton = document.getElementById('float')
 messageButton.style.display = 'none'
document.getElementById('chat-screen').style.display='block'
})

const exitButton = messageScreen.querySelector('#exit-chat')
exitButton.addEventListener('click',function(){
    const messageButton = document.getElementById('float')
    messageButton.style.display = 'block'
   document.getElementById('chat-screen').style.display='none'
})
	const app = document.querySelector(".banner");
	const socket = io();
	
console.log(typeof(socket))

		socket.on('connect', () => {
			// socketIdSpan.innerText = socket.id;
			socket.emit('newCustomer', (uname) => {
				
				username = uname
				console.log(username)
				app.querySelector(".chat-screen #send-message").addEventListener("click",function(){
					console.log('clicked-button')
				renderMessage('other',username)
					app.querySelector(".chat-screen #message-input").value = "";
				});
			}
			)
			})

			console.log(username)



	app.querySelector(".chat-screen #send-message").addEventListener("click",function({socket}){
console.log('clicked-button')




// 		socket.on('connect', () => {
// 			// socketIdSpan.innerText = socket.id;
// 			socket.emit('newCustomer', (username) => {
// 				console.log(username)
				
				
// 				// usernameSpan.innerText = username;
// renderMessage('other',username)
// 			  });

		//   });

		  
		// let message = app.querySelector(".chat-screen #message-input").value;
		// if(message.length  == 0){
		// 	return;
		// }
		// renderMessage("my",{
		// 	username:uname,
		// 	text:message
		// });
		// socket.emit("chat",{
		// 	username:uname,
		// 	text:message
		// });
		app.querySelector(".chat-screen #message-input").value = "";
	});






	// let uname;

	// app.querySelector(".join-screen #join-user").addEventListener("click",function(){
	// 	let username = app.querySelector(".join-screen #username").value;
	// 	if(username.length == 0){
	// 		return;
	// 	}
	// 	socket.emit("newuser",username);
	// 	uname = username;
	// 	app.querySelector(".join-screen").classList.remove("active");
	// 	app.querySelector(".chat-screen").classList.add("active");
	// });

	// app.querySelector(".chat-screen #send-message").addEventListener("click",function(){
	// 	let message = app.querySelector(".chat-screen #message-input").value;
	// 	if(message.length  == 0){
	// 		return;
	// 	}
	// 	renderMessage("my",{
	// 		username:uname,
	// 		text:message
	// 	});
	// 	socket.emit("chat",{
	// 		username:uname,
	// 		text:message
	// 	});
	// 	app.querySelector(".chat-screen #message-input").value = "";
	// });

	// app.querySelector(".chat-screen #exit-chat").addEventListener("click",function(){
	// 	socket.emit("exituser",uname);
	// 	window.location.href = window.location.href;
	// });

	// socket.on("update",function(update){
	// 	renderMessage("update",update);
	// });
	
	// socket.on("chat",function(message){
	// 	renderMessage("other",message);
	// });

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
		} else if(type == "update"){
			let el = document.createElement("div");
			el.setAttribute("class","update");
			el.innerText = message;
			messageContainer.appendChild(el);
		}
		// scroll chat to end
		messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
	}

})();