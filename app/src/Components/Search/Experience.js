import React, { Component } from 'react';
import { Rate, Avatar, Icon } from 'antd';
import axios from 'axios';


export default class Experience extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            userImage: '',
            loggedUser: '',
            editMode: false,
            edit: false
        }
    }

    // return 'no Content' if nothing is available
    componentDidMount(){
        axios.get(`/api/posts/${this.props.user_id}`).then(data => {
            console.log(data)
            this.setState({username: data.data[0].username, userImage: data.data[0].imageurl})
        })
        axios.get(`/api/check-session/`).then( data => {
            console.log('session res', data)
            this.setState({loggedUser: data.data.username})
        })
    }

    render() {
        const { body, user_id, rating, deleteExperienceFn, experience_id } = this.props;
        return (
            <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid grey'}}>
                <div>
                    <Avatar alt='avatar' src={this.state.userImage} />
                    <div>{this.state.username}</div>
                </div>
                <div>
                    <Icon onClick={this.state.loggedUser === this.state.username ? () => this.setState({edit: !this.state.edit}): ''} style={{display: 'block',opacity: this.state.loggedUser === this.state.username ? '1' : '0', paddingBottom: '1em'}}type="ellipsis" />
                    <ul style={{display: this.state.edit ? 'block' : 'none'}} className='editContainer'>
                        <li onClick={() => deleteExperienceFn(experience_id)}><Icon type="delete" /> Delete</li>
                    </ul>
                    <p>{body}</p>
                    <Rate defaultValue={rating} disabled />
                </div>
            </div>
        );
    }
}