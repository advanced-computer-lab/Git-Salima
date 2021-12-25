import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/philosopher";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { editUsersAPI } from "../apis";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Header from "./Header.js";
import HeaderLinks from "./HeaderLinks.js";
import { useHistory } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { searchUsersAPI, changePassword } from "../apis";
const Profile = () => {
  const [userFirstName, setuserFirstName] = useState(
    localStorage.getItem("userFName")
  );
  const [userLastName, setuserLastName] = useState(
    localStorage.getItem("userLName")
  );
  const [userEmail, setuserEmail] = useState(localStorage.getItem("userEmail"));
  const [userPassport, setuserPassport] = useState(
    localStorage.getItem("userPassport")
  );
  const [userHomeAddress, setuserHomeAddress] = useState(
    localStorage.getItem("userHomeAddress")
  );
  const [userCountryCode, setuserCountryCode] = useState(
    localStorage.getItem("userCountryCode")
  );
  const [userTelephoneNumbers, setuserTelephoneNumbers] = useState(
    localStorage.getItem("userTelephoneNumbers")
  );

  const [editOccured, seteditOccured] = useState("false");
  const [popup, setpopup] = React.useState(false);
  const [passwordpopup, setpasswordpopup] = React.useState(false);
  const [currentPassword, setcurrentPassword] = useState("");
  const [IncorrectCurrentPassword, setIncorrectCurrentPassword] =
    useState(false);
  const [userNewPassword1, setuserNewPassword1] = useState("");
  const [userNewPassword2, setuserNewPassword2] = useState("");
  const [match, setmatch] = useState(true);
  const [errorText, seterrorText] = useState("");

  const profileInfo = {
    FirstName: userFirstName,
    LastName: userLastName,
    Email: userEmail,
    PassportNumber: userPassport,
    HomeAddress: userHomeAddress,
    CountryCode: userCountryCode,
    TelephoneNumber: userTelephoneNumbers,
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: "#082567",
      },
      secondary: {
        main: "#FBB404",
      },
    },
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
  const editHandler = (e) => {
    e.preventDefault();
    const profile = {
      _id: localStorage.getItem("userID"),
      FirstName: userFirstName,
      LastName: userLastName,
      Email: userEmail,
      PassportNumber: userPassport,
      HomeAddress: userHomeAddress,
      CountryCode: userCountryCode,
      TelephoneNumber: userTelephoneNumbers,
    };
    editUsersAPI(profile);
    localStorage.setItem("userFName", userFirstName);
    localStorage.setItem("userLName", userLastName);
    localStorage.setItem("userEmail", userEmail);
    localStorage.setItem("userPassport", userPassport);

    localStorage.setItem("userHomeAddress", userHomeAddress);
    localStorage.setItem("userCountryCode", userCountryCode);
    localStorage.setItem("userTelephoneNumbers", userTelephoneNumbers);
    setpopup(true);
  };
  let history = useHistory();
  const handleClose = (e) => {
    e.preventDefault();
    history.push("/user-home");
  };
  const handleClosePassword = (e) => {
    e.preventDefault();
    window.location.reload(false);
  };
  const passwordHandler = async (e) => {
    e.preventDefault();
    const profile = {
      Email: localStorage.getItem("userEmail"),
      //5AALI BALAK
      Password: currentPassword,
      newPassword: userNewPassword2,
    };
    const res = await searchUsersAPI(profile);
    console.log(res);
    //if (
    //res[0].Email === localStorage.getItem("userEmail") &&
    // res[0].Password === currentPassword
    // ) {
    //setIncorrectCurrentPassword(false);
    if (userNewPassword1 === userNewPassword2) {
      if (userNewPassword1.length >= 6) {
        setmatch(true);
        try {
          await changePassword(profile);
          setIncorrectCurrentPassword(false);
          setpasswordpopup(true);
        } catch (error) {
          setIncorrectCurrentPassword(true);
        }
      } else {
        setmatch(false);
        seterrorText("New password must be at least 6 characters");
      }
    } else {
      setmatch(false);
      seterrorText("Passwords do not match");
    }
    // } else setIncorrectCurrentPassword(true);
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Edit Your Profile</h1>
      <br />
      <ThemeProvider theme={theme}>
        <Header
          color="primary"
          fixed
          brand="Git Salima Airlines"
          rightLinks={<HeaderLinks />}
          // changeColorOnScroll={{
          //   height: 0,
          //   color: "#082567",
          // }}
        />
        <br /> <br />
        <br />
        <br />
        {localStorage.getItem("type") === "User" && (
          <div>
            <Card
              sx={{
                maxWidth: "50%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <CardContent style={{ backgroundColor: "#EFEAE4" }}>
                {/* <form onSubmit={searchFlight}> */}
                <div className="row ">
                  <div className="col-md-4 offset-md-1">
                    <TextField
                      id="filled-helperText"
                      label="First Name"
                      defaultValue={profileInfo.FirstName}
                      variant="filled"
                      onChange={(e) => {
                        setuserFirstName(e.target.value);
                        seteditOccured("true");
                      }}
                    />
                  </div>

                  <div className="col-md-4 offset-md-2">
                    <TextField
                      id="filled-helperText"
                      label="Last Name"
                      defaultValue={profileInfo.LastName}
                      variant="filled"
                      onChange={(e) => {
                        setuserLastName(e.target.value);
                        seteditOccured("true");
                      }}
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-4 offset-md-1">
                    <TextField
                      id="filled-helperText"
                      label="Email"
                      defaultValue={profileInfo.Email}
                      variant="filled"
                      onChange={(e) => {
                        setuserEmail(e.target.value);
                        seteditOccured("true");
                      }}
                    />
                  </div>
                  <br />
                  <div className="col-md-4 offset-md-2">
                    <TextField
                      id="filled-helperText"
                      label="Passport Number"
                      defaultValue={profileInfo.PassportNumber}
                      variant="filled"
                      onChange={(e) => {
                        setuserPassport(e.target.value);
                        seteditOccured("true");
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 offset-md-2">
                    <TextField
                      id="filled-helperText"
                      label="Home Address"
                      defaultValue={profileInfo.HomeAddress}
                      variant="filled"
                      onChange={(e) => {
                        setuserHomeAddress(e.target.value);
                        seteditOccured("true");
                      }}
                    />
                  </div>
                  <div className="col-md-4 offset-md-1">
                    <TextField
                      id="filled-helperText"
                      label="Country Code"
                      defaultValue={profileInfo.CountryCode}
                      variant="filled"
                      onChange={(e) => {
                        setuserCountryCode(e.target.value);
                        seteditOccured("true");
                      }}
                    />
                  </div>
                  <div className="col-md-4 offset-md-1">
                    <TextField
                      id="filled-helperText"
                      label="Telephone Number(s)"
                      defaultValue={profileInfo.TelephoneNumber}
                      variant="filled"
                      onChange={(e) => {
                        setuserTelephoneNumbers(e.target.value);
                        seteditOccured("true");
                      }}
                    />
                  </div>
                  <br />
                </div>
                <br />
                <Accordion
                  style={{
                    backgroundColor: "#EFEAE4",
                    maxWidth: "80%",
                    marginLeft: "10%",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Change Password</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <form onSubmit={passwordHandler}>
                      {IncorrectCurrentPassword === false && (
                        <div className="col">
                          <TextField
                            label="Your Current Password"
                            variant="filled"
                            type="password"
                            onChange={(e) => {
                              setcurrentPassword(e.target.value);
                            }}
                          />
                        </div>
                      )}
                      {IncorrectCurrentPassword === true && (
                        <div className="col">
                          <TextField
                            id="filled-error"
                            error
                            label="Your Current Password"
                            variant="filled"
                            type="password"
                            helperText="Incorrect password"
                            onChange={(e) => {
                              setcurrentPassword(e.target.value);
                            }}
                          />
                        </div>
                      )}
                      <br />
                      {match === true && (
                        <div>
                          <div className="col">
                            <TextField
                              label="New Password"
                              variant="filled"
                              type="password"
                              onChange={(e) => {
                                setuserNewPassword1(e.target.value);
                              }}
                            />
                          </div>
                          <br />
                          <div className="col">
                            <TextField
                              label="Confirm New Password"
                              variant="filled"
                              type="password"
                              onChange={(e) => {
                                setuserNewPassword2(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      )}
                      {match === false && (
                        <div>
                          <div className="col">
                            <TextField
                              id="filled-error"
                              error
                              label="New Password"
                              variant="filled"
                              type="password"
                              helperText={errorText}
                              onChange={(e) => {
                                setuserNewPassword1(e.target.value);
                              }}
                            />
                          </div>
                          <br />
                          <div className="col">
                            <TextField
                              id="filled-error"
                              error
                              label="Confirm New Password"
                              variant="filled"
                              type="password"
                              helperText={errorText}
                              onChange={(e) => {
                                setuserNewPassword2(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      )}
                      <div style={{ marginLeft: "60%" }}>
                        <br />
                        <ColorButton
                          variant="contained"
                          type="submit"
                          style={{ fontFamily: "Philosopher" }}
                        >
                          Edit Password
                        </ColorButton>
                      </div>
                    </form>
                  </AccordionDetails>
                </Accordion>
                <br />

                <br />
                {editOccured === "false" && (
                  <div className="form-group">
                    <ColorButton
                      disabled
                      variant="contained"
                      type="submit"
                      style={{ fontFamily: "Philosopher" }}
                    >
                      Edit Profile
                    </ColorButton>
                  </div>
                )}
                {editOccured === "true" && (
                  <div className="form-group">
                    <ColorButton
                      variant="contained"
                      onClick={editHandler}
                      style={{ fontFamily: "Philosopher" }}
                    >
                      Edit Profile
                    </ColorButton>
                  </div>
                )}
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
                    Info Updated Successfully
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>OK</Button>
                </DialogActions>
              </Dialog>
            </Card>
            <Card>
              <Dialog
                open={passwordpopup}
                onClose={handleClosePassword}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Password Changed Successfully
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClosePassword}>OK</Button>
                </DialogActions>
              </Dialog>
            </Card>
          </div>
        )}
        {localStorage.getItem("type") === "Guest" && (
          <Stack direction="row" spacing={1.2} style={{ marginLeft: "15%" }}>
            <h2 style={{ textAlign: "center" }} className="colour">
              You should be logged in in order to have a profile. Login in
            </h2>
            <Link
              href="/"
              underline="always"
              sx={{ fontSize: "30px", fontFamily: "Philosopher" }}
            >
              {"here."}
            </Link>
          </Stack>
        )}
      </ThemeProvider>
    </div>
  );
};
export default Profile;
