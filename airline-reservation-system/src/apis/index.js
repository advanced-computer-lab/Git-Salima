import axios from "axios";

export const createFlightAPI = async (flight) => {
  await axios.post("http://localhost:8000/create", flight)
};

export const createUserAPI = async (flight) => {
  await axios.post("http://localhost:8000/createUser", flight)
};


export const searchFlightsAPI = async (flight) => {
  const temp1 = JSON.stringify(flight);
  const temp2 = JSON.parse(temp1);

  return await axios.get("http://localhost:8000/search", { params: temp2 })
    .then((res) => {
      return res.data;
    });
}
export const searchUsersAPI = async (flight) => {
  const temp1 = JSON.stringify(flight);
  const temp2 = JSON.parse(temp1);

  return await axios.get("http://localhost:8000/searchUsers", { params: temp2 })
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


export const editUsersAPI = async (flight) => {

  return await axios.post("http://localhost:8000/updateUser", flight)
    .then((res) => {
      return res.data;
    });
};

export const updateSeatsAPI = async (flight) => {

  await axios.post("http://localhost:8000/createBooking", flight)
    .then((res) => {
      console.log(res.data);
    });
   await axios.post("http://localhost:8000/updateSeats", flight)
    .then((res) => {
      return res.data;
    });



};



export const getAirportsAPI = async () => {

  return await axios.get("http://localhost:8000/getAirports")
    .then((res) => {
      return res.data;
    });
};
