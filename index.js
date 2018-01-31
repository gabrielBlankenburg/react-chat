var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('message', function(msg){
		msg.id = socket.id;
		console.log(socket.id);
		io.emit('message', msg);
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});