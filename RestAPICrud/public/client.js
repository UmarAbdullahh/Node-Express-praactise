const form = document.getElementById('form');
const input = document.getElementById('input');
let messages=document.getElementById('messages')
const id=prompt('enter user id')
const queryaprams={userId:id}
const socket=io({query:queryaprams})
form.addEventListener('submit',function(e){
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
      }
    });
    socket.on('chat message', function(msg){
            let item = document.createElement('li');
            item.textContent = msg
            messages.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);         
      })
      socket.once("connect", () => {
        socket.on("online", (userId) => {
            console.log(userId, "Is Online!"); // update online status
            document.getElementById("logs").innerHTML += "<div>" + userId + " Is Online! </div>";
        });
        socket.on("offline", (userId) => {
            console.log(userId, "Is Offline!"); // update offline status
            document.getElementById("logs").innerHTML += "<div>" + userId + " Is Offline! </div>";
        }); 
    });