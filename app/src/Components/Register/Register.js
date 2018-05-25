import React, { Component } from 'react';
import axios from 'axios'
import {Alert, Input, Icon, Button} from 'antd'
import {Link} from 'react-router-dom'

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
            password: '',
            image: ''
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
                        // console.log('-----newUser',newUser)
                        const {username, password} = newUser;
                        axios.post('/login', {
                            username,
                            password
                        }).then(response => {
                            // console.log('---------R.DATA',response.data)
                            this.setState({ user: response.data})
                            this.props.history.push('/profile')
                           
                        }).catch(error => {
                            this.setState({ message: 'Something went wrong'})
                        })
                        // this.props.history.push('/profile')
                        // console.log('-_-_-_-_-_-_-_-_R.DATA',response.data)
              this.setState({ user: response.data });
            }).catch(error => {
              this.setState({ message: <Alert message='This User Already Exists' type='error' closable showIcon/>});
              
            });
    }
    render() {
        const {message} = this.state
        return (
            <div style={{padding: '5em'}}>
                {message}
                <h1>Register</h1>
                <Input placeholder='username'prefix={<Icon type="user"/>}type="text" onChange={e => this.setUser(e.target.value)}/>
                <Input placeholder='email' prefix={<Icon type='mail'/>}type="text" onChange={e => this.setEmail(e.target.value)}/>
                <Input placeholder='first' prefix={<Icon type='info'/>}type="text" onChange={e => this.setFirst(e.target.value)}/>
                <Input placeholder='last' prefix={<Icon type='info'/>}type="text" onChange={e => this.setLast(e.target.value)}/>
                <Input placeholder='password' prefix={<Icon type='exclamation'/>}type="password" onChange={e => this.setPass(e.target.value)}/>
                <Button onClick={() => this.register()} type='primary'>Register</Button>
                <Link to='/login'><Button type='danger'>Cancel</Button></Link>
            </div>
        );
    }
}