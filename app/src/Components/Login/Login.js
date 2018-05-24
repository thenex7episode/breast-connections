import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Input, Icon, Button} from 'antd'


export default class Login extends Component {
    constructor(props) {
        super()

        this.state = {
            user: null,
            message: null,
            userName: '',
            password: ''
        }
        // this.login = this.login.bind(this)
    }



    
   
    login(e) {
        if(e.key === 'Enter') {
            console.log(e.key)
            this.setState({message: null})
            // const username = this.state.username
            // const password = this.state.password
            axios.post('/login', {
                username: this.state.userName,
                password: this.state.password
            }).then(response => {
                console.log('-----r.data',response.data)
                this.setState({user: response.data})
                this.props.history.push(`/profile/${response.data.user.username}`)
                // this.props.isLoggedIn()
            }).catch(error => {
                this.setState({message: error})
            })
        }
    }
    
    render() {
        console.log('--------state', this.state)
        return (
            <div onKeyPress= {e => this.login(e)}>
                <h1>Login</h1>
                <Input placeholder='username'type="text" onChange={e => this.setState({userName: e.target.value})}/>
                <Input placeholder='password' type="password" onChange={ e => this.setState({password: e.target.value})}/>
                <Button onClick = {e => this.login(e)}>Login</Button>
                <Link to='/register'><Button>Register</Button></Link>
            </div>
        );
    }
}