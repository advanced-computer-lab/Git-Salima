import axios from "axios";

export const createFlightAPI = (flight) => {
  axios.post("http://localhost:8000/create", flight).then((res) => {});
};

export const searchFlightsAPI = (flight) => {
  axios.put("http://localhost:8000/search", flight).then((res) => {
    console.log("bravo kizo");
  });
};

export const searchResultsAPI = () => {
  axios.get("http://localhost:8000/List").then((res) => {
    //search-results
    //how to pass data from this function
    //const searchFlightResults = res.data;
    // return searchFlightResults;
  });
};
