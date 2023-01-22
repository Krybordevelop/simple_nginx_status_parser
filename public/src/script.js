
window.onload = function(){
// if user is running mozilla then use it's built-in WebSocket
window.WebSocket = window.WebSocket || window.MozWebSocket;
var connection = new WebSocket('ws://127.0.0.1:8999');
connection.onopen = function () {};
connection.onerror = function (error) {};
connection.onmessage = function (message) {
    // try to decode json (I assume that each message
    // from server is json)
    try {
      var json = JSON.parse(message.data);
      show(json)
      console.log(json["Accepts Total"])
    } catch (e) {
        console.log(e)
         console.log('This doesn\'t look like a valid JSON: ',
          message.data);
      return;
    }
    // handle incoming message
};


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
}