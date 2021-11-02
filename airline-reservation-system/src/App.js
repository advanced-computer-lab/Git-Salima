import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Flight from "./components/create-flight";
import UpdatedFlight from "./components/edit-flight";
import Card from "./components/flightcard";
import SearchForm from "./components/search-flight";
import SearchResults from "./components/search-results";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <div className="container">
        <Route path="/create" component={Flight} />
      </div>
      <div className="container">
        <Route path="/edit" component={UpdatedFlight} />
      </div>
      <div className="container">
        <Route path="/tickets" component={Card} />
      </div>
      <div className="container">
        <Route path="/search" component={SearchForm} />
      </div>
      <div className="container">
        <Route path="/search-results" component={SearchResults} />
      </div>
    </Router>
  );
}

export default App;
