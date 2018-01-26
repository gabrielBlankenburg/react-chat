const React  = require('react');
import io from 'socket.io-client';
import styles from './style/style.css'; 
const socket = io();


// This class is the window containing all the chat components.
// Here also recieves the messages from the class MessageInput and send to the class ChatBox
class ChatWindow extends React.Component{
	constructor(props){
		super(props);

		this.sendMessage = this.sendMessage.bind(this);
		this.state = {messages:[]};
	}
	sendMessage(message){
		let messages = this.state.messages;
		messages.push({text:message});
		this.setState({messages:messages});
		socket.emit('message', message);
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
										return <Message identity={index} text={message.text}/>
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
						placeHolder="Say Something" />
				</form>
	}
}

// This class is responsible to load each message individually
class Message extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return <li key={this.props.identity}>{this.props.text}</li>
	}
}

export default ChatWindow;