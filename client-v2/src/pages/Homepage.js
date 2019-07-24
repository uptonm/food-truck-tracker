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
