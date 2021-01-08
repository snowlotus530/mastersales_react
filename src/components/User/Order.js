import React, { useEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import moment from "moment";
import { DonutSmallSharp } from "@material-ui/icons";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  orderContext: {
    flex: 1,
  },
});

export default function Order(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>
        {props.order.trangThai === 0 ? "Chưa giao hàng" : "Đã thanh toán"}
      </Title>
      <Typography component="p" variant="h4">
        {Number(props.order.thanhTien).toLocaleString()}đ
      </Typography>
      <Typography color="textSecondary" className={classes.orderContext}>
        {/* {props.order.ngayDat.slice(0,10).split('-').join('/')} */}
        {moment(props.order.ngayDat).format("DD/MM/YYYY, h:mm:ss a")}
      </Typography>
      <Typography color="textSecondary" className={classes.orderContext}>
        {moment(props.order.ngayDat).startOf('hour').fromNow()}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Xem chi tiết
        </Link>
      </div>
    </React.Fragment>
  );
}
