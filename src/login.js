const React  = require('react');
const Chat = require('./messages');
import styles from './style/login.css';
import io from 'socket.io-client';
const socket = io();

// This class is responsible to choose the nickname of the user
class Login extends React.Component{
	constructor(props){
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {nickname:''};
	}
	handleChange(event){
		event.target.value = event.target.value.toUpperCase();
		this.setState({nickname: event.target.value});
	}
	handleSubmit(event){
		this.props.setNickname(this.state.nickname);
		event.preventDefault();
	}
	render(){
		return (
			<form onSubmit={this.handleSubmit} className={styles.login}>
				<input type="text" value={this.state.value} placeholder="YOUR NICKNAME" 
					onChange={this.handleChange} />
			</form>
		);
	}
}

export default Login;