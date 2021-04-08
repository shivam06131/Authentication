import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
});

const Main = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);
  const classes = useStyles();

  return !user ? (
    <CircularProgress />
  ) : (
    <Container maxWidth="sm">
      <Card>
        <CardHeader
          action={<MoreVertIcon />}
          title={
            user?.result?.givenName || user?.result?.firstname
            //  ||
            // posts?.firstname
          }
          subheader={`You are curently logged in as ${
            user?.result?.email || user?.result?.email
            //  || posts?.email
          }`}
          avatar={
            <Avatar>
              {
                user?.result?.givenName?.charAt(0) ||
                  user?.result?.firstname?.charAt(0)
                //  || posts?.firstname?.charAt(0)
              }
            </Avatar>
          }
        />
        <CardMedia
          className={classes.media}
          image={
            user?.result?.image || user?.result?.imageUrl
            //  || posts?.image
          }
        />
      </Card>
    </Container>
  );
};

export default Main;
