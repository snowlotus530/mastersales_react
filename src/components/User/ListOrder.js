import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Link, Route } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import { Button } from "@material-ui/core";
// import Chart from './Chart';
import Order from "./Order";
import Orders from "./OrderDetails";
import { UserConsumer } from "../../userContext";
import Title from "./Title";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 200,
  },
}));

export default function ListOrder(props) {
  const classes = useStyles();
  const [filter, setFilter] = useState(true);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const value = props.value;
  let sorted = value.orders
    .map((item) => (item.trangThai == 2 ? { ...item, trangThai: -1 } : item))
    .sort(function (a, b) {
      if (a.trangThai == b.trangThai) {
        return Date.parse(b.ngayDat) - Date.parse(a.ngayDat);
      }
      return a.trangThai - b.trangThai;
    });
  // sorted =
  //   filter === true
  //     ? sorted.filter((item) => item.thanhTien >= 100000000)
  //     : sorted;
  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="center"
        style={{ margin: 10 }}
      >
        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => value.setOrdersOfUser()}
          >
            <span>
              <i className="fas fa-sync">{` Refresh`}</i>
            </span>
          </Button>
        </Grid>
        <Grid item xs={12} sm={3}>
          {/* <Button onClick={() => alert("this is")}>Sửa</Button> */}
        </Grid>
      </Grid>
      {/* Recent Order */}

      {/* <UserConsumer> */}
      {sorted.map((order) => {
        return order.isDeleted === false ? (
          <Grid key={order.id} item xs={12} sm={6} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <Order value={value} order={order} />
            </Paper>
          </Grid>
        ) : null;
      })}

      {/* </UserConsumer> */}

      {/* Recent Orders */}
    </Grid>
  );
}
