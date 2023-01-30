
window.onload = function(){
// if user is running mozilla then use it's built-in WebSocket


}

var validate_url = "https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)"

function show(message){
  document.querySelector('.Active_connections').innerHTML = message['Active connections']
  document.querySelector('.Accepts_Total').innerHTML = message['Accepts Total']
  document.querySelector('.Handled_Total').innerHTML = message['Handled Total']
  document.querySelector('.Requests_Total').innerHTML = message['Requests Total']
  document.querySelector('.Reading').innerHTML = message['Reading']
  document.querySelector('.Writing').innerHTML = message['Writing']
  document.querySelector('.Waiting').innerHTML = message['Waiting']
  document.querySelector('.Raw_Data').innerHTML = message['Raw Data']
  //let div = document.querySelector('.content')
  //div.innerHTML = message
}

window.WebSocket = window.WebSocket || window.MozWebSocket;
var connection = new WebSocket('ws://127.0.0.1:8999');
connection.onopen = function () {};
connection.onerror = function (error) {};
connection.onmessage = function (message) {
  //console.log(message)
    try {
      var json = JSON.parse(message.data);
      console.log(json)
    } catch (e) {
        console.log('This doesn\'t look like a valid JSON: ',message.data);
      return;
    }
};


function sendSocket(message, interval = 1){
  let res = {}
  res.message = message
  res.interval = document.querySelector("#interval").value
  res.url = document.querySelector("#url").value
  connection.send(JSON.stringify(res))
}


document.querySelector("#start").addEventListener('click', ()=>{sendSocket('start')})
document.querySelector("#stop").addEventListener('click', () =>{sendSocket('stop')})