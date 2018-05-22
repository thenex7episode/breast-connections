import React, { Component } from 'react';
import axios from 'axios'
import {Avatar} from 'antd'
import './Profile.css'

export default class Profile extends Component {
    constructor(props) {
        super()

        this.state = {
            user: '',
            first: '',
            last: '',
            image: '',
            message: null,
            isLoggedIn: false,
            posts: []
        }
    }

    componentDidMount() {
        const username = this.props.match.params.username
        console.log('-------username', username)
        axios.get(`/api/user/${username}`).then(r => {
            console.log('-----------------r',r.data)
             
                console.log('profile username log', r.data[0].username)
                this.setState({isLoggedIn: true, user: r.data[0].username, first: r.data[0].first, last: r.data[0].last, image: r.data[0].imageurl})
            
        })
    }
    


    render() {
        const {isLoggedIn, user, first, last, image} = this.state
        console.log('first:', first)
        console.log('last:', last)
        console.log('logged in:', isLoggedIn)
        
        return (
            <div>
                <div>
                <div>

                <Avatar icon ='user' style = {{margin: '1em'}} src={image}/>
                <h1>{user}'sPROFILE</h1>
                {first}
                {last}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <a href="#" class="fa fa-facebook"></a>
                <a href="#" class="fa fa-twitter"></a>
                </div>

                {/* {isLoggedIn && 
                
                } */}
            </div>
                {/* {!isLoggedIn && 
                <h1>Not Logged In</h1>
                } */}
            </div>
        );
    }
}

