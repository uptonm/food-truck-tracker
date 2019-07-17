import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/images/logo.svg';
import '../assets/styles/navbar.css';

class Navbar extends Component {
  render() {
    return (
      <div className="nav">
        <Link className="nav-logo" to="/">
          <img src={logo} alt="logo" className="navbar-logo" />
        </Link>
        <ul className="nav-list">
          <li className="nav-list-item">
            <Link className="nav-link" to="/sign-in">
              Sign In
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
