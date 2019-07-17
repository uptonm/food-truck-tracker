import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import Homepage from './pages/Homepage';
import SignIn from './pages/SignIn';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Route path="/" exact component={Homepage} />
        <Route path="/sign-in" component={SignIn} />
      </div>
    </Router>
  );
}

export default App;