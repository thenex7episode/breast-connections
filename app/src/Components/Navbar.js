import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import logo from "../logo.png";

export default function Nav() {
  return (
    <div className="nav-container">
      <img src={logo} alt="logo" className="logo" />
      <nav>
        <ul>
          <li>
            <Link className="link" to="/loginlogout">
              Login/Logout
            </Link>
          </li>

          <li>Forums
            
            <ul>
                <li className='sub-wrapper'>
              <Link className="sub-menu" to="/family-support">
                Family Support
              </Link>
              </li>
              <li className='sub-wrapper'>
              <Link className="sub-menu" to="/resources">
                Resources
              </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link className="link" to="/info">
              Info
            </Link>
          </li>
          <li>
            <Link className="link" to="/">
              Home
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
