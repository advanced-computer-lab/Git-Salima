import axios from "axios";

export const createFlightAPI = async (flight) => {
  await axios.post("http://localhost:8000/create", flight);
};

export const accessCheck = async (accessT) => {

  const config = {
    headers: { Authorization: `Bearer ${accessT}` }
};

await axios.post("http://localhost:8000/checkauth", null,config);
};


export const createUserAPI = async (flight) => {
  const temp1 = JSON.stringify(flight);
  const temp2 = JSON.parse(temp1);

  return await axios
    .post("http://localhost:8000/createUser", temp2)
    .then((res) => {
      return res.data;
    });
};

export const searchFlightsAPI = async (flight) => {
  const temp1 = JSON.stringify(flight);
  const temp2 = JSON.parse(temp1);

  return await axios
    .post("http://localhost:8000/search", temp2 )
    .then((res) => {
      return res.data;
    });
};
export const searchUsersAPI = async (flight) => {
  const temp1 = JSON.stringify(flight);
  const temp2 = JSON.parse(temp1);

  return await axios
    .post("http://localhost:8000/searchUsers",  temp2 )
    .then((res) => {
      return res.data;
    });
};

export const userSearchFlightsAPI = async (flight) => {
  const temp1 = JSON.stringify(flight);
  const temp2 = JSON.parse(temp1);

  return await axios
    .post("http://localhost:8000/user/search", temp2 )
    .then((res) => {
      return res.data;
    });
};

export const userFlightsAPI = async (flight) => {
  const temp1 = JSON.stringify(flight);
  const temp2 = JSON.parse(temp1);

  return await axios
    .post("http://localhost:8000/searchBookings", temp2)
    .then((res) => {
      return res.data;
    });
};

export const deleteFlightsAPI = async (flight) => {
  const temp = JSON.stringify(flight);
  const temp2 = JSON.parse(temp);

  return await axios
    .post("http://localhost:8000/delete", temp2 )
    .then((res) => {
      return res.data;
    });
};

export const editFlightsAPI = async (flight) => {
  return await axios
    .post("http://localhost:8000/update", flight)
    .then((res) => {
      return res.data;
    });
};

export const editUsersAPI = async (flight) => {
  return await axios
    .post("http://localhost:8000/updateUser", flight)
    .then((res) => {
      return res.data;
    });
};

export const updateSeatsAPI = async (flight) => {
  //await axios.post("http://localhost:8000/createBooking", flight);

  await axios.post("http://localhost:8000/updateSeats", flight).then((res) => {
    return res.data;
  });
};

export const createBookingAPI = async (flight) => {
  await axios.post("http://localhost:8000/createBooking", flight);
  // .then((res) => {
  //   return res.data;
  // });
};

export const removeSeatsAPI = async (flight) => {
  await axios.post("http://localhost:8000/removeSeats", flight).then((res) => {
    return res.data;
  });
};

export const removeBookingAPI = async (flight) => {
  await axios.post("http://localhost:8000/deleteBooking", flight);
};

export const getAirportsAPI = async () => {
  return await axios.get("http://localhost:8000/getAirports").then((res) => {
    return res.data;
  });
};
export const sendEmailAPI = async (flight) => {
  return await axios.post("http://localhost:8000/email", flight).then((res) => {
    return res.data;
  });
};
export const updateBookingAPI = async (flight) => {
  return await axios
    .post("http://localhost:8000/updateBooking", flight)
    .then((res) => {
      return res.data;
    });
};
