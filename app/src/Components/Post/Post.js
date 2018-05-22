import React, { Component } from 'react';
import axios from 'axios';

export default class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            userImage: ''
        }
    }

    componentDidMount(){
        axios.get(`/api/userInfo/${this.props.user_id}`).then(data => {
            this.setState({username: data.data.username, userImage: data.data.imageUrl})
        })
    }

    render() {
        const { title, body, date, tracker, user_id } = this.props
        return (
            <div>
                <h1>{title}</h1>
                <h3>{date}</h3>
                <h3>{tracker}</h3>
                <p>{body}</p>
            </div>
        );
    }
}