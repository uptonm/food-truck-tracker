// This class serves to let user's navigate to the home page, and eventually to the sign-up/login page
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/images/logo.png';
import '../assets/styles/navbar.css';

class Navbar extends Component {
  render() {
    return (
      <div className="nav">
        <Link className="nav-logo" to="/">
          <img src={logo} alt="logo" className="navbar-logo" />
        </Link>
      </div>
    );
  }
}

export default Navbar;
