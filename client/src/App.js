import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Callback from './components/Callback';
import Home from './views/Home';

function App() {
  return (
    <Router className="App">
      <div>
        <Route exact path="/" component={Home} exact />
        <Route exact path="/callback" component={Callback} exact />
      </div>
    </Router>
  );
}

export default App;
