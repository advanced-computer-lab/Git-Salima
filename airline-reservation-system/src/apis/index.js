import axios from 'axios';


export const createFlight = (flight) => {
    axios.post('http://localhost:8000/create',flight).then((res) => {
        console.log("bravo kizo");
      })
}