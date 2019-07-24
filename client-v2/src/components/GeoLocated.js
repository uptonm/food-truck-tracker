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
      <h1 className="loading-text">Geolocation is not enabled</h1>
    ) : this.props.coords ? (
      <SearchBar
        lat={this.props.coords.latitude}
        long={this.props.coords.longitude}
      />
    ) : (
      <h1 className="loading-text">Loading...</h1>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 10000
})(GeoLocated);
