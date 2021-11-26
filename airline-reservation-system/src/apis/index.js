import axios from "axios";

export const createFlightAPI = async (flight) => {
  await axios.post("http://localhost:8000/create", flight)
};

export const searchFlightsAPI = async (flight) => {
  const temp1 = JSON.stringify(flight);
  const temp2 = JSON.parse(temp1);

  return await axios.get("http://localhost:8000/search", { params: temp2 })
    .then((res) => {
      return res.data;
    });
}
export const userSearchFlightsAPI = async (flight) => {
  const temp1 = JSON.stringify(flight);
  const temp2 = JSON.parse(temp1);

  return await axios.get("http://localhost:8000/user/search", { params: temp2 })
    .then((res) => {
      return res.data;
    });
}
export const deleteFlightsAPI = async (flight) => {
  const temp = JSON.stringify(flight);
  const temp2 = JSON.parse(temp);

  return await axios.get("http://localhost:8000/delete", { params: temp2 })
    .then((res) => {
      return res.data;
    });
};

export const editFlightsAPI = async (flight) => {

  return await axios.post("http://localhost:8000/update", flight)
    .then((res) => {
      return res.data;
    });
};
export const getAirports = async () => {


  return await axios.get("http://localhost:8000/getAirports")
    .then((res) => {
      return res.data;
    });
};
