import React, { Component } from 'react';
import axios from 'axios';
import './Post.css';
import { Badge, Button } from 'antd';

export default class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            userImage: '',
            tracker: this.props.tracker
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

    render() {
        const { title, body, date, tracker, user_id } = this.props;
        const { username, userImage } = this.state;
        return (
            <div className='postContainer'>
                <div className='titleContainer'>
                    <h1>{title}</h1>
                    <div className='metaContainer'>
                        <h3>{username}</h3>
                        <img src={userImage} alt='userImage'/>
                    </div>
                </div>
                <div className='contentContainer'>
                    <p>{body}</p>
                    <div>
                        <h3>{date}</h3>
                        <Badge className='trackerBadge' count={this.state.tracker} style={{ backgroundColor: 'green' }} />
                        <Button onClick={() => this.increaseTracker()} shape="circle" icon="up" />
                    </div>
                </div>
            </div>
        );
    }
}