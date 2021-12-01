import React from "react";
import { styled } from "@mui/material/styles";
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

const w = window.innerWidth;

export default function FlightCard(props) {

    return (
        <div>
            <Card sx={{ maxWidth: { w } }}>
                <ThemeProvider theme={theme}>
                    {localStorage.getItem("UFSFClass") === "First Class" && (
                        <CardMedia component="img" alt="header" height="50" image={FH} />
                    )}
                    {localStorage.getItem("UFSFClass") === "Business" && (
                        <CardMedia component="img" alt="header" height="50" image={BH} />
                    )}
                    {localStorage.getItem("UFSFClass") === "Economy" && (
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
                            spacing={85}
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
                            <Stack direction="row" spacing={0.3}>
                                <AccessTimeIcon sx={{ fontSize: 32 }} color="primary" />
                                <Typography variant="h5" color="text.secondary">
                                    {props.ArrivalTime}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack
                            spacing={92}
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
                            spacing={30}
                            direction="row"
                            maxHeight="10"
                            justifyContent="space-around"
                            alignItems="center"
                            marginRight="30px"
                        >
                            {localStorage.getItem("UFSFClass") === "First Class" && (
                                <Stack direction="row">
                                    <LuggageIcon color="primary" sx={{ fontSize: 30 }} />
                                    <Typography variant="h5" color="text.secondary">
                                        Luggage: {props.FirstClassLuggage}
                                    </Typography>
                                </Stack>
                            )}
                            {localStorage.getItem("UFSFClass") === "Business" && (
                                <Stack direction="row">
                                    <LuggageIcon color="primary" sx={{ fontSize: 30 }} />
                                    <Typography variant="h5" color="text.secondary">
                                        Luggage: {props.BusinessClassLuggage}
                                    </Typography>
                                </Stack>
                            )}
                            {localStorage.getItem("UFSFClass") === "Economy" && (
                                <Stack direction="row">
                                    <LuggageIcon color="primary" sx={{ fontSize: 30 }} />
                                    <Typography variant="h5" color="text.secondary">
                                        Luggage: {props.EconomyLuggage}
                                    </Typography>
                                </Stack>
                            )}
                            <Typography variant="h5" color="text.secondary">
                                Seats: {props.Seats}
                            </Typography>
                            {localStorage.getItem("UFSFClass") === "First Class" && (
                                <Stack>
                                    <Typography variant="h6" color="text.secondary">
                                        Price Per Seat:
                                    </Typography>
                                    <Typography variant="h5" color="primary.main">
                                        {props.FirstClassPrice} EGP
                                    </Typography>
                                </Stack>
                            )}
                            {localStorage.getItem("UFSFClass") === "Business" && (
                                <Stack marginRight="250px">
                                    <Typography variant="h6" color="text.secondary">
                                        Price Per Seat:
                                    </Typography>
                                    <Typography variant="h5" color="primary.main">
                                        {props.BusinessClassPrice} EGP
                                    </Typography>
                                </Stack>
                            )}
                            {localStorage.getItem("UFSFClass") === "Economy" && (
                                <Stack marginRight="250px">
                                    <Typography variant="h6" color="text.secondary">
                                        Price Per Seat:
                                    </Typography>
                                    <Typography variant="h5" color="primary.main">
                                        {props.EconomyPrice} EGP
                                    </Typography>
                                </Stack>
                            )}
                        </Stack>
                    </CardContent>
                </ThemeProvider>
            </Card>

            <br />
        </div>
    );
}