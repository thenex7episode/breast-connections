import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { message, Button, List, Card } from 'antd';
import { Menu, Dropdown, Icon, Input, Avatar } from 'antd';
const { TextArea } = Input;


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
            chats: [],
            showList: false
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
            ? this.state.user_id.toString() + '.' + this.state.receiver_id.toString() 
            : this.state.receiver_id.toString() + '.' + this.state.user_id.toString()
            console.log(chat_id)
            const message = {
                receiver: this.state.receiver,
                body: this.state.bodyInput,
                receiver_id: this.state.receiver_id,
                chat_id: chat_id
            }
            axios.post('/api/chat/addmessage', message).then( data => {
                console.log(data.data)
            })
        } else {
            error()
        }
    }

    render() {
        const userList = this.state.users.map(el => <li className='userInList' onClick={() => this.setState({receiver: el.username, receiver_id: el.user_id, image: el.imageurl})}>{el.username}<Avatar src={el.imageurl} />
        </li>);
        const menuList = this.state.users.map((el,i) => <Menu.Item key={i}>{el}</Menu.Item>)
        return (
            <div style={{marginTop: '5em', padding: '0 5em'}}>
                <h1 style={{textAlign: 'center', fontSize: '40pt'}}>Chat</h1>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={this.state.chats}
                    renderItem={item => (
                    <List.Item>
                        <Card title={<Link to={`/chat/${item.chat_id}`}>{this.state.username === item.sender ? item.receiver : item.sender}</Link>}>{item.body}</Card>
                    </List.Item>
                    )}
                />
                <div style={{padding: '2em'}}>
                    <h2>Start a new chat</h2>
                    <TextArea placeholder='enter message' value={this.state.bodyInput} onChange={e => this.setState({bodyInput: e.target.value})}/>
                    <Button icon='search' onClick={() => {
                        this.getUsers()
                        }}>Search Users</Button>
                    <Button icon='mail' onClick={() => this.sendMessage()}>Start chatting</Button>
                    <div style={{display: 'inline-block', padding: '1em'}}>selected: {this.state.receiver}</div><Icon onClick={() => this.setState({receiver: ''})} style={{display: this.state.receiver ? 'inline-block' : 'none'}} type="close-circle"/>
                    <ul style={{display: this.state.receiver ? 'none'  : 'block'}}>
                        {userList}    
                    </ul>
                </div>
            </div>
        );
    }
}