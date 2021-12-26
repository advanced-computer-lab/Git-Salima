/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// core components
import CustomDropdown from "./CustomDropdown.js";
import Button from "./Button.js";
import { useHistory } from "react-router-dom";
import styles from "../styles/headerLinksStyle.js";
import { logout } from "../apis";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  let history = useHistory();
  const LogoutHandler = async (e) => {
    if (localStorage.getItem("userToken") !== "")
      await logout(localStorage.getItem("userToken"));
    history.push("/");
  };
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Profile"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={AccountCircleIcon}
          dropdownList={[
            <Link to="/user-reserved-flights" className={classes.dropdownLink}>
              My Reserved Flights
            </Link>,
            <Link to="/user-profile" className={classes.dropdownLink}>
              Edit My Profile
            </Link>,
            <Link to onClick={LogoutHandler} className={classes.dropdownLink2}>
              Logout
            </Link>,
            // <a
            //   href="https://creativetimofficial.github.io/material-kit-react/#/documentation?ref=mkr-navbar"

            //   target="_blank"
            //   className={classes.dropdownLink}
            // >
            //   Edit My Profile
            // </a>,
          ]}
        />
      </ListItem>
    </List>
  );
}
