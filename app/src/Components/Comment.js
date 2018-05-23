import React, { Component } from 'react';
import './Comment.css';
import axios from 'axios';
import {Avatar, Icon} from 'antd';

export default class Comment extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            userImage: '',
            edit: false
        }
    }

    componentDidMount(){
        axios.get(`/api/user/${this.props.user_id}`).then(data => {
            this.setState({username: data.data[0].username, userImage: data.data[0].imageurl})
        })
    }

    render() {
        const { body, user_id, date, deleteCommentFn, comment_id } = this.props;
        return (
            <div className='commentContainer'>
                <div style={{padding: '1em', textAlign: 'left'}}>
                    {body}
                    <div>posted by {this.state.username} on {date}</div>
                </div>
                <div>
                    <div style={{textAlign: 'right'}}>
                        <Icon onClick={() => this.setState({edit: !this.state.edit})}style={{display: 'block' , paddingBottom: '1em'}}type="ellipsis" />
                        <ul style={{display: this.state.edit ? 'block' : 'none'}} className='editContainer'>
                            <li onClick={() => deleteCommentFn(comment_id)}><Icon type="delete" /> Delete</li>
                            <li><Icon type="edit" /> Edit</li>
                        </ul>
                        <Avatar src={this.state.userImage} /></div>
                    </div>
                </div>
        ); 
    }
}