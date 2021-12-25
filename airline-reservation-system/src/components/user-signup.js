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
import { createUserAPI } from "../apis";
import Stack from "@mui/material/Stack";
import { useHistory } from "react-router-dom";
const Profile = () => {
  const [userFirstName, setuserFirstName] = useState("");
  const [userLastName, setuserLastName] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [userPassport, setuserPassport] = useState("");
  const [userPassword, setuserPassword] = useState("");
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
  const signupHandler = async (e) => {
    e.preventDefault();

    const profile = {
      Password: userPassword,
      FirstName: userFirstName,
      LastName: userLastName,
      Email: userEmail,
      PassportNumber: userPassport,
      HomeAddress: homeAddress,
      CountryCode: countryCode,
      TelephoneNumber: telephoneNumber,
    };
    const userProfile = await createUserAPI(profile);

    localStorage.setItem("userID", userProfile._id);
    localStorage.setItem("userFName", userFirstName);
    localStorage.setItem("userLName", userLastName);
    localStorage.setItem("userEmail", userEmail);
    localStorage.setItem("userPassport", userPassport);
    localStorage.setItem("userHomeAddress", homeAddress);
    localStorage.setItem("userCountryCode", countryCode);
    localStorage.setItem("userTelephoneNumbers", telephoneNumber);
    localStorage.setItem("type", "User");

    setpopup(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    history.push("/");
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Please Enter Your Data</h1>
      <br />
      <ThemeProvider theme={theme}>
        <Card>
          <CardContent style={{ backgroundColor: "#EFEAE4" }}>
            <form onSubmit={signupHandler}>
              <div className="form-row">
                <div className="col">
                  <TextField
                    id="filled-helperText"
                    label="First Name"
                    variant="filled"
                    required
                    onChange={(e) => {
                      setuserFirstName(e.target.value);
                    }}
                  />
                </div>

                <br />

                <div className="col-md-10">
                  <TextField
                    id="filled-helperText"
                    label="Last Name"
                    variant="filled"
                    required
                    onChange={(e) => {
                      setuserLastName(e.target.value);
                    }}
                  />
                </div>
              </div>

              <br />

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
                  label="Passport Number"
                  variant="filled"
                  required
                  onChange={(e) => {
                    setuserPassport(e.target.value);
                  }}
                />
              </div>

              <br />
              <div className="col-md-4">
                <TextField
                  id="filled-helperText"
                  label="Home Address"
                  variant="filled"
                  required
                  onChange={(e) => {
                    setHomeAddress(e.target.value);
                  }}
                />
              </div>

              <br />

              <div className="col-md-4">
                <TextField
                  id="filled-helperText"
                  label="Country Code"
                  variant="filled"
                  type="number"
                  required
                  onChange={(e) => {
                    setCountryCode(e.target.value);
                  }}
                />
              </div>

              <br />

              <div className="col-md-4">
                <TextField
                  id="filled-helperText"
                  label="Telephone Number"
                  variant="filled"
                  type="number"
                  required
                  onChange={(e) => {
                    setTelephoneNumber(e.target.value);
                  }}
                />
              </div>

              <br />

              <div className="col-md-4">
                <TextField
                  id="filled-helperText"
                  label="Password"
                  variant="filled"
                  inputProps={{ minLength: 6 }}
                  type="password"
                  required
                  onChange={(e) => {
                    setuserPassword(e.target.value);
                  }}
                />
              </div>

              <br />
              <Stack direction="row" spacing={2}>
                <div className="form-group">
                  <ColorButton
                    variant="contained"
                    type="submit"
                    style={{ fontFamily: "Philosopher" }}
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
                Signed Up Successfully
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>OK</Button>
            </DialogActions>
          </Dialog>
        </Card>
      </ThemeProvider>
    </div>
  );
};
export default Profile;
