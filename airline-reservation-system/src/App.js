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
import UserDepFlights from "./components/user-dep-flights";
import UserRetFlights from "./components/user-ret-flights";
import UserFlightsSummary from "./components/user-flights-summary";
import ChooseSeats from "./components/chooseSeats/index2";
import UserFlightsItinerary from "./components/user-flights-itinerary";

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
        <Route path="/user-home" component={UserHome} />
      </div>
      <div className="container">
        <Route path="/user-dep-flights" component={UserDepFlights} />
      </div>
      <div className="container">
        <Route path="/user-ret-flights" component={UserRetFlights} />
      </div>
      <div className="container">
        <Route path="/user-flights-summary" component={UserFlightsSummary} />
      </div>
      <div className="container">
        <Route path="/choose-seats" component={ChooseSeats} />
        <Route path="/user-flights-itinerary" component={UserFlightsItinerary} />
      </div>
    </Router>
  );
}
export default App;
