import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/philosopher";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { loginAPI, searchUsersAPI } from "../apis";
import Stack from "@mui/material/Stack";
import { useHistory } from "react-router-dom";
import bg from "./images/boarding.jpg";

import { Typography } from "@mui/material";
import "../styles/header.css";
const Profile = () => {
  const [userEmail, setuserEmail] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [userPassport, setuserPassport] = useState("");
  const [loginError, setloginError] = useState(false);
  const [homeAddress, setHomeAddress] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState([]);
  const [popup, setpopup] = React.useState(false);

  const theme = createTheme({
    typography: {
      fontFamily: "Philosopher",
    },
  });
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#082567"),
    backgroundColor: "#082567",
    fontFamily: "Philosopher",
    "&:hover": {
      backgroundColor: "#5F9CC5",
      fontFamily: "Philosopher",
    },
  }));
  let history = useHistory();
  const loginHandler = async (e) => {
    e.preventDefault();

    const profile = {
      Password: userPassword,
      Email: userEmail,
      PassportNumber: userPassport,
      HomeAddress: homeAddress,
      CountryCode: countryCode,
      TelephoneNumber: telephoneNumber,
    };
    const profileSuccess = {
      Email: userEmail,
    };
    // const userProfile = await createUserAPI(profile);

    const token = await loginAPI(profile);
    console.log(token); //console.log(token.data);

    if (token === false) {
      setloginError(true);
    } else {
      const userData = await searchUsersAPI(profileSuccess);
      console.dir(userData);
      console.log(userData);
      localStorage.setItem("userToken", token);
      localStorage.setItem("userID", userData._id);
      //dont forget to get all of these from db
      localStorage.setItem("userFName", userData[0].FirstName);
      localStorage.setItem("userLName", userData[0].LastName);
      localStorage.setItem("userEmail", userData[0].Email);
      localStorage.setItem("userPassport", userData[0].PassportNumber);
      localStorage.setItem("userHomeAddress", userData[0].HomeAddress);
      localStorage.setItem("userCountryCode", userData[0].CountryCode);
      localStorage.setItem("userTelephoneNumbers", userData[0].TelephoneNumber);
      localStorage.setItem("type", "User");
      console.log(token);
      setpopup(true);
    }
  };

  const guestHandler = async (e) => {
    e.preventDefault();

    localStorage.setItem("userID", "");
    localStorage.setItem("userFName", "");
    localStorage.setItem("userLName", "");
    localStorage.setItem("userEmail", "");
    localStorage.setItem("userPassport", "");
    localStorage.setItem("type", "Guest");
    history.push("/user-home");
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    history.push("/user-signup");
  };

  const handleClose = (e) => {
    e.preventDefault();
    history.push("/user-home");
  };
  return (
    <div>
      <div class="box">
        <img src={bg} alt="Background" class="bg" />
      </div>
      {/* <h1 style={{ textAlign: "center" }} class="wlcmtxt3">
        Please Login or Continue As a Guest
      </h1> */}
      <br />
      <div class="card2">
        <ThemeProvider theme={theme}>
          <Card sx={{ zIndex: 5 }}>
            <CardContent style={{ backgroundColor: "#EFEAE4" }}>
              <Typography variant="h3" color="#082567" textAlign="center">
                Please Login or Continue As a Guest
              </Typography>
              <form onSubmit={loginHandler}>
                {loginError === false && (
                  <div>
                    <div className="form-group col-md-4">
                      <TextField
                        required
                        id="filled-helperText"
                        type="email"
                        aria-describedby="emailHelp"
                        label="Email"
                        variant="filled"
                        onChange={(e) => {
                          setuserEmail(e.target.value);
                        }}
                      />
                    </div>

                    <br />

                    <div className="col-md-4">
                      <TextField
                        id="filled-helperText"
                        label="Password"
                        variant="filled"
                        type="password"
                        required
                        onChange={(e) => {
                          setuserPassword(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                )}
                {loginError === true && (
                  <div>
                    <div className="form-group col-md-4">
                      <TextField
                        required
                        error
                        id="filled-helperText"
                        type="email"
                        aria-describedby="emailHelp"
                        label="Email"
                        variant="filled"
                        onChange={(e) => {
                          setuserEmail(e.target.value);
                        }}
                      />
                    </div>

                    <br />

                    <div className="col-md-4">
                      <TextField
                        id="filled-helperText"
                        error
                        label="Password"
                        variant="filled"
                        type="password"
                        required
                        helperText="Incorrect credentials"
                        onChange={(e) => {
                          setuserPassword(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                )}
                <br />
                <Stack direction="row" spacing={2}>
                  <div className="form-group">
                    <ColorButton
                      variant="contained"
                      type="submit"
                      style={{ fontFamily: "Philosopher" }}
                    >
                      Login
                    </ColorButton>
                  </div>

                  <div className="form-group">
                    <ColorButton
                      variant="contained"
                      onClick={guestHandler}
                      style={
                        ({ fontFamily: "Philosopher" }, { marginLeft: "10px" })
                      }
                    >
                      Continue As Guest
                    </ColorButton>
                  </div>

                  <div className="form-group">
                    <ColorButton
                      variant="contained"
                      onClick={signUpHandler}
                      style={
                        ({ fontFamily: "Philosopher" }, { marginLeft: "10px" })
                      }
                    >
                      Sign Up
                    </ColorButton>
                  </div>
                </Stack>
              </form>
            </CardContent>
          </Card>

          <Card>
            <Dialog
              open={popup}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Logged In Successfully
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>OK</Button>
              </DialogActions>
            </Dialog>
          </Card>
        </ThemeProvider>
      </div>
    </div>
  );
};
export default Profile;
