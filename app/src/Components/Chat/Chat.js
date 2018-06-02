import React, { Component } from 'react';
import axios from 'axios';
import { Button, message } from 'antd';

const error = () => {
    message.warning('Please enter a Message and a Receiver');
  };

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
                this.setState({messages: data.data})
            })
        } else {
            error()
        }
    }

    render() {
        const messageList = this.state.messages.map(el => <li>{el.body}</li>)
        return (
            <div style={{marginTop: '5em'}}>
                <h3>Chat {this.props.match.params.chat_id}</h3>
                <ul>
                    {messageList}
                </ul>
                <input value={this.state.bodyInput} onChange={e => this.setState({bodyInput: e.target.value})}/>
                <Button onClick={() => this.sendMessage()}>Start chatting</Button>
            </div>
        );
    }
}