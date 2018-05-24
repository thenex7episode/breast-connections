import React, { Component } from 'react';
import './navbar.css'
import {Link, Redirect } from 'react-router-dom'
import { Menu, Dropdown, Icon } from 'antd';
import logo from '../../logo.png'
import axios from'axios'


export default class Navbar extends Component {
  constructor() {
    super() 

    this.state = {
      isLoggedIn: false
    }
    console.log('isLoggedIn', this.state.isLoggedIn)
  }


  // manually redirecting with react router dom - this doesnt seem to work
  componentDidMount(){
    axios.get('/api/check-session').then(r => {
          if(r.data.username) {
              this.setState({isLoggedIn: true})
          } else {
              console.log('not logged in')
              this.props.history.push('/login')
          }
      }).catch(err => {console.log('WWEEEWWWOOOWWWEEEWWWOOO',err)})
  }


//   componentWillReceiveProps() {
//     axios.get('/api/check-session').then(r => {
//       console.log('hello from the mount side')
//         if(r.data.username) {
//             console.log('navbar username log', r.data.username)
//             this.setState({isLoggedIn: true})
//         }
//     }).catch(err => {console.log('WWEEEWWWOOOWWWEEEWWWOOO',err)})
// }


logout= () => {
  axios.post('/logout').then(() => {
    this.setState({isLoggedIn: false})
   window.location.reload(true)
  }).catch(e => {console.log('Logout error', e)})
}

render() {
  const {isLoggedIn} = this.state
  console.log('isLggediniogho;',isLoggedIn)
  return (
      
    <div>
            <div className='nav'>
                <img src={logo} alt="logo" className="logo" />
                            <div className='menu'>
                                <a> {!isLoggedIn ? <Link className="link" to="/login">Login</Link> :
                                    <Link onClick={this.logout}className="link" to=''>Logout</Link>}
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

        