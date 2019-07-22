import React, { Component } from 'react';

import '../assets/styles/searchBar.css';
import sampleData from '../assets/sampleData.json';
import SearchIcon from './SearchIcon';

class SearchBar extends Component {
  state = {
    isFocused: false,
    searchInput: '',
    results: [],
    filteredResults: []
  };

  componentDidMount = async () => {
    this.setState({ ...this.state, results: sampleData.foodTrucks });
  };

  renderResults() {
    if (this.state.searchInput.length > 0 && this.state.results.length > 0) {
      return (
        <ul className="searchBar-results">
          {this.state.filteredResults.map((result, index) => {
            return (
              <li className="searchBar-result" key={index}>
                <h1 className="searchBar-result-info">
                  <span className="searchBar-result-name">{result.name}</span> -{' '}
                  {result.location}
                </h1>
              </li>
            );
          })}
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

  render() {
    return (
      <div className="searchBar">
        <div className="searchBar-container">
          <SearchIcon
            class="searchBar-icon"
            color={this.state.isFocused ? 'orange' : 'gray'}
            height="2rem"
          />
          <input
            type="text"
            className="searchBar-input"
            value={this.state.searchInput}
            onChange={e => this.handleSearchInput(e)}
            onFocus={() => this.setState({ ...this.state, isFocused: true })}
            onBlur={() => this.setState({ ...this.state, isFocused: false })}
          />
        </div>
        {this.renderResults()}
      </div>
    );
  }
}

export default SearchBar;
