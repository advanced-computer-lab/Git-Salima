import react from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CF from "./createImg.jpg";
import AF from "./allFlightsImg.jpg";
import SR from "./searchIMG.jpg";
import { CardActionArea } from "@mui/material";
import Link from "@mui/material/Link";

const theme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
export default function Home() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          fontFamily: "Roboto",
          textalign: "center",
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: window.innerWidth,
            height: 250,
            //backgroundImage: `url(${Photo})`,
            backgroundColor: "#EFEAE4",
          },
        }}
      >
        <Card sx={{}}>
          <CardContent>
            <Typography
              variant="h1"
              component="div"
              marginLeft={w / 50}
              color="#1a237e"
            >
              Git Salima Airlines
            </Typography>
            <Typography
              variant="h3"
              color="text.secondary"
              marginLeft={w / 45}
              marginRight={w / 45}
              textAlign="center"
              color="#3D44C2"
            >
              We Git you where you want to go
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ fontFamily: "Roboto" }}>
        <Stack direction="row" spacing={4.5}>
          <Card sx={{ width: 380, height: 300, backgroundColor: "#3D44C2", marginLeft: "40px" }}>
            <CardActionArea>
              <Link href="/create" underline="none">
                <CardMedia
                  component="img"
                  height="140"
                  image={CF}
                  alt="create flight"
                />
                <CardContent>
                  <Typography
                    marginLeft="2px"
                    marginTop="50px"
                    marginBottom="50px"
                    textAlign="center"
                    variant="h4"
                    component="div"
                    color="#EFEAE4"
                  >
                    Create Flights
                  </Typography>
                </CardContent>
              </Link>
            </CardActionArea>
          </Card>
          <Card sx={{ width: 380, height: 300, backgroundColor: "#F77970" }}>
            <CardActionArea>
              <Link href="/tickets" underline="none">
                <CardMedia
                  component="img"
                  height="140"
                  image={AF}
                  alt="all flights"
                />
                <CardContent>
                  <Typography
                    marginLeft="2px"
                    marginTop="50px"
                    marginBottom="50px"
                    textAlign="center"
                    variant="h4"
                    component="div"
                    color="#EFEAE4"
                  >
                    View All Flights
                  </Typography>
                </CardContent>
              </Link>
            </CardActionArea>
          </Card>
          <Card sx={{ width: 380, height: 300, backgroundColor: "#DD4E5B" }}>
            <CardActionArea>
              <Link href="/search" underline="none">
                <CardMedia
                  component="img"
                  height="140"
                  image={SR}
                  alt="search"
                />
                <CardContent>
                  <Typography
                    marginLeft="2px"
                    marginTop="50px"
                    marginBottom="50px"
                    textAlign="center"
                    variant="h4"
                    component="div"
                    color="#EFEAE4"
                  >
                    Search Flights
                  </Typography>
                </CardContent>
              </Link>
            </CardActionArea>
          </Card>
        </Stack>
      </Box>

      <br />
      <br />
      <br />
      <br />
      <br />
    </ThemeProvider>
  );
}
