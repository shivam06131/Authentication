import {
  Button,
  Container,
  FormControl,
  Icon,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GoogleLogin from "react-google-login";
import SearchIcon from "@material-ui/icons/Search";
import { useState , useEffect } from "react";
import { useDispatch } from "react-redux";
import { CreatePost, LogIn } from "../../Actions/auth";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { AUTH } from "../../Constaints/Auth";
import { useHistory } from "react-router-dom";
import FileBase from "react-file-base64";
import { GetPOst } from "../../Actions/auth";

const useStyles = makeStyles((theme) => ({
  fullwidthInsidePaper: {
    width: "90%",
    margin: theme.spacing(2),
  },
  containerTop: {
    marginTop: theme.spacing(7),
  },
  image: {
    width: "97%",
    margin: "10px 0",
  },
}));

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmpassword: "",
  image: "",
};

const Auth = () => {
  const [login, setLogin] = useState(false);
  const history = useHistory();
  const [password, setPassword] = useState(true);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const classes = useStyles();

  const handleShowPassword = () => {
    setPassword((oldState) => !oldState);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login) {
      dispatch(LogIn(formData, history));
    } else {
      dispatch(CreatePost(formData, history));
    }
    // setFormData(null);
  };

  const handleLogin = () => {
    setLogin((oldState) => !oldState);
  };

  const googleSucess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    const data = {
      // firstname: result?.givenName,
      // lastname: result?.familyName,
      result,
      token,
      // email: result?.email,
    };
    dispatch({ type: AUTH, data });
    history.push("/main");
  };

  const googleFailure = (error) => {
    console.log(error);
  };

  useEffect(() => {
    dispatch(GetPOst());
  }, [handleSubmit]);

  return (
    <Container maxWidth="sm" className={classes.containerTop}>
      <Paper>
        <form onSubmit={handleSubmit}>
          <Typography align="center" variant="h3">
            SignUp
          </Typography>
          {!login && (
            <TextField
              className={classes.fullwidthInsidePaper}
              label="FirstName"
              name="firstname"
              onChange={handleChange}
            />
          )}
          {!login && (
            <TextField
              className={classes.fullwidthInsidePaper}
              label="Lastname"
              name="lastname"
              onChange={handleChange}
            />
          )}
          <TextField
            className={classes.fullwidthInsidePaper}
            label="EmailID"
            name="email"
            onChange={handleChange}
          />

          <FormControl fullWidth className={classes.fullwidthInsidePaper}>
            <InputLabel>Password</InputLabel>
            <Input
              type={`${password ? "password" : "text"}`}
              onChange={handleChange}
              name="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {password ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {!login && (
            <FormControl fullWidth className={classes.fullwidthInsidePaper}>
              <InputLabel>Password</InputLabel>
              <Input
                name="confirmpassword"
                type="password"
                onChange={handleChange}
              />
            </FormControl>
          )}
          {!login && (
            <div className={classes.fullwidthInsidePaper}>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => {
                  setFormData({ ...formData, image: base64 });
                }}
              />
            </div>
          )}
          <Button
            variant="contained"
            type="submit"
            className={classes.fullwidthInsidePaper}
            color="primary"
            fullWidth
          >
          {!login ? "Submit" : "Login" }
          </Button>
          <GoogleLogin
            clientId="13451408988-0943b6olurnh4m4fcafdoej255191d4u.apps.googleusercontent.com"
            onSuccess={googleSucess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
            render={(renderPorps) => (
              <Button
                className={classes.fullwidthInsidePaper}
                fullWidth
                color="secondary"
                variant="contained"
                onClick={renderPorps.onClick}
                startIcon={
                  <Icon>
                    <SearchIcon />
                  </Icon>
                }
              >
                Google Login
              </Button>
            )}
          />
          <Button
            variant="outlined"
            fullWidth
            className={classes.fullwidthInsidePaper}
            onClick={handleLogin}
          >
            {login ? "Create a new Account" : "Already a user , Login?"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
