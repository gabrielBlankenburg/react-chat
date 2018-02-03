import React from 'react';
import ReactDOM from 'react-dom';
import ChatWindow from './chatwindow';
import Login from './login';
require('./style/chatwindow.css');

class App extends React.Component{
	constructor(props){
		super(props);
		this.setNickname = this.setNickname.bind(this);

		this.state = {nickname:''};
	}
	setNickname(nickname){
		this.setState({nickname:nickname});
	}
	render(){
		if (this.state.nickname.trim() == ''){
			return <Login setNickname={this.setNickname} />
		} else{
			return <ChatWindow nickname={this.state.nickname}/>
		}
	}
}

ReactDOM.render(<App/>, document.getElementById('app'));