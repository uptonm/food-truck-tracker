// This class is a higher order component used for fetching the user's current location through the browser
import React from 'react';
import { geolocated } from 'react-geolocated';
import SearchBar from './SearchBar';
import '../assets/styles/searchBar.css';

class GeoLocated extends React.Component {
  render() {
    return !this.props.isGeolocationAvailable ? (
      <h1 className="loading-text">
        Your browser does not support Geolocation
      </h1>
    ) : !this.props.isGeolocationEnabled ? (
      <SearchBar lat={42.352917} long={-71.055687} />
    ) : this.props.coords ? (
      <SearchBar
        lat={this.props.coords.latitude}
        long={this.props.coords.longitude}
      />
    ) : (
      <SearchBar lat={42.352917} long={-71.055687} />
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 10000
})(GeoLocated);
