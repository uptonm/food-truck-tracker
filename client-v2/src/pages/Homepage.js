// Serves as the homepage rendering the searchbar to the DOM when the user's geolocation is aquired.
import React from 'react';
import '../assets/styles/homepage.css';
import GeoLocated from '../components/GeoLocated';

export default () => {
  return (
    <div className="jumbotron">
      <h1 className="jumbotron-header">What's For Lunch?</h1>
      <GeoLocated />;
    </div>
  );
};
