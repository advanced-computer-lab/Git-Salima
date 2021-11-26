import React, { useState, useEffect } from "react";
import { searchFlightsAPI } from "../apis";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchResults from "./search-results";
import "@fontsource/philosopher";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import dateAdapter from "@mui/lab/AdapterDateFns";
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

const Flight = () => {
  const [FlightNo, setFlightNo] = useState("");
  const [DepartureDate, setDepartureDate] = useState("");
  const [ArrivalDate, setArrivalDate] = useState("");
  const [DepartureTime, setDepartureTime] = useState("");
  const [ArrivalTime, setArrivalTime] = useState("");
  const [Terminal, setTerminal] = useState("");
  const [EconomySeats, setEconomySeats] = useState("");
  const [BusinessClassSeats, setBusinessClassSeats] = useState("");
  const [FirstClassSeats, setFirstClassSeats] = useState("");
  const [DepartureAirport, setDepartureAirport] = useState("");
  const [ArrivalAirport, setArrivalAirport] = useState("");
  const [EconomyLuggage, setEconomyLuggage] = useState("");
  const [BusinessClassLuggage, setBusinessClassLuggage] = useState("");
  const [FirstClassLuggage, setFirstClassLuggage] = useState("");

  const [showResult, setShowResult] = useState("search");
  const [results, setResults] = useState([]);
  const [FlightClass, setFlightClass] = React.useState("");
  const [allFlights, setAllFlights] = useState([]);
  //this is for the autocomplete , just need airports without duplicates for it to work

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
    //WRITE THIS THERE AND SET LOCAL STORAGE ONE VARIABLE PER ATTRIBUTE

    localStorage.setItem("UFSDAirport", DepartureAirport);
    localStorage.setItem("UFSAAirport", ArrivalAirport);
    localStorage.setItem("UFSDDate", DepartureDate);
    localStorage.setItem("UFSADate", ArrivalDate);
    console.log("local Storage");
    console.log(localStorage.getItem("UserFSCriteria"));
    history.push("/user-dep-flights");
  };
  const handleChange = (event) => {
    setFlightClass(event.target.value);
  };
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#082567"),
    backgroundColor: "#082567",
    "&:hover": {
      backgroundColor: "#5F9CC5",
    },
  }));

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Typography variant="h2">Search Flight</Typography>
        {/* <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <Autocomplete
              id="auto-complete"
              autoComplete
              includeInputInList
              options={allFlights}
              getOptionLabel={(option) => option.DepartureAirport.toString()}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Departure Airport"
                  variant="standard"
                />
              )}
            />

            <TextField
              required
              id="filled-required"
              label="Departure Airport"
              defaultValue="Departure Airport"
              variant="filled"
              value={DepartureAirport}
              onChange={(e) => setDepartureAirport(e.target.value)}
            />
            <TextField
              required
              id="filled-required"
              label="Arrival Airport"
              defaultValue="Arrival Airport"
              variant="filled"
              value={ArrivalAirport}
              onChange={(e) => setArrivalAirport(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Departure Date"
                value={DepartureDate}
                onChange={(newValue) => {
                  setDepartureDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Return Date"
                value={ArrivalDate}
                onChange={(newValue) => {
                  setArrivalDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
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
            />
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
            />
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">
                Flight Class
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={FlightClass}
                label="Class"
                onChange={handleChange}
              >
                <MenuItem value={"Economy"}>Economy</MenuItem>
                <MenuItem value={"Business"}>Business</MenuItem>
                <MenuItem value={"First Class"}>First Class</MenuItem>
              </Select>
            </FormControl>
          </div>
          <ColorButton variant="contained" onClick={searchFlight}>
            Search
          </ColorButton>
        </Box> */}
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
                <div className="form-group col-md-2">
                  <LocalizationProvider required dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Departure Date"
                      value={DepartureDate}
                      required
                      onChange={(newValue) => {
                        setDepartureDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>

                <div className="form-group col-md-2">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Return Date"
                      value={ArrivalDate}
                      required
                      onChange={(newValue) => {
                        setArrivalDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
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
                      <MenuItem value={"Business"}>Business</MenuItem>
                      <MenuItem value={"First Class"}>First Class</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <br />

              <br />
              <div className="form-group">
                <ColorButton variant="contained" type="submit">
                  Search
                </ColorButton>
              </div>
            </form>
          </CardContent>
        </Card>
      </ThemeProvider>
    </div>
  );
};
export default Flight;
