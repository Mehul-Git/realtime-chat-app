const socket = io('http://localhost:3000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageinp');

const messagecontainer = document.querySelector('.container');
var audio = new Audio('ting.mp3');


const append = (message , position)=>{
    const messageelement = document.createElement('div')
    messageelement.innerText = message;
    messageelement.classList.add('message');
    messageelement.classList.add(position);
    messagecontainer.append(messageelement);
    if (position=='left'){
        audio.play();
    } 
}



const name = prompt('enter your name to join the chat');
socket.emit('new-user-joined' , name);

socket.on('user-joined' , name=>{
    append(`${name} joined the chat` , 'right')
})
socket.on('receive' , data=>{
    append(`${data.name} : ${data.message}` , 'left')
})
socket.on('left' , name=>{
    append(`${name} left the chat` , 'right')

})
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const message = messageInput.value;
        append(`you: ${message}`, 'right');
        socket.emit('send' , message);
        messageInput.value = " ";

    }) 

    





