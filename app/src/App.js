import routes from './routes'
import React, { Component } from "react";
import "./reset.css";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import Loading from './Components/Loading'

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
