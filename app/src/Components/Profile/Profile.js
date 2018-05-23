import React, { Component } from 'react';
import axios from 'axios'
import {Avatar, Button, Icon} from 'antd'
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
            posts: [],
            body: '',
            size: 'large',
            edit: false
        }
    }

    componentDidMount() {
        const username = this.props.match.params.username
        console.log('-------username', username)
        axios.get(`/api/user/${username}`).then(r => {
            console.log('-----------------r',r)
             
                // console.log('profile username log', r.data[0].username)
                this.setState({isLoggedIn: true, user: r.data[0].username, first: r.data[0].first, last: r.data[0].last, image: r.data[0].imageurl})
            
        })
    }
    
    handleSize = e => {
        this.setState({ size: e.target.value})
    }


    render() {
        
        const {isLoggedIn, user, first, last, image, size, edit} = this.state
        console.log('first:', first)
        console.log('last:', last)
        console.log('logged in:', isLoggedIn)
        console.log('edit', edit)
        
        return (
            <div>
                <div>
                <div>
                    {!edit ? 
                <Button size={size}type= 'dashed' style={{float: 'right'}} onClick={() => this.setState({edit: true})}>Edit</Button> :   
                <Button size={size}type= 'dashed' style={{float: 'right'}} onClick={() => this.setState({edit: false})}>Complete</Button>    
                     }
                <Avatar icon ='user' style = {{marginLeft: '42%', height: '12em', width: '12em', borderRadius: '50%'}} src={image}/>
                <h1 className = 'name'>{first} {last}</h1>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <a href="#" className="fa fa-facebook"></a>
                <a href="#" className="fa fa-twitter"></a>
                </div>

                
                
            </div>
                
                
            </div>
        );
    }
}

