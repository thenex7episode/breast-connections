import React, { Component } from 'react';
import axios from 'axios'

export default class Profile extends Component {
    constructor(props) {
        super()

        this.state = {
            user: '',
            message: null,
            isLoggedIn: false,
            products: []
        }
    }

    
    render() {
        return (
            <div>
                <h1>PROFILE</h1>
            </div>
        );
    }
}