import React, { Component } from "react";
import axios from 'axios'
import "./sidebar.css";
import { Link } from "react-router-dom";
// import logo from "../logo.png";

class Sidebar extends Component {
constructor(){
    super()

    this.state={
        user: []
    }
}

// componentDidMount(){

//     axios.get(`/api/  /${this.state.user.id}`).then((r) => {
//     this.setState({ user: r.data})
        
//     })
//   }
    render(){
  return (
    <div className="d-side-bar">
      <aside>Sidebar</aside>
    </div>
  );
}
}
export default Sidebar
