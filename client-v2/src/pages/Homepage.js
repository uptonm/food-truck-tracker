import React from 'react';
import SearchBar from '../components/SearchBar';

import '../assets/styles/homepage.css';

export default () => {
  return (
    <div className="jumbotron">
      <h1 className="jumbotron-header">What's For Lunch?</h1>
      <SearchBar />;
    </div>
  );
};
