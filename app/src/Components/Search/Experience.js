import React, { Component } from 'react';
import { Rate, Avatar, Icon } from 'antd';
import axios from 'axios';
import { relative } from 'path';


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
            <div style={{display: 'flex', margin: '1em', padding: '0.5em', borderBottom: '1px solid #e8e8e8'}}>
                <div style={{borderRight: '1px solid #e8e8e8', padding: '0.5em'}}>
                    <Avatar alt='avatar' src={this.state.userImage} />
                    <div>{this.state.username}</div>
                </div>
                <div style={{padding: '0.5em', textAlign: 'left'}}>
                    <Rate defaultValue={rating} disabled />
                    <p>{body}</p>
                </div>
                    <Icon onClick={this.state.loggedUser === this.state.username ? () => this.setState({edit: !this.state.edit}): ''} style={{float: 'right', display: 'block',opacity: this.state.loggedUser === this.state.username ? '1' : '0', paddingBottom: '1em'}}type="ellipsis" />
                    <div style={{position: 'relative'}}>
                        <ul style={{display: this.state.edit ? 'block' : 'none'}} className='editContainer'>
                            <li onClick={() => deleteExperienceFn(experience_id)}><Icon type="delete" /> Delete</li>
                        </ul>
                    </div>
            </div>
        );
    }
}