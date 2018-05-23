import React, { Component } from 'react';
import './Comment.css';
import axios from 'axios';
import { Button, Avatar, Icon, Input} from 'antd';
const { TextArea } = Input;


export default class Comment extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            userImage: '',
            edit: false,
            editMode: false,
            bodyInput: null,
            body: ''
        }
    }

    componentDidMount(){
        axios.get(`/api/posts/${this.props.user_id}`).then(data => {
            this.setState({username: data.data[0].username, userImage: data.data[0].imageurl})
        })
    }

    editComment(id){
        const comment = {
            comment_id: id,
            body: this.state.bodyInput
        }
        axios.put('/api/editcomment/', comment).then(data => {
            this.setState({body: data.data[0].body, editMode: false, bodyInput: null})
        })
    }

    render() {
        const { body, user_id, date, deleteCommentFn, comment_id, loggedUser } = this.props;
        return (
            <div className='commentContainer'>
                <div style={{padding: '1em', textAlign: 'left'}}>
                    <div style={{display: this.state.editMode ? 'none' : 'block'}}>{this.state.body || body}</div>
                    <div style={{display: this.state.editMode ? 'block' : 'none'}}><TextArea onChange={(e) => this.setState({bodyInput: e.target.value})} value={this.state.bodyInput || body}/><Button onClick={() => this.editComment(comment_id)}>Save</Button></div>
                    <div>posted by {this.state.username} on {date}</div>
                </div>
                <div>
                    <div style={{textAlign: 'right'}}>
                        <Icon onClick={loggedUser === this.state.username ? () => this.setState({edit: !this.state.edit}): ''} style={{display: 'block',opacity: loggedUser === this.state.username ? '1' : '0', paddingBottom: '1em'}}type="ellipsis" />
                        <ul style={{display: this.state.edit ? 'block' : 'none'}} className='editContainer'>
                            <li onClick={() => deleteCommentFn(comment_id)}><Icon type="delete" /> Delete</li>
                            <li onClick={() => this.setState({editMode: !this.state.editMode})}><Icon type="edit" /> Edit</li>
                        </ul>
                        <Avatar src={this.state.userImage} /></div>
                    </div>
                </div>
        ); 
    }
}