import io from 'socket.io-client';
const socket = io();

class Chat{
	constructor(){
		this.messages = [];
	}
	recieveMessage(callback){
		socket.on('message', message => {
			callback(this.messages);
		});
	}
	sendMessage(new_message){
		this.messages.push(new_message);
		socket.emit('message', new_message);
	}
}

module.exports = Chat;