const React  = require('react');
const Chat = require('./messages');
import styles from './style/chatwindow.css';
import io from 'socket.io-client';
const socket = io();

class Login extends React.Component{
	constructor(props){
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {nickname:''};
	}
	handleChange(event){
		this.setState({nickname: event.target.value});
	}
	handleSubmit(event){
		this.props.setNickname(this.state.nickname);
		event.preventDefault();
	}
	render(){
		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text" value={this.state.value} placeholder="Your nickname" 
					onChange={this.handleChange} />
			</form>
		);
	}
}

export default Login;