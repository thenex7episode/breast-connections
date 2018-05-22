import routes from './routes'
import React, { Component } from "react";
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import "./App.css";
import "./reset.css";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
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
