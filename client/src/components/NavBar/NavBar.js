import React, { useEffect } from "react";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  shiftLeft: {
    marginLeft: "2%",
  },
  marginBotton: {
    marginBottom: "20px",
  },
  alignLeft: {
    marginLeft: "auto",
  },
});

const NavBar = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    const token = user?.token;
    if (token) {
      if (token.exp < new Date().getTime() / 1000) {
        console.log("token Expired");
        logout();
      } else {
        console.log("Token not expired");
      }
    }
  });

  const classes = useStyles();

  const handeLogut = () => {
    logout();
  };
  const logout = () => {
    localStorage.clear();
  };

  return (
    <AppBar className={classes.marginBotton} position="static">
      <Toolbar>
        <Typography variant="h5">Login / SingUp page</Typography>
        <VerifiedUserIcon className={classes.shiftLeft} />
        <Button
          className={classes.alignLeft}
          variant="contained"
          color="secondary"
          component={Link}
          to="/"
          onClick={handeLogut}
        >
          LOGOUT
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
