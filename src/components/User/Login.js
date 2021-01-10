import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LinkMU from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { loginDB } from "../../api";
import useForm from "../../useForm";
import { useToasts } from "react-toast-notifications";
import { UserConsumer } from "../../userContext";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="/">Master Sales</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(sales-background.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(6, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialFieldValues = {
  username: "",
  password: "",
};

export default function SignIn(props) {
  const classes = useStyles();
  //toast msg.
  const { addToast } = useToasts();

  //validate()
  //validate({fullName:'jenny'})
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("username" in fieldValues)
      temp.username = fieldValues.username ? "" : "Hãy nhập tên đăng nhập";
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "Hãy nhập mật khẩu";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFieldValues, validate);

  const handleSubmit = async (e, value) => {
    e.preventDefault();
    if (validate()) {
      const user = {
        tenDangNhap: values.username,
        matKhau: values.password,
      };
      const loginRes = await loginDB(user);
      resetForm();
      if (loginRes !== null) {
        value.logIn(loginRes);
        addToast("Đăng nhập vào Master Sales thành công", {
          appearance: "success",
        });
        //props.history.push("/");
      } else {
        addToast("Tài khoản không hợp lệ, cùng thử lại nhé", {
          appearance: "warning",
        });
      }
      // if (props.currentId == 0)
      //     props.createDCandidate(values, onSuccess)
      // else
      //     props.updateDCandidate(props.currentId, values, onSuccess)
    }
  };

  return (
    <UserConsumer>
      {(value) => {
        return (
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={8} className={classes.image} />
            <Grid
              item
              xs={12}
              sm={8}
              md={4}
              component={Paper}
              elevation={6}
              square
            >
              <div className={classes.paper}>
                <img style={{width:'20rem', height: '15rem'}} src="https://i.pinimg.com/originals/35/4e/c4/354ec459e1d4a56819d490b5a8c9e531.png" alt="Log in" />
                <form
                  className={classes.form}
                  noValidate
                  onSubmit={(e) => handleSubmit(e, value)}
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="off"
                    autoFocus
                    value={values.username}
                    onChange={handleInputChange}
                    {...(errors.username && {
                      error: true,
                      helperText: errors.username,
                    })}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={values.password}
                    onChange={handleInputChange}
                    {...(errors.password && {
                      error: true,
                      helperText: errors.password,
                    })}
                  />
                  {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
                  <div style={{ textAlign: "center" }}>
                    <Button
                      type="submit"
                      //fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Đăng nhập
                    </Button>
                  </div>

                  <Grid container>
                    <Grid item xs>
                      <Link to="/getpw">Quên mật khẩu</Link>
                    </Grid>
                    <Grid item>
                      <Link to="/signup">{"Chưa có tài khoản? Đăng kí"}</Link>
                    </Grid>
                  </Grid>
                  <Box mt={5}>
                    <Copyright />
                  </Box>
                </form>
              </div>
            </Grid>
          </Grid>
        );
      }}
    </UserConsumer>
  );
}
