import React, { Component } from 'react';
import axios from 'axios';
import './Post.css';
import { Avatar, Icon, Badge, Button, Input, Menu, Dropdown, Spin } from 'antd';
import { relative } from 'path';
import Comments from '../Comments/Comments';
const { TextArea } = Input;

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


export default class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedUser: '',
            username: '',
            userImage: '',
            tracker: this.props.tracker,
            edit: false,
            editMode: false,
            titleInput: null,
            bodyInput: null,
            userPost: true,
            collapsed: false,
            comments: null
        }
    }

    componentDidMount(){
        axios.get(`/api/posts/${this.props.user_id}`).then(data => {
            console.log(data)
            this.setState({username: data.data[0].username, userImage: data.data[0].imageurl})
        })
    }

    increaseTracker(){
        const post = {
            post_id: this.props.post_id,
            tracker: this.state.tracker+1
        }
        axios.put(`/api/addtracker/`, post).then(data => {
            console.log(data.data.data[0].tracker)
            this.setState({tracker: data.data.data[0].tracker})
        })
    }

    deletePostFn(){
        this.props.deletePostFn(this.props.post_id)
        this.setState({edit: false})
    }

    editPost(body, title){
        const post = {
            post_id: this.props.post_id,
            title: this.state.titleInput || title,
            body: this.state.bodyInput || body
        }
        axios.put('/api/editpost/', post).then(data => {
            this.setState({editMode: false})
        })
    }


    render() {
        const { title, body, date, tracker, user_id, deletePostFn, loggedUser, post_id } = this.props;
        const { username, userImage } = this.state;
        <Comments loggedUser={loggedUser} post_id={post_id}/>
        return (
            <div className='postContainer'>
                <div className='titleContainer'>
                    <div style={{padding: '1em'}}>
                        <Input style={{fontSize: '1.5em', display: this.state.editMode ? 'block' : 'none'}} value={this.state.titleInput === null ? title : this.state.titleInput} onChange={e => this.setState({titleInput: e.target.value})}/>
                        <div style={{fontSize: '1.5em', display: this.state.editMode ? 'none' : 'block'}}>{this.state.titleInput || title}</div>
                        <div style={{fontSize: '0.8em'}}>posted on {date}, by {username}</div>
                    </div>
                    <div>
                        <Icon onClick={loggedUser === this.state.username ? () => this.setState({edit: !this.state.edit}): ''} style={{display: 'block' ,opacity: loggedUser === this.state.username ? '1':'0', paddingBottom: '1em'}}type="ellipsis" />
                            <ul style={{display: this.state.edit ? 'block' : 'none'}} className='editContainer'>
                                <li onClick={() => this.deletePostFn()}><Icon type="delete" /> Delete</li>
                                <li onClick={() => this.setState({editMode: !this.state.editMode, edit: false})}><Icon type="edit" /> Edit</li>
                            </ul>
                        <Avatar src={userImage} />
                    </div>
                </div>
                <div className='postBody'>
                    <div className='contentContainer'>
                        <TextArea style={{fontSize: '1.5em', display: this.state.editMode ? 'block' : 'none'}} value={this.state.bodyInput === null ? body : this.state.bodyInput} onChange={e => this.setState({bodyInput: e.target.value})}/>
                        <Button style={{display: this.state.editMode ? 'block' : 'none'}} onClick={() => this.editPost(body, title)} >Save</Button>
                        <p style={{padding: '1em', display: this.state.editMode ? 'none' : 'block'}}>{this.state.bodyInput || body}</p>
                        <div>
                            <Badge className='trackerBadge' count={this.state.tracker} style={{ backgroundColor: 'green' }} />
                            <Button onClick={() => this.increaseTracker()} shape="circle" icon="up" />
                        </div>
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <div style={{display: this.state.collapsed ? 'block' : 'none'}}>
                            {this.state.comments}
                        </div>
                        <Button onClick={() => this.setState({collapsed: !this.state.collapsed, comments: <Comments loggedUser={loggedUser} post_id={post_id}/>})}>Read</Button>
                    </div>
                </div>
            </div>
        );
    }
}