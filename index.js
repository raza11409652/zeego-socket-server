const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 4000
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html');
// });

const users = {}; 
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('user-joined' , (uid)=>{
    users[socket.id] = uid ;
    console.log(users);
  }) ; 


  socket.on('new-order-placed' , (option)=>{
    console.log(option);
    socket.broadcast.emit('new-order' ,option )
  })
});

http.listen(PORT, () => {
  console.log(`http://locahost:${PORT}`);
});
