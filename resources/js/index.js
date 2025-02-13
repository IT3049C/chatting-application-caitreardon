
const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");

function formatMessage(message, myNameInput){
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

  if (myNameInput === message.sender){
    return `
      <div class="mine messages"> 
      <div class="message">
      ${message.text}
      </div>
      <div class="sender-info">
      ${formattedTime}
      </div>
      </div>
      `;
  } else{
    return `
    <div class="yours message">
    <div class="message">
    ${message.text}
    </div>
    <div class="sender-info">
    ${formattedTime}
    </div>
    </div>
  `;
  }
}
const serverURL = `https://it3049c-chat.fly.dev/messages`;

async function fetchMessages() {
  const response = await fetch(serverURL);
  return response.json();
}

async function updateMessages() {
  const messages = await fetchMessages();
  let formatMessages = "";
  messages.forEach(message => {
    formatMessages += formatMessage(message, nameInput.value);
  });
  chatBox.innerHTML = formatMessages;

}

function sendMessages(sender, myMessage){
  const time = new Date().getTime();
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;
  const sendMessage = {
    "sender": nameInput.value,
    "text" : myMessage.value,
    "timestamp" : formattedTime
  };
  const messageElement = document.createElement('div');
  messageElement.className = "message";

  messageElement.innerHTML = formatMessage(sendMessage, sender)
  chatBox.appendChild(messageElement);
  
}

function sendMessages(username, text) {
  const newMessage = {
    sender: username,
    text: text,
    timestamp: new Date()
  };

  fetch(serverURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newMessage)
  });
}

sendButton.addEventListener("click", function(event){
  event.preventDefault();
  const sender = nameInput.value;
  const message = myMessage.value;
  sendMessages(sender, message);
  myMessage.value = ""
  console.log("Message Sent")
});

updateMessages();
