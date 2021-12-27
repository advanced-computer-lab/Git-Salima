import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/philosopher";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import Header from "./Header.js";
import HeaderLinks from "./HeaderLinks.js";
import bg from "./bg4.jpg";
import { accessCheck } from "../apis";
import "../styles/header.css";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../styles/teamStyle.js";
import classNames from "classnames";
import GridContainer from "./GridContainer";
import Button2 from "./Button";
import Stack from "@mui/material/Stack";
//import Card2 from "components/Card/Card.js";
import GridItem from "./GridItem";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";
import team1 from "./images/mario.jpg";
import team2 from "./images/atef.jpg";
import team3 from "./images/kizo.jpg";
import team4 from "./images/amgad.jpg";
import team5 from "./images/ya.jpg";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const useStyles = makeStyles(styles);
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#082567"),
  backgroundColor: "#082567",
  fontFamily: "Philosopher",
  "&:hover": {
    backgroundColor: "#5F9CC5",
    fontFamily: "Philosopher",
  },
}));
const theme = createTheme({
  typography: {
    fontFamily: "Philosopher",
  },
});

const Flight = () => {
  const [DepartureDate, setDepartureDate] = useState("");
  const [ReturnDate, setReturnDate] = useState("");
  const [DepartureAirport, setDepartureAirport] = useState("");
  const [ArrivalAirport, setArrivalAirport] = useState("");
  const [numofChildren, setnumofChildren] = useState(0);
  const [numofAdults, setnumofAdults] = useState(1);
  const [FlightClass, setFlightClass] = React.useState("");
  const [Token, setToken] = useState(false);
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  useEffect(() => {
    (async function () {
      try {
        console.log(localStorage.getItem("userToken"));
        const bhb = await accessCheck(localStorage.getItem("userToken"));
        setToken(bhb.data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  let history = useHistory();
  const searchFlight = async (e) => {
    e.preventDefault();

    localStorage.setItem("UFSDAirport", DepartureAirport);
    localStorage.setItem("UFSAAirport", ArrivalAirport);
    localStorage.setItem("UFSDDate", tweakDate(DepartureDate));
    localStorage.setItem("UFSRDate", tweakDate(ReturnDate));
    localStorage.setItem("UFSFClass", FlightClass);
    localStorage.setItem(
      "numOfSeats",
      Number(numofAdults) + Number(numofChildren)
    );

    history.push("/user-dep-flights");
  };
  const handleChange = (event) => {
    setFlightClass(event.target.value);
  };

  const tweakDate = (s) => {
    const temp = JSON.stringify(s);
    const temp2 = JSON.parse(temp);
    const ret = temp2.substring(0, 10) + "T00:00:00.000+00:00";
    return ret;
  };
  const checkToken = async (e) => {
    e.preventDefault();
    console.log("ahoooooooooooooooooo");
    return await accessCheck(localStorage.getItem("userToken"));
  };

  return (
    <div>
      {(Token === true) | (localStorage.getItem("type") === "Guest") && (
        <div>
          <ThemeProvider theme={theme}>
            <div class="box">
              <img class="img" src={bg} alt="Background" />
            </div>
            <Typography variant="h1" class="wlcmtxt">
              {" "}
              Git Salima Airlines
            </Typography>
            <Typography class="wlcmtxt2">
              {" "}
              We Git you where you want to go
            </Typography>
            <Header
              color="transparent"
              brand="Git Salima Airlines"
              rightLinks={<HeaderLinks />}
              fixed
              changeColorOnScroll={{
                height: 100,
                color: "white",
              }}
            />
            <br />
            <div class="card">
              <Card elevation={24}>
                <CardContent style={{ backgroundColor: "#EFEAE4" }}>
                  <Typography variant="h2" sx={{ marginLeft: "35%" }}>
                    Flight Search
                  </Typography>
                  <br />
                  <form onSubmit={searchFlight}>
                    <Stack>
                      <Stack
                        direction="row"
                        spacing={4}
                        justifyContent="space-around"
                      >
                        <div>
                          <TextField
                            required
                            id="filled-required"
                            label="Departure Airport"
                            defaultValue="Departure Airport"
                            variant="filled"
                            value={DepartureAirport}
                            onChange={(e) =>
                              setDepartureAirport(e.target.value)
                            }
                          />
                        </div>

                        <div>
                          <TextField
                            required
                            id="filled-required"
                            label="Arrival Airport"
                            defaultValue="Arrival Airport"
                            variant="filled"
                            value={ArrivalAirport}
                            onChange={(e) => setArrivalAirport(e.target.value)}
                          />
                        </div>
                        <div>
                          <TextField
                            id="filled-number"
                            label="Number of Adults"
                            type="number"
                            defaultValue="1"
                            InputProps={{ inputProps: { min: 1 } }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="filled"
                            onChange={(e) => setnumofAdults(e.target.value)}
                          />
                        </div>

                        <div>
                          <TextField
                            id="filled-number"
                            label="Number of Children"
                            type="number"
                            defaultValue="0"
                            InputProps={{ inputProps: { min: 0 } }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="filled"
                            onChange={(e) => setnumofChildren(e.target.value)}
                          />
                        </div>
                      </Stack>
                      <br />
                      <Stack
                        direction="row"
                        spacing={6}
                        justifyContent="space-around"
                      >
                        <Stack
                          direction="row"
                          spacing={12}
                          justifyContent="space-around"
                        >
                          <div>
                            <Typography>Departure Date: </Typography>
                            <input
                              type="date"
                              required
                              className="form-control"
                              value={DepartureDate}
                              onChange={(e) => setDepartureDate(e.target.value)}
                            />
                          </div>

                          <div>
                            <Typography>Return Date: </Typography>
                            <input
                              type="date"
                              required
                              min={DepartureDate}
                              font-family="Philosopher"
                              className="form-control"
                              value={ReturnDate}
                              onChange={(e) => setReturnDate(e.target.value)}
                            />
                          </div>
                        </Stack>
                        <Stack direction="row" fullwidth>
                          <div>
                            <FormControl sx={{ width: 480 }}>
                              <InputLabel
                                id="demo-simple-select-label"
                                fullwidth
                              >
                                Flight Class
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={FlightClass}
                                label="Class"
                                fullwidth
                                required
                                onChange={handleChange}
                              >
                                <MenuItem value={"Economy"}>Economy</MenuItem>
                                <br />
                                <MenuItem value={"Business"}>Business</MenuItem>
                                <br />
                                <MenuItem value={"First Class"}>
                                  First Class
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                        </Stack>
                      </Stack>
                    </Stack>
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
                  </form>
                </CardContent>
              </Card>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br /> <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br /> <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className={classes.section} elevation={24}>
              <Typography variant="h3" className={classes.title}>
                The Git Salima Team
              </Typography>
              <br />
              <div>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <Card plain>
                      <GridItem
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.itemGrid}
                      >
                        <img src={team1} alt="..." className={imageClasses} />
                      </GridItem>
                      <Typography variant="h4" className={classes.cardTitle}>
                        Mario Ayman
                        <br />
                        <small className={classes.smallTitle}>Front End</small>
                      </Typography>
                      <CardBody>
                        <Typography variant="p" className={classes.description}>
                          Mario guided this project to fruition with top-notch
                          work ethic and an observant eye for detail. The focus
                          and dedication he put to the table was unparalleled.
                        </Typography>
                      </CardBody>
                      <CardFooter className={classes.justifyCenter}>
                        <Button2
                          justIcon
                          color="transparent"
                          className={classes.margin5}
                          href="https://github.com/MarioAbdelmalek"
                        >
                          <GitHubIcon />
                        </Button2>
                        <Button2
                          justIcon
                          color="transparent"
                          className={classes.margin5}
                          href="https://www.linkedin.com/in/mario-ayman/"
                        >
                          <LinkedInIcon />
                        </Button2>
                      </CardFooter>
                    </Card>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Card plain>
                      <GridItem
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.itemGrid}
                      >
                        <img src={team2} alt="..." className={imageClasses} />
                      </GridItem>
                      <Typography variant="h4" className={classes.cardTitle}>
                        Philopateer Atef
                        <br />
                        <small className={classes.smallTitle}>Back End</small>
                      </Typography>
                      <CardBody>
                        <Typography variant="p" className={classes.description}>
                          Philopateer has been of paramount importance to this
                          project. Weather it was debugging ,co-ordination ,or
                          even UX design, all of his work was delivered with
                          utmost professionalism, punctuality and efficiency.
                        </Typography>
                      </CardBody>
                      <CardFooter className={classes.justifyCenter}>
                        <Button2
                          justIcon
                          color="transparent"
                          className={classes.margin5}
                          href="https://github.com/philo-atef"
                        >
                          <GitHubIcon />
                        </Button2>
                        <Button2
                          justIcon
                          color="transparent"
                          className={classes.margin5}
                          href="https://www.linkedin.com/in/philopateer-atef-115316129/"
                        >
                          <LinkedInIcon />
                        </Button2>
                      </CardFooter>
                    </Card>
                    <br />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Card plain>
                      <GridItem
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.itemGrid}
                      >
                        <img src={team4} alt="..." className={imageClasses} />
                      </GridItem>
                      <Typography variant="h4" className={classes.cardTitle}>
                        Philopateer Amgad
                        <br />
                        <small className={classes.smallTitle}>
                          Scrum Master/Front End
                        </small>
                      </Typography>
                      <CardBody>
                        <Typography variant="p" className={classes.description}>
                          Philopateer ensured the presence of harmonious
                          co-ordination and communication between the team
                          members. That and his own work in Front End showed
                          determination and perseverence.
                        </Typography>
                      </CardBody>
                      <CardFooter className={classes.justifyCenter}>
                        <Button2
                          justIcon
                          color="transparent"
                          className={classes.margin5}
                          href="https://github.com/PhiloAmgad"
                        >
                          <GitHubIcon />
                        </Button2>
                        <Button2
                          justIcon
                          color="transparent"
                          className={classes.margin5}
                          href="https://www.linkedin.com/in/philopateer-amgad/"
                        >
                          <LinkedInIcon />
                        </Button2>
                      </CardFooter>
                    </Card>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Card plain>
                      <GridItem
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.itemGrid}
                      >
                        <img src={team3} alt="..." className={imageClasses} />
                      </GridItem>
                      <Typography variant="h4" className={classes.cardTitle}>
                        Kirolos Habib
                        <br />
                        <small className={classes.smallTitle}>Full Stack</small>
                      </Typography>
                      <CardBody>
                        <Typography variant="p" className={classes.description}>
                          Kirolos has brought to this project versatility and
                          flexability. Seeing as to his experiences with both
                          front and back ends allowed for a cohesive progress of
                          the development process.
                        </Typography>
                      </CardBody>
                      <CardFooter className={classes.justifyCenter}>
                        <Button2
                          justIcon
                          color="transparent"
                          className={classes.margin5}
                          href="https://github.com/kirolos-Rezkalla"
                        >
                          <GitHubIcon />
                        </Button2>
                        <Button2
                          justIcon
                          color="transparent"
                          className={classes.margin5}
                          href="https://www.linkedin.com/in/kirolos-rezkalla-99891a1b9/"
                        >
                          <LinkedInIcon />
                        </Button2>
                      </CardFooter>
                    </Card>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <Card plain>
                      <GridItem
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.itemGrid}
                      >
                        <img src={team5} alt="..." className={imageClasses} />
                      </GridItem>
                      <Typography variant="h4" className={classes.cardTitle}>
                        Yossef Ahmed
                        <br />
                        <small className={classes.smallTitle}>Back End</small>
                      </Typography>
                      <CardBody>
                        <Typography variant="p" className={classes.description}>
                          Yossef's experience with content creation and graphic
                          design has allowed for a smooth UI.
                        </Typography>
                      </CardBody>
                      <CardFooter className={classes.justifyCenter}>
                        <Button2
                          justIcon
                          color="transparent"
                          className={classes.margin5}
                          href="https://github.com/youssefahmeddd"
                        >
                          <GitHubIcon />
                        </Button2>
                        <Button2
                          justIcon
                          color="transparent"
                          className={classes.margin5}
                          href="https://www.instagram.com/yossef_ahmed/"
                        >
                          <InstagramIcon />
                        </Button2>
                      </CardFooter>
                    </Card>
                  </GridItem>
                </GridContainer>
              </div>
            </div>
          </ThemeProvider>
        </div>
      )}
      {Token === false && <h1>Unauthorized Access</h1>}
    </div>
  );
};
export default Flight;
