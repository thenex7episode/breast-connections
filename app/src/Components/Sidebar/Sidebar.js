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

componentWillReceiveProps() {
    axios.get('/api/check-session').then(response => {
        console.log('response.................', response)
        if(response.data.username) {
            this.setState({loggedIn: true, user: response.data.username, img: response.data.imageUrl})
        }
    })
}
    render(){

      const {user, img} = this.state
        
  return (
    <div className="d-side-bar">
      <aside>
          <div>
              <h3 className='d-welcome'>
            Welcome {user}
            </h3>
            <div className='d-thumbnail'>
                <img src={thumbnail} className='d-img'/>
                <Link to='/profile/:username'><button className='d-profile-button'>Profile</button></Link>
            </div>
        </div>
      </aside>
    </div>
  );
}
}
export default Sidebar


