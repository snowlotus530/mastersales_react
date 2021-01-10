import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { UserConsumer } from "../../userContext";
import ListItemText from "@material-ui/core/ListItemText";
import { Button } from "@material-ui/core";
import { useToasts } from "react-toast-notifications";
import useForm from "../../useForm";
import { getOneUserFromDB, putUserToDB } from "../../api";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
    justifyContent: "center",
    alignSelf: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(6),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
  },
}));

export default function AddressForm(props) {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const { addToast } = useToasts();
  const valueUser = props.value;

  const initialFieldValues = {
    fullname: valueUser.user.tenKh,
    address: valueUser.user.diaChi,
    phone: valueUser.user.sdt,
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("fullname" in fieldValues)
      temp.fullname = fieldValues.fullname ? "" : "Hãy nhập họ tên";
    if ("address" in fieldValues)
      temp.address = fieldValues.address ? "" : "Hãy nhập địa chỉ";
    if ("phone" in fieldValues)
      temp.phone = fieldValues.phone ? "" : "Hãy nhập số điện thoại";
    // if ("agree" in fieldValues)
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const userId = valueUser.user.id;
      // await getOneUserFromDB(userId, currentUser);
      // alert("user " + JSON.stringify(valueUser.user));
      const user = {
        ...valueUser.user,
        tenKh: values.fullname,
        diaChi: values.address,
        sdt: values.phone,
      };
      // alert("new user " + JSON.stringify(user));
      let res = await putUserToDB(userId, user);
      // alert(JSON.stringify(res));

      if (res !== false) {
        valueUser.logIn(res);
        setIsEdit(false);
        addToast("Sửa tài khoản thành công", {
          appearance: "success",
        });
        //   //props.history.push("/");
      } else {
        addToast(
          "Có lỗi hoặc là đã tồn tại số điện thoại này, cùng thử lại nhé",
          {
            appearance: "warning",
          }
        );
      }
    }
  };

  const total = valueUser.orders
    ?.map((order) =>
      order.trangThai === 1 && order.isDeleted === false ? order.thanhTien : 0
    )
    .reduce((a, b) => a + b, 0);

  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Grid item xs={12} sm={10} md={6} lg={4}>
        {/* <UserConsumer>
          {(valueUser) => {
            
            return ( */}
        <Paper className={classes.paper}>
          {isEdit === false ? (
            <React.Fragment>
              <Typography variant="h6" gutterBottom>
                Thông tin cá nhân
              </Typography>
              <List>
                <ListItem className={classes.listItem}>
                  <ListItemText primary="Tên" />
                  <Typography variant="subtitle1" className={classes.total}>
                    {valueUser.user.tenKh}
                  </Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <ListItemText primary="Địa chỉ" />
                  <Typography variant="subtitle1" className={classes.total}>
                    {valueUser.user.diaChi}
                  </Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <ListItemText primary="SĐT" />
                  <Typography variant="subtitle1" className={classes.total}>
                    {valueUser.user.sdt}
                  </Typography>
                </ListItem>
              </List>
              <Grid
                container
                spacing={2}
                direction="row"
                alignItems="center"
                justify="center"
              >
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    className={classes.title}
                  >
                    Tổng số tiền đã thanh toán
                  </Typography>
                  <Typography style={{ color: "#e12345" }} gutterBottom>
                    {total > 50000000 ? "Khách hàng thân thiết" : ""}
                  </Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                  <Typography
                    variant="h3"
                    gutterBottom
                    className={classes.title}
                  >
                    {Number(total).toLocaleString()}đ
                  </Typography>
                </Grid>
              </Grid>
              <Button onClick={() => setIsEdit(true)}>Sửa</Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography variant="h6" gutterBottom>
                Sửa thông tin cá nhân
              </Typography>
              <Grid container spacing={1}>
                <form
                  className={classes.form}
                  noValidate
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <Grid container spacing={2}>
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
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    // variant="contained"
                    // color="primary"
                    className={classes.submit}
                  >
                    Lưu thông tin
                  </Button>
                  <Grid container justify="flex-end">
                    <Grid item>
                      {/* <Link href="#" variant="body2">
                        Đã có tài khoản? Đăng nhập
                      </Link> */}
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </React.Fragment>
          )}
        </Paper>
        {/* }}
        </UserConsumer> */}
      </Grid>
    </Grid>
  );
}
