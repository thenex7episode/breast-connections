import React, { Component } from "react";
import "./reset.css";
import "./App.css";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="d-main-wrapper">
          <Sidebar />
          <div className="d-routes">
            <p>
              Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularise
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
