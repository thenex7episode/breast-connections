import React, { Component } from 'react';

export default class Login extends Component {
    constructor() {
        super()

        this.state = {
            user: null,
            message: null
        }
    }


    login = e => {
        console.log(e.key)
        this.setState({message: null})
        const username = this.refs.username.value
        const password = this.refs.password.value
        axios.post('/login', {
            username,
            password
        }).then(response => {
            this.setState({user: response.data})
            this.props.histroy.push('/profile')
        })
    }

    render() {
        return (
            <div>
                <input type="text"/>
                <input type="password"/>
            </div>
        );
    }
}