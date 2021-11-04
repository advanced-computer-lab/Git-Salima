import axios from "axios";

export const createFlightAPI = (flight) => {
  axios.post("http://localhost:8000/create", flight).then((res) => {});
};

export const searchFlightsAPI = async (flight) => {
  //console.log(JSON.stringify(flight));
  const temp=JSON.stringify(flight);
  const temp2=JSON.parse(temp);
  return await  axios.get("http://localhost:8000/search", { params: temp2}).then((res) => {
    

    return res.data;
  });
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
