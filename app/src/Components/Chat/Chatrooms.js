import React, { Component } from 'react';
import axios from 'axios';
import { message, Button } from 'antd';

const error = () => {
    message.error('This is a message of error');
  };

export default class Chatroom extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            user_id: '',
            receiver: '',
            bodyInput: '',
            users: []
        }
    }

    componentDidMount(){
        axios.get(`/api/check-session/`).then( data => {
            console.log('session res', data)
            this.setState({username: data.data.username, user_id: data.data.user_id})
        })
    }

    getUsers(){
        axios.get('/api/chat/users').then(data => {
            this.setState({users: data.data})
        })
    }

    sendMessage(){
        if(this.state.bodyInput && this.state.receiver){
            const message = {
                receiver: this.state.receiver,
                body: this.state.bodyInput
            }
            axios.post('/api/chat/addmessage', message).then( data => {
                console.log(data.data)
            })
        } else {
            error()
        }
    }

    render() {
        const userList = this.state.users.map(el => <li onClick={() => this.setState({receiver: el.username})}>{el.username}</li>)
        return (
            <div style={{marginTop: '5em'}}>
                <h2>Start a new chat</h2>
                <input value={this.state.bodyInput} onChange={e => this.setState({body: e.target.value})}/>
                <Button onClick={() => this.getUsers()}>Search Users</Button>
            <ul>
                {userList}    
            </ul>
            </div>
        );
    }
}