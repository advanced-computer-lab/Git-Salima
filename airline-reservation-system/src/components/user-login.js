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

import { useHistory } from "react-router-dom";
const Profile = () => {

    const [userFirstName, setuserFirstName] = useState("");
    const [userLastName, setuserLastName] = useState("");
    const [userEmail, setuserEmail] = useState("");
    const [userPassport, setuserPassport] = useState("");
    const [userPassword, setuserPassword] = useState("");
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
            FirstName: userFirstName,
            LastName: userLastName,
            Email: userEmail,
            PassportNumber: userPassport,
        };
        const userProfile = await createUserAPI(profile);

        localStorage.setItem("userID", userProfile._id);
        localStorage.setItem("userFName", userFirstName);
        localStorage.setItem("userLName", userLastName);
        localStorage.setItem("userEmail", userEmail);
        localStorage.setItem("userPassport", userPassport);

        setpopup(true);

    };

    const handleClose = (e) => {
        e.preventDefault();
        history.push("/user-home");
    };
    return (
        <div>
            <h1 style={{ textAlign: 'center' }} >Please Login</h1>
            <br />
            <ThemeProvider theme={theme}>
                <Card>
                    <CardContent style={{ backgroundColor: "#EFEAE4" }}>
                        {/* <form onSubmit={searchFlight}> */}
                        <div className="row">
                            <div className="col">
                                <TextField
                                    id="filled-helperText"
                                    label="First Name"
                                    variant="filled"
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
                                    onChange={(e) => {
                                        setuserLastName(e.target.value);
                                    }}
                                />
                            </div>
                        </div>

                        <br />

                        <div className="form-group col-md-4">
                            <TextField
                                id="filled-helperText"
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
                                onChange={(e) => {
                                    setuserPassport(e.target.value);
                                }}
                            />
                        </div>

                        <br />

                        <div className="col-md-4">
                            <TextField
                                id="filled-helperText"
                                label="Password"
                                variant="filled"
                                onChange={(e) => {
                                    setuserPassword(e.target.value);
                                }}
                            />
                        </div>

                        <br />

                        <div className="form-group">
                            <ColorButton
                                variant="contained"
                                onClick={loginHandler}
                                style={{ fontFamily: "Philosopher" }}
                            >
                                Login
                            </ColorButton>
                        </div>

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
    );
};
export default Profile;