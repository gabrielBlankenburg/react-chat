var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/about', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
	socket.on('message', function(msg){
		var current_time = new Date();
		var time = current_time.getHours() + ':' + current_time.getMinutes();
		msg.time = time;
		msg.id = socket.id;
		io.emit('message', msg);
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});