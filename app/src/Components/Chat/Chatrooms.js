import React, { Component } from 'react';
import axios from 'axios';
import { message, Button, List, Card } from 'antd';


const error = () => {
    message.warning('Please enter a Message and a Receiver');
  };

export default class Chatroom extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            user_id: '',
            receiver: '',
            bodyInput: '',
            receiver_id: '',
            users: [],
            chats: []
        }
    }

    componentDidMount(){
        axios.get(`/api/check-session/`).then( data => {
            console.log('session res', data)
            this.setState({username: data.data.username, user_id: data.data.user_id})
            if(!data.data.username){
                window.location = '/login'
            }
            axios.get('/api/chat/chats').then(data => {
                const chats = [];
                const ids = [];
                for(let i = 0; i < data.data.length; i++){
                    if(ids.includes(data.data[i].chat_id)){
                        console.log('know about that chat')
                    } else {
                        ids.push(data.data[i].chat_id)
                        chats.push(data.data[i])
                    }
                }
                this.setState({chats: chats})
            })
        })
    }

    getUsers(){
        axios.get('/api/chat/usernames').then(data => {
            this.setState({users: data.data})
        })
    }

    sendMessage(){
        if(this.state.bodyInput && this.state.receiver){
            const chat_id = this.state.user_id < this.state.receiver_id 
            ? this.state.user_id.toString() + this.state.receiver_id.toString() 
            : this.state.receiver_id.toString() + this.state.user_id.toString()
            console.log(chat_id)
            const message = {
                receiver: this.state.receiver,
                body: this.state.bodyInput,
                receiver_id: this.state.receiver_id,
                chat_id: parseInt(chat_id,10)
            }
            axios.post('/api/chat/addmessage', message).then( data => {
                console.log(data.data)
            })
        } else {
            error()
        }
    }

    render() {
        const userList = this.state.users.map(el => <li onClick={() => this.setState({receiver: el.username, receiver_id: el.user_id})}>{el.username}</li>);
        const chatList = this.state.chats.ma
        return (
            <div style={{marginTop: '5em'}}>
                <h2>Start a new chat</h2>
                <input value={this.state.bodyInput} onChange={e => this.setState({bodyInput: e.target.value})}/>
                <Button onClick={() => this.getUsers()}>Search Users</Button>
                <Button onClick={() => this.sendMessage()}>Start chatting</Button>
                <div>selected: {this.state.receiver}</div>
            <ul style={{display: this.state.receiver ? 'none' : 'block'}}>
                {userList}    
            </ul>
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={this.state.chats}
                renderItem={item => (
                <List.Item>
                    <Card title={item.sender}>{item.receiver}{item.body}</Card>
                </List.Item>
                )}
            />
            </div>
        );
    }
}