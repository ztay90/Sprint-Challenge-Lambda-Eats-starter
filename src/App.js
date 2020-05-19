import React from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import PizzaForm from './components/PizzaForm';
import HomePage from './components/HomePage';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <h1>Lambda Eats</h1>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/orderform">Pizza?</Link>
          </div>
        </nav>
        <Route path="/" component={HomePage} />
        <Route path="/orderform" component={PizzaForm} />
      </div>
    </Router>
  );
};
export default App;
