import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import CardMedia from "@mui/material/CardMedia";
import EH from "./Economy Header.png";
import FH from "./First Header.png";
import BH from "./Business Header.png";
import LuggageIcon from "@mui/icons-material/Luggage";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import { styled } from "@mui/material/styles";
import { Button, CardActions } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#082567",
        },
    },
    typography: {
        fontFamily: "Philosopher",
    },
});

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#082567"),
    backgroundColor: "#082567",
    "&:hover": {
        backgroundColor: "#5F9CC5",
    },
}));

const w = window.innerWidth;

export default function ReservationFlightCard(props) {

    let takenSeats = "";

    for (let seat of props.TakenSeats) {
        takenSeats = takenSeats + " " + seat.row + seat.number;
    }

    const cancelReservationHandler = () => {
        props.onClickCancel(props);
    };

    return (
        <div>
            <Card sx={{ maxWidth: { w } }}>
                <ThemeProvider theme={theme}>
                    {props.Cabin === "First Class" && (
                        <CardMedia component="img" alt="header" height="50" image={FH} />
                    )}
                    {props.Cabin === "Business" && (
                        <CardMedia component="img" alt="header" height="50" image={BH} />
                    )}
                    {props.Cabin === "Economy" && (
                        <CardMedia component="img" alt="header" height="50" image={EH} />
                    )}

                    <CssBaseline />
                    <CardContent style={{ backgroundColor: "#EFEAE4" }}>
                        <Stack
                            direction="row"
                            justifyContent="space-around"
                            alignItems="center"
                        >
                            <Typography
                                variant="h4"
                                component="div"
                                color="primary"
                                alignItems="center"
                            >
                                Flight Number: {props.FlightNo}
                            </Typography>
                        </Stack>
                        <Stack
                            direction="row"
                            justifyContent="space-around"
                            alignItems="center"
                            spacing={30}
                        >
                            <Stack spacing={1} direction="row">
                                <Typography variant="h3" color="#082567">
                                    {props.DepartureAirport}
                                </Typography>
                                <FlightTakeoffIcon sx={{ fontSize: 50 }} color="primary" />
                            </Stack>
                            <Stack spacing={1} direction="row">
                                <hr
                                    style={{
                                        position: "absolute",
                                        top: 150,
                                        left: 380,
                                        color: "text.secondary",
                                        backgroundColor: "text.secondary",
                                        height: 3,
                                        width: 640,
                                    }}
                                />
                            </Stack>
                            <Stack spacing={1} direction="row">
                                <FlightLandIcon sx={{ fontSize: 50 }} color="primary" />
                                <Typography variant="h3" color="#082567">
                                    {props.ArrivalAirport}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack
                            spacing={25}
                            direction="row"
                            justifyContent="space-around"
                            alignItems="center"
                            marginRight="15px"
                        >
                            <Stack direction="row" spacing={0.3}>
                                <AccessTimeIcon sx={{ fontSize: 32 }} color="primary" />
                                <Typography variant="h5" color="text.secondary">
                                    {props.DepartureTime}
                                </Typography>
                            </Stack>
                            <Stack direction="row" >
                                <Typography variant="h5" color="text.secondary">
                                    Seats: {takenSeats}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={0.3}>
                                <AccessTimeIcon sx={{ fontSize: 32 }} color="primary" />
                                <Typography variant="h5" color="text.secondary">
                                    {props.ArrivalTime}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack
                            spacing={25}
                            direction="row"
                            justifyContent="space-around"
                            alignItems="center"
                            marginRight="40px"
                            marginLeft="30px"
                        >
                            <Stack direction="row" spacing={0.3}>
                                <EventIcon sx={{ fontSize: 32 }} color="primary" />
                                <Typography variant="h5" color="text.secondary">
                                    {props.DepartureDate.substring(0, 10)}
                                </Typography>
                            </Stack>
                            <Stack direction="row" >
                                <Typography variant="h5" color="text.secondary">
                                    Booking Number: {props.BookingNumber}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={0.3}>
                                <EventIcon sx={{ fontSize: 32 }} color="primary" />
                                <Typography variant="h5" color="text.secondary">
                                    {props.ArrivalDate.substring(0, 10)}
                                </Typography>
                            </Stack>
                        </Stack>
                        <hr
                            style={{
                                marginTop: 10,
                                color: "text.secondary",
                                backgroundColor: "text.secondary",
                                height: 1,
                                width: { w },
                            }}
                        />

                        <Stack
                            spacing={38}
                            direction="row"
                            maxHeight="10"
                            justifyContent="space-around"
                            alignItems="center"
                            marginLeft="40px"
                            marginRight="55px"
                        >
                            {props.Cabin === "First Class" && (
                                <Stack direction="row">
                                    <LuggageIcon color="primary" sx={{ fontSize: 30 }} />
                                    <Typography variant="h5" color="text.secondary">
                                        Luggage: {props.FirstClassLuggage}
                                    </Typography>
                                </Stack>
                            )}
                            {props.Cabin === "Business" && (
                                <Stack direction="row">
                                    <LuggageIcon color="primary" sx={{ fontSize: 30 }} />
                                    <Typography variant="h5" color="text.secondary">
                                        Luggage: {props.BusinessClassLuggage}
                                    </Typography>
                                </Stack>
                            )}
                            {props.Cabin === "Economy" && (
                                <Stack direction="row">
                                    <LuggageIcon color="primary" sx={{ fontSize: 30 }} />
                                    <Typography variant="h5" color="text.secondary">
                                        Luggage: {props.EconomyLuggage}
                                    </Typography>
                                </Stack>
                            )}
                            {props.Cabin === "First Class" && (
                                <Stack>
                                    <Typography variant="h6" color="text.secondary">
                                        Price Per Seat:
                                    </Typography>
                                    <Typography variant="h5" color="primary.main">
                                        {props.FirstClassPrice} EGP
                                    </Typography>
                                </Stack>
                            )}
                            {props.Cabin === "Business" && (
                                <Stack marginRight="250px">
                                    <Typography variant="h6" color="text.secondary">
                                        Price Per Seat:
                                    </Typography>
                                    <Typography variant="h5" color="primary.main">
                                        {props.BusinessClassPrice} EGP
                                    </Typography>
                                </Stack>
                            )}
                            {props.Cabin === "Economy" && (
                                <Stack marginRight="250px">
                                    <Typography variant="h6" color="text.secondary">
                                        Price Per Seat:
                                    </Typography>
                                    <Typography variant="h5" color="primary.main">
                                        {props.EconomyPrice} EGP
                                    </Typography>
                                </Stack>
                            )}
                            <CardActions>
                                <ColorButton variant="contained" onClick={cancelReservationHandler}>
                                    Cancel Reservation
                                </ColorButton>
                            </CardActions>
                        </Stack>
                    </CardContent>
                </ThemeProvider>
            </Card>

            <br />
        </div >
    );
}