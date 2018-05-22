import React, { Component } from 'react';
import axios from 'axios'
import {Avatar} from 'antd'
import './Profile.css'

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
        const username = this.props.match.params.username
        console.log('-------username', username)
        axios.get('/api/check-session').then(r => {
            if(r.data.username) {
                console.log('profile username log', r.data.username)
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
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <a href="#" class="fa fa-facebook"></a>
                <a href="#" class="fa fa-twitter"></a>
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

