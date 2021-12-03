import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/philosopher";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
const Profile = () => {
  const [userFirstName, setuserFirstName] = useState("");
  const [userLastName, setuserLastName] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [userPassport, setuserPassport] = useState("");

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
                  defaultValue={userFirstName}
                  variant="filled"
                  value={userFirstName}
                  onChange={(e) => setuserFirstName(e.target.value)}
                />
              </div>

              <div className="col-md-10">
                <TextField
                  id="filled-helperText"
                  label="Helper text"
                  defaultValue={userLastName}
                  variant="filled"
                  value={userLastName}
                  onChange={(e) => setuserLastName(e.target.value)}
                />
              </div>
            </div>
            <br />

            <div className="form-group col-md-2">
              <TextField
                id="filled-helperText"
                label="Helper text"
                defaultValue={userEmail}
                variant="filled"
                value={userEmail}
                onChange={(e) => setuserEmail(e.target.value)}
              />
            </div>

            <div className="col-md-2 ">
              <TextField
                id="filled-helperText"
                label="Helper text"
                defaultValue={userPassport}
                variant="filled"
                value={userPassport}
                onChange={(e) => setuserPassport(e.target.value)}
              />
            </div>

            <br />

            <br />
            <div className="form-group">
              <ColorButton
                variant="contained"
                type="submit"
                style={{ fontFamily: "Philosopher" }}
              >
                Search
              </ColorButton>
            </div>
          </CardContent>
        </Card>
      </ThemeProvider>
    </div>
  );
};
export default Profile;
