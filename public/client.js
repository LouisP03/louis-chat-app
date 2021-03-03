socket = io.connect('https://louis-chat-app-1.herokuapp.com/');

socket.on('chat', (data) => {
    console.log("Received Message: " + data.msg);
    //select the chat box window div and create a div inside of it with the message
    var chatDump = document.querySelector('.chat-dump');
    var div = document.createElement("div");
    div.classList.add('chat-message');

    if(data.name === "") {
        div.innerText = "Anonymous >> " + data.msg;
    } else {
        div.innerText = data.name + " >> " + data.msg;
    };
    //make the newly created message div a child of the chat box div
    chatDump.appendChild(div);
});

chosenName = "";

//event listener to update chosenName variable when a new name is entered
document.getElementById('enterName').addEventListener('input', () => {
    var name = document.getElementById('enterName').value;
    chosenName = name;
});

function sendMessage() {
    //retrieve message that is entered upon function call
    var message = document.getElementById('messageEntry').value;
    var data = {
        msg: message,
        name: chosenName
    };
    var chatDump = document.querySelector('.chat-dump');
    var div = document.createElement('div');
    div.classList.add('chat-message');
    div.style.fontWeight = "bold";
    if (data.name === "") {
        div.innerText = "Anonymous >> " + data.msg;
    } else {
        div.innerText = data.name + " >> " + data.msg;
    };
    chatDump.appendChild(div);

    //send message data to server
    socket.emit('chat', data);
    console.log("Sent message: " + message);
    document.getElementById('messageEntry').value = '';
};