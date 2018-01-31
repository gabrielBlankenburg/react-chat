import io from 'socket.io-client';
const socket = io();

class Chat{
	constructor(){
		this.messages = [];
	}
	recieveMessage(callback){
		socket.on('message', message => {
			if (message.id != socket.id){
				message.new = true;
			} else{
				message.new = false;
			}
			this.messages.push(message);
			callback(this.messages);
		});
	}
	sendMessage(new_message){
		socket.emit('message', new_message);
	}
}

module.exports = Chat;