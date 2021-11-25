import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Flight from "./components/create-flight";
import UpdatedFlight from "./components/edit-flight";
import AllFlights from "./components/view-all-flights";
import SearchForm from "./components/search-flight";
import SearchResults from "./components/search-results";
import WelcomeScreen from "./components/welcome-screen";
import UserHome from "./components/user-home";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <div className="container">
        <Route exact path="/" Redirect to="/home" component={WelcomeScreen} />
      </div>
      <div className="container">
        <Route path="/create" component={Flight} />
      </div>
      <div className="container">
        <Route path="/edit" component={UpdatedFlight} />
      </div>
      <div className="container">
        <Route path="/tickets" component={AllFlights} />
      </div>
      <div className="container">
        <Route path="/search" component={SearchForm} />
      </div>
      <div className="container">
        <Route path="/search-results" component={SearchResults} />
      </div>
      <div className="container">
        <Route path="/userHome" component={UserHome} />
      </div>
      <div className="container">
        <Route path="/userDepFlight" component={UserHome} />
      </div>
    </Router>
  );
}
export default App;
