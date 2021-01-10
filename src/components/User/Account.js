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
  paper: {
    padding: theme.spacing(6),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function AddressForm() {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Grid item xs={12} sm={10} md={9} lg={8}>
        <UserConsumer>
          {(value) => {
            const total = value.orders
              ?.map((order) =>
                order.trangThai === 1 && order.isDeleted === false
                  ? order.thanhTien
                  : 0
              )
              .reduce(((a, b) => a + b),0);
            return (
              <Paper className={classes.paper}>
                {isEdit === false ? (
                  <React.Fragment>
                    <Typography variant="h6" gutterBottom>
                      Thông tin cá nhân
                    </Typography>
                    <List disablePadding>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary="Tên" />
                        <Typography
                          variant="subtitle1"
                          className={classes.total}
                        >
                          {value.user.tenKh}
                        </Typography>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary="Địa chỉ" />
                        <Typography
                          variant="subtitle1"
                          className={classes.total}
                        >
                          {value.user.diaChi}
                        </Typography>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary="SĐT" />
                        <Typography
                          variant="subtitle1"
                          className={classes.total}
                        >
                          {value.user.sdt}
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
                        <Typography style={{color:'#e12345'}} gutterBottom>{total > 50000000? 'Khách hàng thân thiết' : ''}</Typography>
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
                      Shipping address
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="firstName"
                          name="firstName"
                          label="First name"
                          fullWidth
                          autoComplete="given-name"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="lastName"
                          name="lastName"
                          label="Last name"
                          fullWidth
                          autoComplete="family-name"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="address1"
                          name="address1"
                          label="Address line 1"
                          fullWidth
                          autoComplete="shipping address-line1"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="address2"
                          name="address2"
                          label="Address line 2"
                          fullWidth
                          autoComplete="shipping address-line2"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="city"
                          name="city"
                          label="City"
                          fullWidth
                          autoComplete="shipping address-level2"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="state"
                          name="state"
                          label="State/Province/Region"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="zip"
                          name="zip"
                          label="Zip / Postal code"
                          fullWidth
                          autoComplete="shipping postal-code"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="country"
                          name="country"
                          label="Country"
                          fullWidth
                          autoComplete="shipping country"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="secondary"
                              name="saveAddress"
                              value="yes"
                            />
                          }
                          label="Use this address for payment details"
                        />
                      </Grid>
                    </Grid>
                    <Button onClick={() => setIsEdit(false)}>Lưu</Button>
                  </React.Fragment>
                )}
              </Paper>
            );
          }}
        </UserConsumer>
      </Grid>
    </Grid>
  );
}
