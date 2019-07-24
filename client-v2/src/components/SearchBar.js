// This class handles the logic for fetching food trucks within a certain radius (default: 5 miles)
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

  // When the class is shown on the screen, fetch the user's location from the props
  // then fetch the food trucks within a radius of that location
  componentDidMount = () => {
    this.setState({
      ...this.state,
      lat: this.props.lat,
      long: this.props.long
    });
    this.fetchFoodTrucks();
    this.filterResults();
  };

  // If the user's location is updated, fetch new results, and filter them based on the
  // search input text
  componentWillReceiveProps = () => {
    this.setState({
      ...this.state,
      lat: this.props.lat,
      long: this.props.long
    });
    this.fetchFoodTrucks();
    this.filterResults();
  };

  // Fetch the food truck information from the backend-api
  fetchFoodTrucks = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/search?lat=${this.state.lat}&long=${
        this.state.long
      }&rad=${this.state.rangeInput}`
    );
    this.setState({ ...this.state, results: data });
  };

  // Render the searchbar results, or a message if there are no results for a given input
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

  // Filter the food-truck results based on the input text
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

  // Handle the controlled search input, updating state as it is modified
  handleSearchInput(e) {
    this.setState(
      { ...this.state, searchInput: e.target.value },
      this.filterResults
    );
  }

  // Handle the controlled radius input, updating state as it is modified
  handleRangeInput(e) {
    this.setState({
      ...this.state,
      rangeInput: e.target.value
    });
  }

  // Handle the search button, fetching and filtering new results when it is clicked
  handleSearchButton() {
    console.log('ran');
    this.fetchFoodTrucks();
    this.filterResults();
  }

  // Render the result of all the above logic and styling to the DOM
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
