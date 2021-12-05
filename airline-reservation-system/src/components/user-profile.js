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
  const [editOccured, seteditOccured] = useState("false");
  const [popup, setpopup] = React.useState(false);

  const profileInfo = {
    FirstName: userFirstName,
    LastName: userLastName,
    Email: userEmail,
    PassportNumber: userPassport,
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
    };
    editUsersAPI(profile);
    localStorage.setItem("userFName", userFirstName);
    localStorage.setItem("userLName", userLastName);
    localStorage.setItem("userEmail", userEmail);
    localStorage.setItem("userPassport", userPassport);
    setpopup(true);
  };
  let history = useHistory();
  const handleClose = (e) => {
    e.preventDefault();
    history.push("/user-home");
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
            <Card>
              <CardContent style={{ backgroundColor: "#EFEAE4" }}>
                {/* <form onSubmit={searchFlight}> */}
                <div className="row">
                  <div className="col">
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

                  <div className="col-md-10">
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

                <div className="form-group col-md-2">
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
                <div className="col-md-2 ">
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
