import React, { Component } from 'react';
import axios from 'axios';

export default class Chat extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            user_id: ''
        }
    }

    componentDidMount(){
        axios.get(`/api/check-session/`).then( data => {
            console.log('session res', data)
            this.setState({username: data.data.username, user_id: data.data.user_id})
        })
    }

    render() {
        return (
            <div style={{marginTop: '5em'}}>individual chat with {this.props.match.params.username}</div>
        );
    }
}