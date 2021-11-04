import axios from "axios";

export const createFlightAPI = (flight) => {
  axios.post("http://localhost:8000/create", flight).then((res) => {});
};

export const searchFlightsAPI = (flight) => {
  //return
  axios.get("http://localhost:8000/List", flight);
  //  .then((res) => {
  //   console.log("bravo kizo");
  //   return res.data;
  // });
};

export const searchResultsAPI = () => {
  axios.get("http://localhost:8000/List").then((res) => {
    // return res.data;
    //search-results
    //how to pass data from this function
    //const searchFlightResults = res.data;
    // return searchFlightResults;
  });
};
