import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/philosopher";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { editUsersAPI } from "../apis";
const Profile = () => {
  const [userFirstName, setuserFirstName] = useState("");
  const [userLastName, setuserLastName] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [userPassport, setuserPassport] = useState("");
  const [editOccured, seteditOccured] = useState("false");

  const profileInfo = {
    FirstName: localStorage.getItem("userFName"),
    LastName: localStorage.getItem("userLName"),
    Email: localStorage.getItem("userEmail"),
    PassportNumber: localStorage.getItem("userPassport"),
  };
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
  const editHandler = (e) => {
    e.preventDefault();
    console.log("onClick tamam");
    const profile = {
      FirstName: userFirstName,
      LastName: userLastName,
      Email: userEmail,
      PassportNumber: userPassport,
    };
    editUsersAPI(profile);
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Card>
          <CardContent style={{ backgroundColor: "#EFEAE4" }}>
            {/* <form onSubmit={searchFlight}> */}
            <div className="row">
              <div className="col">
                <TextField
                  id="filled-helperText"
                  label="Helper text"
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
                  label="Helper text"
                  defaultValue={profileInfo.LastName}
                  variant="filled"
                  value={profileInfo.LastName}
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
                label="Helper text"
                defaultValue={profileInfo.Email}
                variant="filled"
                value={profileInfo.Email}
                onChange={(e) => {
                  setuserEmail(e.target.value);
                  seteditOccured("true");
                }}
              />
            </div>

            <div className="col-md-2 ">
              <TextField
                id="filled-helperText"
                label="Helper text"
                defaultValue={profileInfo.PassportNumber}
                variant="filled"
                value={profileInfo.PassportNumber}
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
      </ThemeProvider>
    </div>
  );
};
export default Profile;
