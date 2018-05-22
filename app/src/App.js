
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import React, { Component } from 'react';
import logo from './logo.svg';
import './reset.css'
import './App.css';
import routes from './routes'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="d-main-wrapper">
          <Sidebar />
          <div className="d-routes">
            { routes }
           
          </div>
        </div>
      </div>
    );
  }
}

export default App;
