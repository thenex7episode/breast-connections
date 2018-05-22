import React, { Component } from 'react';
import axios from 'axios';
import './Post.css';
import { Avatar, Icon, Badge, Button } from 'antd';
import { Menu, Dropdown } from 'antd';
import { relative } from 'path';

export default class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedUser: '',
            username: '',
            userImage: '',
            tracker: this.props.tracker,
            edit: false,
            userPost: true
        }
    }

    componentDidMount(){
        axios.get(`/api/user/${this.props.user_id}`).then(data => {
            this.setState({username: data.data[0].username, userImage: data.data[0].imageurl})
        })
    }

    increaseTracker(){
        const post = {
            post_id: this.props.post_id,
            tracker: this.state.tracker+1
        }
        axios.put(`/api/editpost/`, post).then(data => {
            console.log(data.data.data[0].tracker)
            this.setState({tracker: data.data.data[0].tracker})
        })
    }

    deletePostFn(){
        this.props.deletePostFn(this.props.post_id)
        this.setState({edit: false})
    }


    render() {
        const { title, body, date, tracker, user_id, deletePostFn } = this.props;
        const { username, userImage } = this.state;
        return (
            <div className='postContainer'>
                <div className='titleContainer'>
                    <div style={{padding: '1em'}}>
                        <div style={{fontSize: '1.5em'}}>{title}</div>
                        <div style={{fontSize: '0.8em'}}>posted on {date}, by {username}</div>
                    </div>
                    <div>
                        <Icon onClick={() => this.setState({edit: !this.state.edit})} style={{display: 'block', opacity: this.state.userPost ? '1' : '0', paddingBottom: '1em'}}type="ellipsis" />
                            <ul style={{display: this.state.edit ? 'block' : 'none'}} className='editContainer'>
                                <li onClick={() => this.deletePostFn()}><Icon type="delete" /> Delete</li>
                                <li><Icon type="edit" /> Edit</li>
                            </ul>
                        <Avatar src={userImage} />
                    </div>
                </div>
                <div className='contentContainer'>
                    <p>{body}</p>
                    <div style={{}}>
                        <Badge className='trackerBadge' count={this.state.tracker} style={{ backgroundColor: 'green' }} />
                        <Button onClick={() => this.increaseTracker()} shape="circle" icon="up" />
                    </div>
                </div>
            </div>
        );
    }
}