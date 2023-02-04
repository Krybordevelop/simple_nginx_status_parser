
window.onload = function(){
// if user is running mozilla then use it's built-in WebSocket


}

var validate_url = "https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)"

function show(message){
  document.querySelector('.Time').innerHTML = message['datetime']
  document.querySelector('.Active_connections').innerHTML = message.data['Active connections']
  document.querySelector('.Accepts_Total').innerHTML = message.data['Accepts Total']
  document.querySelector('.Handled_Total').innerHTML = message.data['Handled Total']
  document.querySelector('.Requests_Total').innerHTML = message.data['Requests Total']
  document.querySelector('.Reading').innerHTML = message.data['Reading']
  document.querySelector('.Writing').innerHTML = message.data['Writing']
  document.querySelector('.Waiting').innerHTML = message.data['Waiting']
  //document.querySelector('.Raw_Data').innerHTML = message.data['Raw Data']
  //let div = document.querySelector('.content')
  //div.innerHTML = message
  document.querySelector('.Time_avg').innerHTML = message.data['']
  document.querySelector('.Accepts_Total_avg').innerHTML = message['accepts']
  document.querySelector('.Handled_Total_avg').innerHTML = message['handelet']
  document.querySelector('.Requests_Total_avg').innerHTML = message['request']
  document.querySelector('.avg_per').innerHTML = message['avg_per_second']

  let test = document.querySelectorAll(".seconds")
  test.forEach((element)=>{
    element.innerHTML = message.seconds
  })
}

window.WebSocket = window.WebSocket || window.MozWebSocket;
var connection = new WebSocket('ws://127.0.0.1:8999');
connection.onopen = function () {};
connection.onerror = function (error) {
  console.log(error)
};
connection.onmessage = function (message) {
  //console.log(message)
    try {
      var json = JSON.parse(message.data);
      console.log(json)
      show(json)
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
  if(connection.readyState !=1){
    connection = new WebSocket('ws://127.0.0.1:8999');
    connection.send(JSON.stringify(res))
  }else{
    connection.send(JSON.stringify(res))
  }
}


document.querySelector("#start").addEventListener('click', ()=>{sendSocket('start')})
document.querySelector("#stop").addEventListener('click', () =>{sendSocket('stop')})