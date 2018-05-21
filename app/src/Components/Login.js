import React, { Component } from 'react';
import axios from 'axios'

export default class Login extends Component {
    constructor() {
        super()

        this.state = {
            user: null,
            message: null
        }
        this.login = this.login.bind(this)
    }


    login= (e) => {
        console.log(e.key)
        this.setState({message: null})
        const username = this.refs.username.value;
        const password = this.refs.password.value
        console.log('-------username',password)
        axios.post('/login', {
            username,
            password
        }).then(response => {
            console.log('---------R.DATA',response.data)
            this.setState({ user: response.data})
            this.props.history.push('/profile')
            this.props.isLoggedIn()
           
        }).catch(error => {
            this.setState({ message: 'Something went wrong'})
        })
    }
    loginOnEnter(e) {
        if(e.key === 'Enter') {
            console.log(e.key)
            this.setState({message: null})
            const username = this.refs.username.value
            const password = this.refs.password.value
            axios.post('/login', {
                username,
                password
            }).then(response => {
                console.log('-----r.data',response.data)
                this.setState({user: response.data})
                this.props.history.push('/profile')
                this.props.isLoggedIn()
            }).catch(error => {
                this.setState({message: 'Something went wrong'})
            })
        }
    }
    
    render() {
        console.log('--------state', this.state)
        return (
            <div onKeyPress= {e => this.loginOnEnter(e)}>
                <h1>Login</h1>
                <input type="text" ref='username'/>
                <input type="password" ref='password'/>
                <button onClick = {e => this.login(e)}>Login</button>
            </div>
        );
    }
}