import React from 'react';
import './navbar.css'
import {Link} from 'react-router-dom'


export default function Nav () {

    return (
        <div className="nav-container">
             <div className="logo"><Link className="link"to="/"></Link></div>
             <div className='Home'><Link className='link'to="/">Home</Link></div>
             <div className='Forum'><Link className='link'to="/forum">Forum</Link></div>
             <div className='Info'><Link className='link'to="/info">Info</Link></div>
             <div className='Login/Logout'><Link className='link'to="/login">Login/Logout</Link></div>
             
             
        </div>

    )

}