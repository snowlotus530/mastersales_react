import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
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
import { postUserToDB } from "../../api";
import { useToasts } from "react-toast-notifications";
import { autoGenerateUser } from "../../helpers";
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
    marginTop: theme.spacing(6),
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

  const [agree, setAgree] = useState(false);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("fullname" in fieldValues)
      temp.fullname = fieldValues.fullname ? "" : "Hãy nhập họ tên";
    if ("username" in fieldValues)
      temp.username = fieldValues.username ? "" : "Hãy nhập tên đăng nhập";
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "Hãy nhập mật khẩu";
    if ("address" in fieldValues)
      temp.address = fieldValues.address ? "" : "Hãy nhập địa chỉ";
    if ("phone" in fieldValues)
      temp.phone = fieldValues.phone ? "" : "Hãy nhập số điện thoại";
    // if ("agree" in fieldValues)
    temp.agree = agree === true ? "" : "Bạn chưa đồng ý với điều khoản";
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
      let newIdUser;
      await autoGenerateUser().then((result) => (newIdUser = result));
      const user = {
        id: newIdUser,
        tenDangNhap: values.username,
        matKhau: values.password,
        tenKh: values.fullname,
        diaChi: values.address,
        sdt: values.phone,
        avatar: null,
        isDeleted: 0,
      };
      const signupRes = await postUserToDB(user);
      //alert(JSON.stringify(signupRes));
      if (signupRes !== null) {
        value.logIn(signupRes);
        addToast("Đăng kí tài khoản Master Sales thành công", {
          appearance: "success",
        });
      //   //props.history.push("/");
      } else {
        addToast("Có lỗi xảy ra khi đăng kí tài khoản với tên đăng nhập đã có, cùng thử lại nhé", {
          appearance: "warning",
        });
      }
    }
  };

  return (
    <UserConsumer>
      {(value) => {
        return (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              {/* <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar> */}
              <form
                className={classes.form}
                noValidate
                onSubmit={(e) => handleSubmit(e, value)}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      //margin="normal"
                      required
                      fullWidth
                      id="username"
                      label="Tên đăng nhập"
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
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      //margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Mật khẩu"
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
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      //margin="normal"
                      required
                      fullWidth
                      id="fullname"
                      label="Họ tên"
                      name="fullname"
                      autoComplete="off"
                      autoFocus
                      value={values.fullname}
                      onChange={handleInputChange}
                      {...(errors.fullname && {
                        error: true,
                        helperText: errors.fullname,
                      })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      //margin="normal"
                      required
                      fullWidth
                      id="address"
                      label="Địa chỉ"
                      name="address"
                      autoComplete="off"
                      autoFocus
                      value={values.address}
                      onChange={handleInputChange}
                      {...(errors.address && {
                        error: true,
                        helperText: errors.address,
                      })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      //margin="normal"
                      required
                      fullWidth
                      id="phone"
                      label="Số điện thoại"
                      name="phone"
                      autoComplete="off"
                      autoFocus
                      value={values.phone}
                      onChange={handleInputChange}
                      {...(errors.phone && {
                        error: true,
                        helperText: errors.phone,
                      })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value=""
                          onClick={() => {
                            setAgree(!agree);
                            console.log("option", agree);
                          }}
                          color="primary"
                        />
                      }
                      label="Tôi đồng ý với những điều khoản và dịch vụ"
                    />
                    {errors.agree && (
                      <FormHelperText style={{ color: "red" }}>
                        {errors.agree}
                      </FormHelperText>
                    )}
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
