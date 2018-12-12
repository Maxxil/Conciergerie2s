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

var numConnected = 0;
var allConnected = [];
var adminOnline = false;
 
io.on('connection', (socket) => {  

  // Lorsqu'un client se connecte
  socket.on('client-connect', (utilisateur) => {
    console.log('\r\nCLIENT CONNECT');
    console.log('----------------------');
    console.log(utilisateur);
    socket.userid = utilisateur._id;
    socket.nom = utilisateur.nom;
    socket.prenom = utilisateur.prenom;
    numConnected++;
    allConnected.push(utilisateur);
    console.log("Utilisateurs :",allConnected);        
    console.log("new client connect "+socket.nickname+' '+socket.prenom+' id:'+socket.userid);
    console.log("nb connect "+numConnected);
    console.log("Admin online : "+adminOnline);
   // io.emit('new-client-connect', {user: utilisateur, connected: allConnected, event: 'joined'});        
    io.emit('users-onlines', {onlines: allConnected});
  });

  // Lorsque l'admin se connecte
  socket.on('c2s-connect', (utilisateur) => {  
    console.log('\r\nADMIN CONNECT');
    console.log('----------------------');
    socket.userid = utilisateur._id;
    socket.nom = utilisateur.nom;
    socket.prenom = utilisateur.prenom;
    adminOnline = utilisateur._id;
    console.log("C2S connect");
    console.log("Utilisateurs :",allConnected);  
    console.log("Admin online : "+adminOnline);
    io.emit('users-onlines', {'onlines': allConnected});
    io.emit('is-admin-online', {isAdminOnline: true});
  });
  
  // Déconnection 
  socket.on('disconnect', () => {
    console.log("\r\nDisconnect Idutilisateur : "+socket.userid);
    
    // Informer les utilisateurs que l'admin n'est plus en ligne
    if(adminOnline && adminOnline === socket.userid) {
        adminOnline = null;
        io.emit('c2s-admin-disconnect');
    }  
    else {
      // Informer tous les utilsiateurs lorsqu'un utilisateur s'est déconnecté
      const itemsfilter = allConnected.filter(item => item._id !== socket.userid);
      allConnected = itemsfilter;
      numConnected = itemsfilter.length;
      console.log("nb connect after disconnect "+numConnected);
      io.emit('c2s-disconnect', {user: socket.userId, event: 'left'});   
    }
  }); 
  
  //  Diffusion du message 
  socket.on('new-message', (msg) => {
    console.log(msg.message.userId+' -> '+msg.message.toUserId);
    io.emit('message', msg.message);    
    /*let new_message =  msg.message;
    const userId = msg.message.userId;
    const toUserId = msg.message.toUserId;
    
    new_message.userId = toUserId
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