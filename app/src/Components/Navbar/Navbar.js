import React, { Component } from 'react';
import './navbar.css'
import {Link, Redirect } from 'react-router-dom'
import logo from '../../logo.png'
import axios from'axios';
import { Menu, Dropdown, Icon } from 'antd';
import { browserHistory } from 'react-router'
import textLogo from '../textlogo1.png'



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
              this.props.history.location.push('/login')
          }
      }).catch(err => {console.log('WWEEEWWWOOOWWWEEEWWWOOO',err)})
  }



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
                    <img src={textLogo} alt="logo" className="textlogo" />
                 
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
                                     <a href="/dashboard/family">Family</a>
                                     <a href="/dashboard/resources">Resources</a>
                                     <a href="/dashboard/motivation">Motivation</a>
                                     <a href="/dashboard/nutrition">Nutrition</a>
                                     <a href="/dashboard/health">Health</a>
                                     <a href="/dashboard/financial">Financial</a>
                                     
                                   </div>
                                 </a>
                                 </div>
 
                                 {/* END DROPDOWN MENU */}
 
                                 <a> <Link className="link" to="/info"> Info
                             </Link>
                             </a>
                         <a>
                             {!isLoggedIn 
                             ? <Link className="link" to="/">Home</Link>
                             : <Link className="link" to="/dashboard">Home</Link>
                             }
                         </a>
             </div>
         </div>
     </div>

        )}
        }

        