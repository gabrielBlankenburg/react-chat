const React  = require('react');
const Chat = require('./messages');
import styles from './style/chatwindow.css';
import io from 'socket.io-client';
const socket = io();

const chat = new Chat;

// This class is the window containing all the chat components. It is responsible to send
// messages throught the chat object and recieve it
class ChatWindow extends React.Component{
	constructor(props){
		super(props);

		this.sendMessage = this.sendMessage.bind(this);
		this.state = {messages:[]};

		// Listen the messages changes
		chat.recieveMessage(messages => {
			this.setState({messages:messages});
		});
	}
	// Send the message to the chat object
	sendMessage(message_text){
		const message = {text:message_text, user:this.props.nickname};
		chat.sendMessage(message);
	}
	render(){
		return (
			<div className={styles.chat_window}>
				<ChatBox messages={this.state.messages}/>
				<MessageInput messageHandler={this.sendMessage}/>
			</div>
		)
	}
}

// This class shows the messages sent
class ChatBox extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		const messages = this.props.messages;
		const messageList = messages.map((message, index) => {
										return <Message key={index} text={message.text}
												user={message.user} new={message.new} 
												time={message.time}/>
									});
		return(
			<ul>
				{messageList}
			</ul>
		)
	}
}

// This class is responsible by sending messages from the input
class MessageInput extends React.Component{
	constructor(props){
		super(props);
		this.state = {message:''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	// Everytime an input is changed it updates the state
	handleChange(event){
		this.setState({message:event.target.value});
	}
	// When a form is submited it sends the message to the ChatWindow (via the binded 
	// function messageHandler) and reset the message state (reseting also the input value)
	handleSubmit(event){
		event.preventDefault();
		this.props.messageHandler(this.state.message);
		this.setState({message:''});
	}
	render(){
		return <form onSubmit={this.handleSubmit} className={styles.message_input}>
					<input value={this.state.message} onChange={this.handleChange}
						placeholder="Say Something" />
				</form>
	}
}

// This class is responsible to load each message individually
class Message extends React.Component{
	constructor(props){
		super(props);
	}
	showNewMessage(){
		if (this.props.new){
			return <li className={styles.new_message}>
					<span>
						{this.props.user} says <span className={styles.time}>{this.props.time}</span>
					</span> 
					&nbsp;{this.props.text}
				</li>
		} else{
			return <li className={styles.user_message}>
					<span>
						{this.props.user} says <span className={styles.time}>{this.props.time}</span>
					</span> 
					&nbsp;{this.props.text}
				</li>
		}
	}
	render(){
		return this.showNewMessage();
	}
}

export default ChatWindow;