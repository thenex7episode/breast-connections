import React, { Component } from "react";
import axios from 'axios'
import "./sidebar.css";
import { Link } from "react-router-dom";
import thumbnail from '../thumbnail.png'


class Sidebar extends Component {
constructor(){
    super()

    this.state={
        user: '',
        img: '',
        loggedIn: false
    }
}
// fix this, wont update on rerender
componentWillReceiveProps() {
    axios.get('/api/check-session').then(response => {
        console.log('response.................', response)
        if(response.data.username) {
            this.setState({loggedIn: true, user: response.data.username, img: response.data.imageurl})
        }
    })
}
    render(){

      const {user, img, loggedIn} = this.state
        console.log('LLOOGOGOGOGOGOEOEEDDDDDIIINNN',loggedIn)
        console.log('img:', img)
        console.log('user:', user)
        
  return (
        <div> 

      {!loggedIn}
      {loggedIn && <div className="d-side-bar">
      <aside>
          <div>
              <h3 className='d-welcome'>
            Welcome {user}
            </h3>
            <div className='d-thumbnail'>
                <img src={img} className='d-img'/>
                <Link to={`/profile/${user}`}><button className='d-profile-button'>Profile</button></Link>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <a href="#" className="fa fa-facebook"></a>
                <a href="#" className="fa fa-twitter"></a>
                <Link to='/chat'><button className='d-profile-button'>Chats</button></Link>
            </div>
        </div>
      </aside>
    </div> }
        </div>
  );
}
}
export default Sidebar


