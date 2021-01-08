import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import useForm from "../../useForm";
import { useToasts } from "react-toast-notifications";
import { UserConsumer } from "../../userContext";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="">
        Master Sales
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialFieldValues = {
  username: "",
  password: "",
  fullname: "",
  address: "",
  phone: "",
};

export default function SignUp(props) {
  const classes = useStyles();

  const { addToast } = useToasts();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("fullname" in fieldValues)
      temp.fullname = fieldValues.fullname ? "" : "Bạn chưa nhập họ tên";
    if ("username" in fieldValues)
      temp.username = fieldValues.username ? "" : "Bạn chưa nhập tên đăng nhập";
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "Bạn chưa nhập mật khẩu";
    if ("address" in fieldValues)
      temp.address = fieldValues.address ? "" : "Bạn chưa nhập địa chỉ";
    if ("phone" in fieldValues)
      temp.phone = fieldValues.phone ? "" : "Bạn chưa nhập số điện thoại";
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
        id: 1,
        tenDangNhap: values.username,
        matKhau: values.password,
        tenKh: values.fullname,
        diaChi: values.address,
        sdt: values.phone,
      };
      //const signupRes = await signupDB(user);
      // if (signupRes !== null) {
      //   value.login(signupRes);
      //   addToast("Đăng kí tài khoản Master Sales thành công", {
      //     appearance: "success",
      //   });
      //   //props.history.push("/");
      // } else {
      //   addToast("Tài khoản không thể đăng kí, cùng thử lại nhé", {
      //     appearance: "warning",
      //   });
      // }
    }
  };

  return (
    <UserConsumer>
      {(value) => {
        return (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <form className={classes.form} noValidate onSubmit={(e) => handleSubmit(e,value)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Đăng kí
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2">
                      Đã có tài khoản? Đăng nhập
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={5}>
              <Copyright />
            </Box>
          </Container>
        );
      }}
    </UserConsumer>
  );
}
