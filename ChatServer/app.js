let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
var envConfig = require("./config/environnement");

// Allow CORS support and remote requests to the service
app.use(function(req, res, next)
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});

// Set up route
app.get('/', (req, res) =>
{
   res.json({ message: 'Serveur OK' });
});
 
io.on('connection', (socket) => {  

  socket.on('client-connect', () => {
    console.log("new client connect");
  });

  socket.on('c2s-connect', () => {
    console.log("C2S connect");
  });
  
  socket.on('disconnect', function(){
    io.emit('users-changed', {user: socket.nickname, event: 'left'});   
  });
 
  socket.on('set-nickname', (nickname) => {
    socket.nickname = nickname;
    io.emit('users-changed', {user: nickname, event: 'joined'});    
    console.log('Nouveu utilisateur '+nickname);
  });
  
  socket.on('new-message', (msg) => {
    console.log(msg.message.userId+' -> '+msg.message.toUserId);
    io.emit('message', msg.message);    
    let new_message =  msg.message;
    const userId = msg.message.userId;
    const toUserId = msg.message.toUserId;
    
    /*new_message.userId = toUserId
    new_message.toUserId = userId; 
    new_message.userName = 'bot';    
    console.log(new_message.userId+' -> '+new_message.toUserId);
    io.emit('message', new_message);    */
  });
});
 
var port = envConfig.getListeningPort();
 
http.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});