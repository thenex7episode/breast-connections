import React, { Component } from 'react';
import axios from 'axios';

export default class Chat extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            user_id: '',
            messagesSender: [],
            messagesReceiver: []
        }
    }

    componentDidMount(){
        axios.get(`/api/check-session/`).then( data => {
            console.log('session res', data)
            this.setState({username: data.data.username, user_id: data.data.user_id})
            axios.get(`/api/chat/messages/${data.data.username}/${this.props.match.params.username}`).then(data => {
                console.log(data.data)
                this.setState({messagesSender: data.data})
            })
        })
    }

    render() {
        return (
            <div style={{marginTop: '5em'}}>individual chat with {this.props.match.params.username}</div>
        );
    }
}