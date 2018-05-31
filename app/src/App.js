import routes from './routes'
import React, { Component } from "react";
import "./App.css";
import "./reset.css";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import Loading from './Components/Loading'
import axios from 'axios'
import {Link} from 'react-router-dom'



class App extends Component {
  constructor(){
    super();
    this.state = {
      logged: false
    }
  }

  componentDidMount(){
    axios.get(`/api/check-session/`).then( data => {
      console.log('session data', data)
      if(data.data.username){
        this.setState({logged: true})
      }
    })
  }



  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="d-main-wrapper">
          {/* {this.state.logged ? <Sidebar /> : ''} */}
          <div className="d-routes">
            { routes }          
       
          </div>
        </div>
      </div>
    );
  }
}

export default App;
