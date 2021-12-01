import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { updateSeatsAPI } from '../apis';

export default function MultiActionAreaCard() {

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
    const w = 450;

    const [open, setOpen] = React.useState(false);
    const [openNext, setOpenNext] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickOpenNext = () => {
        setOpenNext(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenNext(false);
    };

    const confirmHandler = () => {
        const bookedDepartureFlight = {
            _id: localStorage.getItem("FlightIDAro"),
            TakenSeats: JSON.parse(localStorage.getItem("departureSeats")),
            Cabin: localStorage.getItem("UFSFClass"),
            BookingNumber: localStorage.getItem("departureBookingNumber"),
            User_id: 1
        }
        console.dir(JSON.parse(localStorage.getItem("departureSeats")))

        const bookedReturnFlight = {
            _id: localStorage.getItem("FlightIDKizo"),
            TakenSeats: JSON.parse(localStorage.getItem("returnSeats")),
            Cabin: localStorage.getItem("UFSFClass"),
            BookingNumber: localStorage.getItem("returnBookingNumber"),
            User_id: 1
        }

        updateSeatsAPI(bookedDepartureFlight);
        updateSeatsAPI(bookedReturnFlight);

        handleClickOpenNext();
    };

    return (
        <Card sx={{ maxWidth: w }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <CardContent style={{ backgroundColor: "#EFEAE4" }}>
                    <Typography gutterBottom variant="h4" component="div">
                        Booking Confirmation
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Total Price: ${localStorage.getItem("totalPrice")}
                    </Typography>
                </CardContent>
                <CardActions>
                    <ColorButton variant="contained" onClick={handleClickOpen}>
                        Confirm Booking
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
                                Are you sure you want to book this flight?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={confirmHandler} autoFocus>
                                Confirm
                            </Button>
                            <Dialog
                                open={openNext}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Flight booked successfully!
                                        <br />
                                        Outbound Booking Number is {localStorage.getItem("departureBookingNumber")}
                                        <br />
                                        Inbound Booking Number is {localStorage.getItem("returnBookingNumber")}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Ok</Button>
                                </DialogActions>
                            </Dialog>
                        </DialogActions>
                    </Dialog>
                </CardActions>
            </ThemeProvider>
        </Card>
    );
}