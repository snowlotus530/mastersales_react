import React, { useEffect, useRef } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import moment from "moment";
import { useToasts } from "react-toast-notifications";
import { DonutSmallSharp } from "@material-ui/icons";
import ConfirmDialog from "../ConfirmBox";

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
  const childRefDeleteOrder = useRef();
  const { addToast } = useToasts();
  const { deleteOrder } = props.value;
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
        {moment(props.order.ngayDat).format("DD/MM/YYYY, h:mm:ss")}
      </Typography>
      <Typography color="textSecondary" className={classes.orderContext}>
        {moment(props.order.ngayDat).fromNow()}
      </Typography>
      <div className="d-flex justify-content-between">
        <Link
          color="primary"
          href="#"
          onClick={() => {
            props.value.openModal(props.order.id);
          }}
        >
          <span>
            <i className="fas fa-eye"></i>
          </span>{" "}
          Xem chi tiết
        </Link>
        <Link
          color="secondary"
          href="#"
          onClick={() => childRefDeleteOrder.current.handleClickOpen()}
        >
          <span>
            <i className="fa fa-trash" aria-hidden="true"></i>
          </span>{" "}
          Hủy phiếu
        </Link>
      </div>
      <ConfirmDialog
        ref={childRefDeleteOrder}
        action={() => deleteOrder(props.order.id)}
        title={"Hủy phiếu đặt hàng"}
        addToast={() => {
          addToast(`Hủy phiếu thành công`, {
            appearance: "success",
          });
        }}
      />
    </React.Fragment>
  );
}
