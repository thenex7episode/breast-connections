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
    <div className="nav-container">
            <div>
          <img src={logo} alt="logo" className="logo" />
          <nav>
            <ul>
              <li>
                {!isLoggedIn ? <Link className="link" to="/login">Login</Link> :
                <Link onClick={this.logout}className="link" to="/">Logout</Link>}
              </li>
    
              <li>Forums
                
                <ul>
                    <li className='sub-wrapper'>
                  <Link className="sub-menu" to="/family-support">
                    Family Support
                  </Link>
                  </li>
                  <li className='sub-wrapper'>
                  <Link className="sub-menu" to="/resources">
                    Resources
                  </Link>
                  </li>
                </ul>
              </li>
    
              <li>
                <Link className="link" to="/info">
                  Info
                </Link>
              </li>
              <li>
                <Link className="link" to="/">
                  Home
                </Link>
              </li>
            </ul>
          </nav>

          </div>
          </div>
        )}
        }