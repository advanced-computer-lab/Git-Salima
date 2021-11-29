import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActions } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

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
                    <CssBaseline />
                    <CardContent style={{ backgroundColor: "#EFEAE4" }}>
                        <Card
                            sx={{
                                maxWidth: { w },
                                maxHeight: "50px",
                                backgroundColor: "#082567",
                            }}
                        >
                            <Typography
                                marginLeft={w / 25}
                                variant="h4"
                                component="div"
                                color={theme.palette.getContrastText("#082567")}
                            >
                                Flight Number: {props.FlightNo}
                            </Typography>
                        </Card>
                        <br />
                        <Stack spacing={100} direction="row" marginLeft="75px">
                            <Stack spacing={1} direction="row">
                                <Typography variant="h3" color="#082567">
                                    {props.DepartureAirport}
                                </Typography>
                                <FlightTakeoffIcon sx={{ fontSize: 50 }} color="primary" />
                            </Stack>
                            <Stack spacing={1} direction="row">
                                <FlightLandIcon sx={{ fontSize: 50 }} color="primary" />
                                <Typography variant="h3" color="#082567">
                                    {props.ArrivalAirport}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack spacing={115} direction="row" marginLeft="95px">
                            <Typography variant="h5" color="text.secondary">
                                {props.DepartureTime}
                            </Typography>
                            <Typography variant="h5" color="text.secondary">
                                {props.ArrivalTime}
                            </Typography>
                        </Stack>
                        <Stack spacing={105} direction="row" marginLeft="70px">
                            <Typography variant="h5" color="text.secondary">
                                {props.DepartureDate.substring(0, 10)}
                            </Typography>
                            <Typography variant="h5" color="text.secondary">
                                {props.ArrivalDate.substring(0, 10)}
                            </Typography>
                        </Stack>
                        <Typography variant="body1" color="text.secondary">
                            Terminal: {props.Terminal}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Seats: {props.Seats}
                        </Typography>
                        <Stack spacing={25} direction="row">
                            {localStorage.getItem("UFSFClass") === "First Class" && (
                                <Typography variant="body1" color="text.secondary">
                                    First Class Luggage: {props.FirstClassLuggage}
                                </Typography>
                            )}
                            {localStorage.getItem("UFSFClass") === "Business" && (
                                <Typography variant="body1" color="text.secondary">
                                    Business Class Luggage: {props.BusinessClassLuggage}
                                </Typography>
                            )}
                            {localStorage.getItem("UFSFClass") === "Economy" && (
                                <Typography variant="body1" color="text.secondary">
                                    Economy Luggage: {props.EconomyLuggage}
                                </Typography>
                            )}
                        </Stack>
                        <CardActions>
                        </CardActions>
                    </CardContent>
                </ThemeProvider>
            </Card>
            <br />
        </div>
    );
}