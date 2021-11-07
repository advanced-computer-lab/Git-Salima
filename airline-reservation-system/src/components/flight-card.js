import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { deleteFlightsAPI } from "../apis";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#b3e5fc"),
  backgroundColor: "#b3e5fc",
  "&:hover": {
    backgroundColor: "#81d4fa",
  },
}));
const w = window.innerWidth;
const h = window.innerHeight;

export default function FlightCard(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editHandler = () => {
    props.onClickEdit(props);
  };
  const deleteHandler = () => {
    props.onClickDelete(props);
    setOpen(false);
    window.location.reload(false);
  };

  return (
    <div>
      <Card sx={{ maxWidth: { w }, fontFamily: "Roboto" }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* <CardMedia
              component="img"
              height="140"
              image="https://c4.wallpaperflare.com/wallpaper/737/866/513/wing-airplane-plane-sky-clouds-hd-wallpaper-preview.jpg"
              alt="green iguana"
            /> */}
          <CardContent style={{ backgroundColor: "#EFEAE4" }}>
            <Typography marginLeft={w / 27} variant="h4" component="div">
              Flight Number: {props.FlightNo}
            </Typography>
            <br />
            <Stack spacing={25} direction="row">
              <Typography variant="body2" color="text.secondary">
                Departure From: {props.DepartureAirport}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Arrive At: {props.ArrivalAirport}
              </Typography>
            </Stack>
            <Stack spacing={25} direction="row">
              <Typography variant="body2" color="text.secondary">
                Departure Time: {props.DepartureTime}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Arrival Time: {props.ArrivalTime}
              </Typography>
            </Stack>
            <Stack spacing={25} direction="row">
              <Typography variant="body2" color="text.secondary">
                Departure Date: {props.DepartureDate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Arrival Date: {props.ArrivalDate}
              </Typography>
            </Stack>
            <Stack spacing={25} direction="row">
              <Typography variant="body2" color="text.secondary">
                Business Class Seats: {props.BusinessClassSeats}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Economy Seats: {props.EconomySeats}
              </Typography>
            </Stack>
            <CardActions>
              <ColorButton variant="contained" onClick={editHandler}>
                Edit
              </ColorButton>
              <ColorButton variant="contained" onClick={handleClickOpen}>
                Delete
              </ColorButton>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this flight?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={deleteHandler} autoFocus>
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
            </CardActions>
          </CardContent>
        </ThemeProvider>
      </Card>

      <br />
    </div>
  );
}

//   return (
//     <div>
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Open alert dialog
//       </Button>

//     </div>
//   );
// }
