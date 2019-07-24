import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../assets/styles/searchBar.css';
class SearchBar extends Component {
  state = {
    lat: 42.337109,
    long: -71.097794,
    isFocused: false,
    searchInput: '',
    rangeInput: 5,
    results: [],
    filteredResults: []
  };

  componentDidMount = () => {
    this.setState({
      ...this.state,
      lat: this.props.lat,
      long: this.props.long
    });
    this.fetchFoodTrucks();
    this.filterResults();
  };

  componentWillReceiveProps = () => {
    this.setState({
      ...this.state,
      lat: this.props.lat,
      long: this.props.long
    });
    this.fetchFoodTrucks();
    this.filterResults();
  };

  fetchFoodTrucks = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/search?lat=${this.state.lat}&long=${
        this.state.long
      }&rad=${this.state.rangeInput}`
    );
    this.setState({ ...this.state, results: data });
  };

  renderResults() {
    if (
      this.state.searchInput.length > 0 &&
      this.state.filteredResults.length > 0
    ) {
      return (
        <ul className="searchBar-results">
          {this.state.filteredResults.map((result, index) => {
            return (
              <li className="searchBar-result" key={index}>
                <h1 className="searchBar-result-info">
                  <Link
                    className="searchBar-result-name"
                    to={`/truck/${result._id}`}
                  >
                    {result.name}
                  </Link>
                </h1>
              </li>
            );
          })}
        </ul>
      );
    } else if (this.state.filteredResults.length === 0) {
      return (
        <ul className="searchBar-results">
          <li className="searchBar-result">
            <h1 className="searchBar-result-info">
              <span className="searchBar-result-name">
                No Results... Try again
              </span>
            </h1>
          </li>
        </ul>
      );
    }
  }

  filterResults() {
    this.setState({
      ...this.state,
      filteredResults: this.state.results.filter(({ name }) => {
        return name
          .toLowerCase()
          .startsWith(this.state.searchInput.toLowerCase());
      })
    });
  }

  handleSearchInput(e) {
    this.setState(
      { ...this.state, searchInput: e.target.value },
      this.filterResults
    );
  }

  handleRangeInput(e) {
    this.setState({
      ...this.state,
      rangeInput: e.target.value
    });
  }

  handleSearchButton() {
    console.log('ran');
    this.fetchFoodTrucks();
    this.filterResults();
  }

  render() {
    return (
      <div className="searchBar">
        <div className="searchBar-container">
          <div className="searchBar-input-container">
            <input
              type="text"
              className="searchBar-input"
              placeholder="Search"
              value={this.state.searchInput}
              onChange={e => this.handleSearchInput(e)}
            />
            <input
              type="text"
              className="searchBar-input input-distance"
              placeholder="Distance (miles)"
              value={this.state.rangeInput}
              onChange={e => this.handleRangeInput(e)}
            />
            <button
              className="btn btn-search"
              onClick={this.handleSearchButton.bind(this)}
            >
              Search
            </button>
          </div>
        </div>
        {this.renderResults()}
      </div>
    );
  }
}

export default SearchBar;
