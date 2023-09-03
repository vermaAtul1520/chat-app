const socket=io();

socket.on('messsage',(message)=>{
    console.log(`${message}`)
})

var messages = document.getElementById('messages');
var $messegeform = document.querySelector('#form');
var $sendLocation=document.querySelector('#send-location');
var $messageFormButton=$messegeform.querySelector('button');
var $messageFormInput=$messegeform.querySelector('input');
// var input = document.getElementById('input');

$messegeform.addEventListener('submit', (e) => {
    e.preventDefault();

    const messege = e.target.input.value;
    // Disable the button
    $messageFormButton.setAttribute('disabled','disabled')
    
    if(messege){
        socket.emit('chat message', messege, (msg) => {
            $messageFormButton.removeAttribute('disabled')
            $messageFormInput.value = '';
            $messageFormInput.focus()
            console.log(`${msg}`)
        });
    }else{
        $messageFormButton.removeAttribute('disabled');
        console.warn('Enter your text first');
    }
});

socket.on('chat message', function(msg) {
  var item = document.createElement('li');
  item.textContent = msg.text;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('sendLocation', function (msg) {
    var item = document.createElement('li');
    var link = document.createElement('a'); // Create a link element
    link.href = msg.url; // Set the URL as the href attribute
    link.textContent = 'My Location'; // Set the link text
    
    // Append the link to the list item
    item.appendChild(link);

    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});


$sendLocation.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geo location is not supported by your browser')
    }

    $sendLocation.setAttribute('disabled','disabled')
    navigator.geolocation.getCurrentPosition((position) => {
        let locationObj = {
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude
        }
        socket.emit('sendLocation', locationObj,(msg)=>{
            $sendLocation.removeAttribute('disabled');
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