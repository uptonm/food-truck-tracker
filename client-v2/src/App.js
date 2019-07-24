// Handles routing/rendering for the entire website, as well as the navbar
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Homepage from './pages/Homepage';
import FoodTruck from './pages/FoodTruck';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Route path="/" exact component={Homepage} />
        <Route path="/truck/:id" component={FoodTruck} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
