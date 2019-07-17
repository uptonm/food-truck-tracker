import React, { Component } from 'react';

import '../assets/styles/auth.css';

class SignIn extends Component {
  state = {
    account: {
      email: '',
      password: '',
      first: '',
      last: '',
      type: 'user'
    },
    foodTruckInfo: {
      company: '',
      category: '',
      website: '',
      menu: ''
    },
    status: 'sign-up',
    page: 1
  };
  handlePrimaryAction() {
    if (this.state.status === 'sign-up') {
      if (this.state.page < 3) {
        this.setState({ ...this.state, page: this.state.page + 1 });
      } else {
        // Deal with Sign In
        console.log({
          SignIn: {
            account: this.state.account,
            foodTruckInfo: this.state.foodTruckInfo
          }
        });
      }
    } else {
      // Deal with login
    }
  }
  handleSecondaryAction() {
    if (this.state.status === 'sign-up') {
      if (this.state.page > 1) {
        this.setState({ ...this.state, page: this.state.page - 1 });
      } else {
        this.setState({ ...this.state, status: 'log-in' });
      }
    } else {
      this.setState({ ...this.state, status: 'sign-up' });
    }
  }
  renderSignInPage() {
    switch (this.state.page) {
      case 1:
        return (
          <div className="login-rows">
            <input
              id="email"
              type="email"
              className="login-input"
              placeholder="Email"
              value={this.state.account.email}
              onChange={e =>
                this.setState({
                  ...this.state,
                  account: { ...this.state.account, email: e.target.value }
                })
              }
              required
            />
            <input
              id="password"
              type="password"
              className="login-input"
              placeholder="Password"
              value={this.state.account.password}
              onChange={e =>
                this.setState({
                  ...this.state,
                  account: { ...this.state.account, password: e.target.value }
                })
              }
              required
            />
          </div>
        );
      case 2:
        return (
          <div className="login-rows">
            <form className="form-container">
              <h1 className="login-sub-header">I am</h1>
              <label className="container">
                Looking for Food Trucks
                <input
                  type="radio"
                  name="radio"
                  checked={this.state.account.type === 'user'}
                  onChange={() =>
                    this.setState({
                      ...this.state,
                      account: { ...this.state.account, type: 'user' }
                    })
                  }
                />
                <span className="checkmark" />
              </label>

              <label className="container">
                A Food Truck
                <input
                  type="radio"
                  name="radio"
                  checked={this.state.account.type === 'food-truck'}
                  onChange={() =>
                    this.setState({
                      ...this.state,
                      account: { ...this.state.account, type: 'food-truck' }
                    })
                  }
                />
                <span className="checkmark" />
              </label>
            </form>
          </div>
        );
      case 3:
        return (
          <div className="login-rows">
            <input
              id="first"
              type="text"
              className="login-input"
              placeholder="First Name"
              value={this.state.account.first}
              onChange={e =>
                this.setState({
                  ...this.state,
                  account: { ...this.state.account, first: e.target.value }
                })
              }
              required
            />
            <input
              id="last"
              type="text"
              className="login-input"
              placeholder="Last Name"
              value={this.state.account.last}
              onChange={e =>
                this.setState({
                  ...this.state,
                  account: { ...this.state.account, last: e.target.value }
                })
              }
              required
            />
            {this.state.account.type === 'food-truck' ? (
              <div className="form-row">
                <input
                  id="company"
                  type="text"
                  className="login-input"
                  placeholder="Company Name"
                  value={this.state.foodTruckInfo.company}
                  onChange={e =>
                    this.setState({
                      ...this.state,
                      foodTruckInfo: {
                        ...this.state.foodTruckInfo,
                        company: e.target.value
                      }
                    })
                  }
                  required
                />
                <input
                  id="category"
                  type="text"
                  className="login-input"
                  placeholder="Food Category"
                  value={this.state.foodTruckInfo.category}
                  onChange={e =>
                    this.setState({
                      ...this.state,
                      foodTruckInfo: {
                        ...this.state.foodTruckInfo,
                        category: e.target.value
                      }
                    })
                  }
                  required
                />
              </div>
            ) : (
              ''
            )}
            {this.state.account.type === 'food-truck' ? (
              <div className="form-row">
                <input
                  id="website"
                  type="url"
                  className="login-input"
                  placeholder="Website"
                  value={this.state.foodTruckInfo.website}
                  onChange={e =>
                    this.setState({
                      ...this.state,
                      foodTruckInfo: {
                        ...this.state.foodTruckInfo,
                        website: e.target.value
                      }
                    })
                  }
                />
                <input
                  id="menu"
                  type="url"
                  className="login-input"
                  placeholder="Menu Link"
                  value={this.state.foodTruckInfo.menu}
                  onChange={e =>
                    this.setState({
                      ...this.state,
                      foodTruckInfo: {
                        ...this.state.foodTruckInfo,
                        menu: e.target.value
                      }
                    })
                  }
                />
              </div>
            ) : (
              ''
            )}
          </div>
        );
      default:
        return;
    }
  }
  render() {
    return (
      <div className="login-container">
        <div className="login-box">
          <h1 className="login-header">
            {this.state.status === 'sign-up' ? 'Sign Up' : 'Log In'}
          </h1>
          {this.renderSignInPage()}
          <div className="btn-bar">
            <button
              className="btn-primary-outline"
              to="./login.html"
              onClick={this.handleSecondaryAction.bind(this)}
            >
              {this.state.status === 'sign-up'
                ? this.state.page === 1
                  ? 'Log In'
                  : 'Back'
                : 'Sign Up'}
            </button>
            <button
              className="btn-primary"
              to="./account-type.html"
              onClick={this.handlePrimaryAction.bind(this)}
            >
              {this.state.status === 'sign-up' ? 'Sign Up' : 'Log In'}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
