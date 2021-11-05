import React from "react";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";


const theme = createTheme({
  palette: {
    primary: {
      main: "#b3e5fc",
    },
    secondary: {
      main: "#1a237e",
    },
  },
});
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#b3e5fc"),
  backgroundColor: "#b3e5fc",
  "&:hover": {
    backgroundColor: "#81d4fa",
  },
}));
const SearchResults = (props) => {

  return props.flights.map((flight) => {
    return (
      <Card sx={{ maxWidth: 1024 }}>
        <ThemeProvider theme={theme}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="https://c4.wallpaperflare.com/wallpaper/737/866/513/wing-airplane-plane-sky-clouds-hd-wallpaper-preview.jpg"
              alt="green iguana"
            />
            <CardContent style={{ backgroundColor: "#b3e5fc" }}>
              <Typography gutterBottom variant="h5" component="div">
                Flight Number: {flight.FlightNo}
              </Typography>
              <Stack spacing={25} direction="row">
                <Typography variant="body2" color="text.secondary">
                  Departure From : {flight.DepartureAirport}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Arrive At: {flight.ArrivalAirport}
                </Typography>
              </Stack>
              <Stack spacing={25} direction="row">
                <Typography variant="body2" color="text.secondary">
                  Departure Time: {flight.DepartureTime}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Arrival Time: {flight.ArrivalTime}
                </Typography>
              </Stack>
              <Stack spacing={25} direction="row">
                <Typography variant="body2" color="text.secondary">
                  Departure Date: {flight.DepartureDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Arrival Date: {flight.ArrivalDate}
                </Typography>
              </Stack>
              <Stack spacing={25} direction="row">
                <Typography variant="body2" color="text.secondary">
                  Business Class Seats: {flight.BusinessClassSeats}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Economy Seats: {flight.EconomySeats}
                </Typography>
              </Stack>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <ColorButton variant="contained">Edit</ColorButton>
            <ColorButton variant="contained">Delete</ColorButton>
          </CardActions>
        </ThemeProvider>
      </Card>
    );
  });
}
export default SearchResults;
