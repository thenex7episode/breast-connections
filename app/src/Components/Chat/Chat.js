import React, { Component } from 'react';
import axios from 'axios';
import { Button, message } from 'antd';
import { setInterval } from 'timers';
import './chat.css';

const error = () => {
    message.warning('Please enter a Message and a Receiver');
  };


  function divideMessages(arr, user){
    console.log('divide', arr, user)
    const sender = arr.filter(el => el.sender_id === user);
    const receiver = arr.filter(el => el.receiver_id === user);
    console.log('divide two', sender, receiver)
    return {
        sender,
        receiver
    }
  }


export default class Chat extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            user_id: '',
            messages: [],
            bodyInput: '',
            receiver_id: ''
        }
    }

    listener(){
        setInterval(() => axios.get(`/api/chat/messages/${this.props.match.params.chat_id}`).then(data => {
            if(data.data[0].sender_id === this.state.user_id){
                this.setState({receiver_id: data.data[0].receiver_id, receiver: data.data[0].receiver})
            } else {
                this.setState({receiver_id: data.data[0].sender_id, receiver: data.data[0].sender})
            }
            console.log('interval response',data.data)
            this.setState({messages: data.data})
            
        }) ,10000)
    }



    componentDidMount(){
        axios.get(`/api/check-session/`).then( data => {
            console.log('session res', data)
            this.setState({username: data.data.username, user_id: data.data.user_id})
            axios.get(`/api/chat/messages/${this.props.match.params.chat_id}`).then(data => {
                if(data.data[0].sender_id === this.state.user_id){
                    this.setState({receiver_id: data.data[0].receiver_id, receiver: data.data[0].receiver})
                } else {
                    this.setState({receiver_id: data.data[0].sender_id, receiver: data.data[0].sender})
                }
                console.log(data.data)
                this.setState({messages: data.data})
                this.listener()
            })
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
                this.setState({messages: data.data, bodyInput: ''})
            })
        } else {
            error()
        }
    }

    render() {
        const messageList = this.state.messages.map(el => <li style={{float: this.state.receiver === el.sender ? 'right' : 'left'}} className='message'>{el.body}<span className='senderBadge'>{el.sender}</span></li>)
        return (
            <div style={{marginTop: '5em', padding: '0 5em'}}>
                <h1 style={{textAlign: 'center', fontSize: '40pt'}}>Chat</h1>
                <ul className='messageList'>
                    {messageList}
                </ul>
                <div className='messageCont'>
                    <input onKeyPress={e => {
                        if(e.key === 'Enter'){
                            this.sendMessage()
                        }
                    }} value={this.state.bodyInput} onChange={e => this.setState({bodyInput: e.target.value})}/>
                    <Button onClick={() => this.sendMessage()}>Chat</Button>
                </div>
            </div>
        );
    }
}