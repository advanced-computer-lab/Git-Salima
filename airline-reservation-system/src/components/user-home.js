import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/philosopher";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import Header from "./Header.js";
import HeaderLinks from "./HeaderLinks.js";
import bg from "./bg4.jpg";
import "../styles/header.css";

const Flight = () => {
  const [DepartureDate, setDepartureDate] = useState("");
  const [returnDate, setreturnDate] = useState("");
  const [DepartureAirport, setDepartureAirport] = useState("");
  const [ArrivalAirport, setArrivalAirport] = useState("");
  const [numofChildren, setnumofChildren] = useState(0);
  const [numofAdults, setnumofAdults] = useState(1);

  const [FlightClass, setFlightClass] = React.useState("");
  const [allFlights, setAllFlights] = useState([]);
  //should be done upon authentication >>>>>
  //const user=searchWithUserId();
  localStorage.setItem("userID", "61a6786f911fac3cee540543");
  localStorage.setItem("userFName", "el lahw");
  localStorage.setItem("userLName", "el 5afy");
  localStorage.setItem("userEmail", "ana@elensan");
  localStorage.setItem("userPassport", 123);
  //till here
  useEffect(() => {
    axios.get("http://localhost:8000/list").then((res) => {
      const temp = JSON.stringify(res.data);
      const temp2 = JSON.parse(temp);
      setAllFlights(temp2);
      console.log(temp2);
    });
  }, []);
  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
  ];
  const theme = createTheme({
    typography: {
      fontFamily: "Philosopher",
    },
  });
  let history = useHistory();
  const searchFlight = async (e) => {
    e.preventDefault();

    localStorage.setItem("UFSDAirport", DepartureAirport);
    localStorage.setItem("UFSAAirport", ArrivalAirport);
    localStorage.setItem("UFSDDate", DepartureDate);
    localStorage.setItem("UFSRDate", returnDate);
    localStorage.setItem("UFSFClass", FlightClass);
    localStorage.setItem(
      "numOfSeats",
      Number(numofAdults) + Number(numofChildren)
    );

    history.push("/user-dep-flights");
  };
  const handleChange = (event) => {
    setFlightClass(event.target.value);
  };
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#082567"),
    backgroundColor: "#082567",
    fontFamily: "Philosopher",
    "&:hover": {
      backgroundColor: "#5F9CC5",
      fontFamily: "Philosopher",
    },
  }));
  const w = window.outerWidth;
  const tweakDate = (s) => {
    const temp = JSON.stringify(s);
    const temp2 = JSON.parse(temp);
    const ret = temp2.substring(0, 10) + "T00:00:00.000+00:00";
    return ret;
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <div class="box">
          <img class="img" src={bg} alt="Background" />
        </div>
        <Typography variant="h1" class="wlcmtxt">
          {" "}
          Git Salima Airlines
        </Typography>
        <Typography class="wlcmtxt2">
          {" "}
          We Git you where you want to go
        </Typography>
        <Header
          color="transparent"
          brand="Git Salima Airlines"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 100,
            color: "white",
          }}
        />
        <br />
        <div class="card">
          <Typography variant="h2">Flight Search</Typography>
          <Card>
            <CardContent style={{ backgroundColor: "#EFEAE4" }}>
              <form onSubmit={searchFlight}>
                <div className="row">
                  <div className="col">
                    <TextField
                      required
                      id="filled-required"
                      label="Departure Airport"
                      defaultValue="Departure Airport"
                      variant="filled"
                      value={DepartureAirport}
                      onChange={(e) => setDepartureAirport(e.target.value)}
                    />
                  </div>

                  <div className="col-md-10">
                    <TextField
                      required
                      id="filled-required"
                      label="Arrival Airport"
                      defaultValue="Arrival Airport"
                      variant="filled"
                      value={ArrivalAirport}
                      onChange={(e) => setArrivalAirport(e.target.value)}
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="form-group" className="col-md-6">
                    <label>Departure Date: </label>
                    <input
                      type="date"
                      required
                      className="form-control"
                      value={DepartureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                    />
                  </div>

                  <div className="form-group" className="col-md-6">
                    <label>Arrival Date: </label>
                    <input
                      type="date"
                      required
                      className="form-control"
                      value={returnDate}
                      onChange={(e) => setreturnDate(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-2">
                    <TextField
                      id="filled-number"
                      label="Number of Adults"
                      type="number"
                      defaultValue="1"
                      InputProps={{ inputProps: { min: 1 } }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                      onChange={(e) => setnumofAdults(e.target.value)}
                    />
                  </div>

                  <div className="col-md-2 ">
                    <TextField
                      id="filled-number"
                      label="Number of Children"
                      type="number"
                      defaultValue="0"
                      InputProps={{ inputProps: { min: 0 } }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                      onChange={(e) => setnumofChildren(e.target.value)}
                    />
                  </div>
                  <div className="col-md-2">
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-label">
                        Flight Class
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={FlightClass}
                        label="Class"
                        required
                        onChange={handleChange}
                      >
                        <MenuItem value={"Economy"}>Economy</MenuItem>
                        <br />
                        <MenuItem value={"Business"}>Business</MenuItem>
                        <br />
                        <MenuItem value={"First Class"}>First Class</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <br />

                <br />
                <div className="form-group">
                  <ColorButton
                    variant="contained"
                    type="submit"
                    style={{ fontFamily: "Philosopher" }}
                  >
                    Search
                  </ColorButton>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </ThemeProvider>
    </div>
  );
};
export default Flight;
