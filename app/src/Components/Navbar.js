import React, { Component } from 'react';
import './navbar.css'
import {Link } from 'react-router-dom'
import logo from '../logo.png'
import axios from'axios'


export default class Navbar extends Component {
  constructor() {
    super() 

    this.state = {
      isLoggedIn: false
    }
    console.log('isLoggedIn', this.state.isLoggedIn)
  }



  componentWillReceiveProps() {
    axios.get('/api/check-session').then(r => {
      console.log('hello from the mount side')
        if(r.data.username) {
            console.log('navbar username log', r.data.username)
            this.setState({isLoggedIn: true})
        }
    }).catch(err => {console.log('WWEEEWWWOOOWWWEEEWWWOOO',err)})
}


logout= () => {
  axios.post('/logout').then(() => {
    this.setState({isLoggedIn: false})
  }).catch(e => {console.log('Logout error', e)})
}

render() {
  const {isLoggedIn} = this.state
  console.log('isLggediniogho;',isLoggedIn)
  return (
      
    <div>
            <div className='nav'>
                <img src={logo} alt="logo" className="logo" />
                    <label for='toggle'>&#9776;</label>
                        <input type='checkbox' id='toggle' />
                            <div className='menu'>
                                <a> {!isLoggedIn ? <Link className="link" to="/login">Login</Link> :
                                    <Link onClick={this.logout}className="link" to="/">Logout</Link>}
                                </a>

                                {/* DROPDOWN MENU */}
                                <div className='dropdown'>
                                <a> <Link className="link" to="/forums"> Forums
                                  </Link>
                                  <div class="dropdown-content">
                                    <a href="#">Motivation</a>
                                    <a href="#">Family</a>
                                    <a href="#">Resources</a>
                                  </div>
                                </a>
                                </div>

                                {/* END DROPDOWN MENU */}

                                <a> <Link className="link" to="/info"> Info
                            </Link>
                            </a>
                        <a><Link className="link" to="/home">
                        Home
                    </Link></a>
            </div>
        </div>
    </div>

        )}
        }

        