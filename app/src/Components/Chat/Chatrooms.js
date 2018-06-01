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
                const comb = [];
                const newChats = [];
                for(let i =0; i < data.data.length; i++) {
                    let c = arr[i].receiver.length < arr[i].sender.length ? arr[i].receiver : arr[i].sender
                    let o = arr[i].receiver.length > arr[i].sender.length ? arr[i].receiver : arr[i].sender;
                    let co = c+o;
                    console.log(co)
                    if(comb.includes(co)){
                        console.log('know about that bro')
                    } else {
                        comb.push(co)
                        newChats.push(data.data[i])
                    }
                }
                this.setState({chats: newChats})
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
        const userList = this.state.users.map(el => <li onClick={() => this.setState({receiver: el.username})}>{el.username}</li>);
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