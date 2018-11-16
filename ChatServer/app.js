let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
var envConfig = require("./config/environnement");
 
io.on('connection', (socket) => {
  
  socket.on('disconnect', function(){
    io.emit('users-changed', {user: socket.nickname, event: 'left'});   
  });
 
  socket.on('set-nickname', (nickname) => {
    socket.nickname = nickname;
    io.emit('users-changed', {user: nickname, event: 'joined'});    
  });
  
  socket.on('add-message', (message) => {
    io.emit('message', {text: message.text, from: socket.nickname, created: new Date()});    
  });
});
 
var port = envConfig.getListeningPort();
 
http.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});