import React, { Component } from 'react';
import axios from 'axios'
import {Avatar} from 'antd'

export default class Profile extends Component {
    constructor(props) {
        super()

        this.state = {
            user: '',
            message: null,
            isLoggedIn: false,
            posts: []
        }
    }

    componentDidMount() {
        axios.get('/api/check-session').then(r => {
            if(r.data.username) {
                this.setState({isLoggedIn: true, user: r.data.username})
            }
        })
    }
    
    render() {
        const {isLoggedIn, user} = this.state
        return (
            <div>
                <div>

                {isLoggedIn && 
                <div>

                <Avatar icon ='user' style = {{margin: '1em'}}/>
                <h1>{user}'sPROFILE</h1>
                </div>
                }
            </div>
                {!isLoggedIn && 
                <h1>Not Logged In</h1>
                }
            </div>
        );
    }
}