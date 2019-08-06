import React, { Component } from 'react';
import logo from '../assets/images/food-truck-light.svg';
import auth0Client from '../services/Auth';

class Home extends Component {
  componentDidMount() {
    if (!auth0Client.isAuthenticated()) {
      auth0Client.signIn();
    }
    console.log(auth0Client.getProfile());
  }
  signOut = () => {
    auth0Client.signOut();
    this.props.history.replace('/');
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {auth0Client.isAuthenticated() && (
            <div>
              <label className="mr-2 text-white">
                {auth0Client.getProfile().name}
              </label>
              <br />
              <button
                className="btn btn-dark"
                onClick={() => {
                  this.signOut();
                }}
              >
                Sign Out
              </button>
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default Home;
