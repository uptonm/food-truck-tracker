import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../assets/styles/auth.css';

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  };
  render() {
    return (
      <div className="login-container">
        <div className="login-box">
          <h1 className="login-header">Sign Up</h1>
          <input
            id="email"
            type="email"
            className="login-input"
            placeholder="Email"
            value={this.state.email}
            onChange={e =>
              this.setState({ ...this.state, email: e.target.value })
            }
            required
          />
          <input
            id="password"
            type="password"
            className="login-input"
            placeholder="Password"
            value={this.state.password}
            onChange={e =>
              this.setState({ ...this.state, password: e.target.value })
            }
            required
          />
          <div className="btn-bar">
            <Link className="btn-primary-outline" to="./login.html">
              Log In
            </Link>
            <Link className="btn-primary" to="./account-type.html">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
