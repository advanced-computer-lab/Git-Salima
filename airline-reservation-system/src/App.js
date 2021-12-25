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
import UserFlightsItinerary from "./components/user-flights-itinerary";
import UserReservedFlights from "./components/user-reserved-flights";
import UserReservedEditFlights from "./components/user-edit-reserved-flights";
import ChooseSeats from "./components/chooseSeats/index";
import Profile from "./components/user-profile";
import Login from "./components/user-login";
import UserSearchDepEdit from "./components/user-search-dep-edit";
import UserSearchRetEdit from "./components/user-search-ret-edit";
import UserDepFlightsEdit from "./components/user-dep-flights-edit";
import UserRetFlightsEdit from "./components/user-ret-flights-edit";
import UserDepSummaryEdit from "./components/user-dep-summary-edit";
import UserRetSummaryEdit from "./components/user-ret-summary-edit";
import UserDepChooseSeatsEdit from "./components/user-dep-choose-seats-edit";
import UserRetChooseSeatsEdit from "./components/user-ret-choose-seats-edit";
import UserDepItineraryEdit from "./components/user-dep-itinerary-edit";
import UserRetItineraryEdit from "./components/user-ret-itinerary-edit";
import ChangeSeats from "./components/changeSeats/change-seats";
import UserSignUp from "./components/user-signup";
function App() {
  return (
    <Router>
      <br />
      <div className="container">
        <Route
          path="/home"
          render={() => (
            <div>
              <Navbar />
              <br />
              <br />
              <WelcomeScreen />
            </div>
          )}
        />
      </div>
      <div className="container">
        <Route
          path="/create"
          render={() => (
            <div>
              <Navbar />
              <br />
              <br />
              <Flight />
            </div>
          )}
        />
      </div>
      <div className="container">
        <Route
          path="/edit"
          render={() => (
            <div>
              <Navbar />
              <br />
              <br />
              <UpdatedFlight />
            </div>
          )}
        />
      </div>
      <div className="container">
        <Route
          path="/tickets"
          render={() => (
            <div>
              <Navbar />
              <br />
              <br />
              <AllFlights />
            </div>
          )}
        />
      </div>
      <div className="container">
        <Route
          path="/search"
          render={() => (
            <div>
              <Navbar />
              <br />
              <br />
              <SearchForm />
            </div>
          )}
        />
      </div>
      <div className="container">
        <Route
          path="/search-results"
          render={() => (
            <div>
              <Navbar />
              <br />
              <br />
              <SearchResults />
            </div>
          )}
        />
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
        <div className="container">
          <Route path="/choose-seats" component={ChooseSeats} />
        </div>
        <Route
          path="/user-flights-itinerary"
          component={UserFlightsItinerary}
        />
      </div>
      <div className="container">
        <Route path="/user-reserved-flights" component={UserReservedFlights} />
      </div>
      <div className="container">
        <Route path="/user-profile" component={Profile} />
      </div>
      <div className="container">
        <Route exact path="/" Redirect to="/user-login" component={Login} />
      </div>
      <div className="container">
        <Route
          path="/user-edit-reserved-flights"
          component={UserReservedEditFlights}
        />
      </div>
      <div className="container">
        <Route path="/user-search-dep-edit" component={UserSearchDepEdit} />
      </div>
      <div className="container">
        <Route path="/user-search-ret-edit" component={UserSearchRetEdit} />
      </div>
      <div className="container">
        <Route path="/user-dep-flights-edit" component={UserDepFlightsEdit} />
      </div>
      <div className="container">
        <Route path="/user-ret-flights-edit" component={UserRetFlightsEdit} />
      </div>
      <div className="container">
        <Route path="/user-dep-summary-edit" component={UserDepSummaryEdit} />
      </div>
      <div className="container">
        <Route path="/user-ret-summary-edit" component={UserRetSummaryEdit} />
      </div>
      <div className="container">
        <Route
          path="/choose-dep-seats-edit"
          component={UserDepChooseSeatsEdit}
        />
      </div>
      <div className="container">
        <Route
          path="/choose-ret-seats-edit"
          component={UserRetChooseSeatsEdit}
        />
      </div>
      <div className="container">
        <Route
          path="/user-dep-itinerary-edit"
          component={UserDepItineraryEdit}
        />
      </div>
      <div className="container">
        <Route
          path="/user-ret-itinerary-edit"
          component={UserRetItineraryEdit}
        />
      </div>
      <div className="container">
        <Route path="/change-seats" component={ChangeSeats} />
      </div>
      <div className="container">
        <Route path="/user-signup" component={UserSignUp} />
      </div>
    </Router>
  );
}
export default App;
