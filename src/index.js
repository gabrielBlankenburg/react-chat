import React from 'react';
import ReactDOM from 'react-dom';

class Window extends React.Component{
	constructor(props){
		super(props);

		this.sendMessage = this.sendMessage.bind(this);
		this.state = {messages:[]};
	}
	sendMessage(message){
		let messages = this.state.messages;
		messages.push({text:message});
		this.setState({messages:messages});
	}
	render(){
		return (
			<div>
				<ChatBox messages={this.state.messages}/>
				<MessageInput messageHandler={this.sendMessage}/>
			</div>
		)
	}
}

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

class MessageInput extends React.Component{
	constructor(props){
		super(props);
		this.state = {value:''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event){
		this.setState({value:event.target.value});
	}
	handleSubmit(event){
		event.preventDefault();
		this.props.messageHandler(this.state.value);
		this.setState({value:''});
	}
	render(){
		return <form onSubmit={this.handleSubmit}>
					<input value={this.state.value} onChange={this.handleChange} />
					<button type="submit">Send</button>
				</form>
	}
}

class Message extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return <li key={this.props.identity}>{this.props.text}</li>
	}
}

ReactDOM.render(<Window/>, document.getElementById('app'));