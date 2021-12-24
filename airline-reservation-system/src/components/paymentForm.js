import React , {useState} from 'react'
import { CardElement, useElements, useStripe  } from '@stripe/react-stripe-js'
import  axios  from 'axios'
import "../styles/header.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { updateSeatsAPI, createBookingAPI, sendEmailAPI } from "../apis";
import Stack from "@mui/material/Stack";
import { useHistory } from "react-router-dom";

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

  const w = 500;


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentForm() {
    const [success , setSuccess] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const [open, setOpen] = React.useState(false);
  const [openNext, setOpenNext] = React.useState(false);

  const email = {
    to: localStorage.getItem("userEmail"),
    subject: "Flight Itinerary",
    text:
      "Dear " +
      localStorage.getItem("userFName") +
      " " +
      localStorage.getItem("userLName") +
      "," +
      "\n" +
      "Thank you for booking with Git Salima Airlines \n" +
      "Your airlines booking reference:"+
      localStorage.getItem("bookingNumber") + "\n" +
      "Your flight booking has been confirmed and electronic ticket been issued"  +
      "\n" +
      "Ticket total price: " +
      localStorage.getItem("totalPrice") +
      " EGP" +
      "\n" +
      "The Git Salima Team",
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement)
    })

    if(!error){
        try {
            const {id} = paymentMethod
            const response = await axios.post("http://localhost:8000/payment",{
                amount: parseInt(localStorage.getItem("totalPrice"))*100,
                id
            })

            if(response.data.success){
                console.log("successful payment");
                setSuccess(true);
            }
            sendEmailAPI(email);
            handleClickOpenNext();
        } catch (error) {
            console.log("Error",error);
        }
    }
    else{
        console.log(error.message);
    }
}

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
  let history = useHistory();
  const confirmHandler = async () => {
    const bookedFlight = {
      _id: localStorage.getItem("FlightIDAro"),
      Return_id: localStorage.getItem("FlightIDKizo"),
      TakenSeats: JSON.parse(localStorage.getItem("departureSeats")),
      ReturnTakenSeats: JSON.parse(localStorage.getItem("returnSeats")),
      Cabin: localStorage.getItem("UFSFClass"),
      BookingNumber: localStorage.getItem("bookingNumber"),
      TotalPrice: localStorage.getItem("totalPrice"),
      User_id: localStorage.getItem("userID"),
    };
    handleSubmit();

    handleClickOpenNext();
    await updateSeatsAPI(bookedFlight);
    await createBookingAPI(bookedFlight).then(() => console.log("ay haga 2"));
  };
  const handleOK = () => {
    history.push("/user-reserved-flights");
  };
  


   
    return (
        <>
        <Card sx={{ maxWidth: w }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CardContent style={{ backgroundColor: "#EFEAE4" }}>
        {!success ?
            <div>
                 <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
                <button onClick={handleClickOpen}>Pay</button>
            </div>
            :
            <div>
                <h2>successful payment</h2>
            </div>
            }  
        </CardContent>
        <CardActions>
          
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
                    Your Flight Booking Number is{" "}
                    {localStorage.getItem("bookingNumber")}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleOK}>Ok</Button>
                </DialogActions>
              </Dialog>
            </DialogActions>
          </Dialog>
        </CardActions>
        
      </ThemeProvider>
    </Card>
        </>
    )
}
