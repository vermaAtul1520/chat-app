const socket=io();

socket.on('messsage',(message)=>{
    console.log(`${message}`)
})

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value,(msg)=>{
        console.log(`${msg}`)
    });
    input.value = '';
  }
});

socket.on('chat message', function(msg) {
  var item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geo location is not supported by your browser')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        let locationObj = {
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude
        }
        socket.emit('sendLocation', locationObj,(msg)=>{
            console.log('Message sent sucessfully!!',msg)
        });
    })
})

// socket.on('countUpdated',(count)=>{
//     document.getElementById("count").textContent = count;
//     console.log('The count has been updated!! ',count)
// })


// document.querySelector('#increment').addEventListener('click',()=>{
//     console.log('Clicked')
//     socket.emit('increment')
// })