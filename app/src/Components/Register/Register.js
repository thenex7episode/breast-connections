import React, { Component } from 'react';
import axios from 'axios'

export default class Register extends Component {
    constructor() {
        super()

        this.state = {
            user: null,
            message: null,
            username: '',
            email: '',
            first: '',
            last: '',
            password: ''
        }
    }

    setUser(val) {
        this.setState({username: val})
    }
    setEmail(val) {
        this.setState({email: val})
    }
    setFirst(val) {
        this.setState({first: val})
    }
    setLast(val) {
        this.setState({last: val})
    }
    setPass(val) {
        this.setState({password: val})
    }

    register() {
        const newUser = {
            "username": this.state.username,
            "email": this.state.email,
            "first": this.state.first,
            "last": this.state.last,
            "password": this.state.password
                    }
                    axios.post('/register', newUser).then(response => {
                        console.log('-----newUser',newUser)
                        const {username, password} = newUser;
                        axios.post('/login', {
                            username,
                            password
                        }).then(response => {
                            console.log('---------R.DATA',response.data)
                            this.setState({ user: response.data})
                            this.props.history.push('/profile')
                           
                        }).catch(error => {
                            this.setState({ message: 'Something went wrong'})
                        })
                        // this.props.history.push('/profile')
                        console.log('-_-_-_-_-_-_-_-_R.DATA',response.data)
              this.setState({ user: response.data });
            }).catch(error => {
              this.setState({ message: 'Something went wrong: '});
            });
    }
    render() {
        return (
            <div>
                <h1>Register</h1>
                <input type="text" onChange={e => this.setUser(e.target.value)}/>
                <input type="text" onChange={e => this.setEmail(e.target.value)}/>
                <input type="text" onChange={e => this.setFirst(e.target.value)}/>
                <input type="text" onChange={e => this.setLast(e.target.value)}/>
                <input type="password" onChange={e => this.setPass(e.target.value)}/>
                <button onClick={() => this.register()}>Register</button>
            </div>
        );
    }
}