import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    margin: theme.spacing(3),
  },
}));

export default function OrderDetails(props) {
  const classes = useStyles();
  const rows = props.details;
  const totalWithoutTax = rows
    ?.map((item) => item.tongTien)
    .reduce(((acc, next) => acc + next),0);
  return (
    <React.Fragment>
      <Title>Tổng tiền đơn hàng: {Number(props.total).toLocaleString()}đ</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Tên sản phẩm</TableCell>
            <TableCell align="center">Giá bán (VND)</TableCell>
            <TableCell align="center">Số lượng</TableCell>
            <TableCell align="center">Tổng (VND)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.tenMh}</TableCell>
                <TableCell align="center">
                  {Number(row.donGia).toLocaleString()}
                </TableCell>
                <TableCell align="center">{row.sldat}</TableCell>
                <TableCell align="center">
                  {Number(row.tongTien).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Typography variant="body1" color="textSecondary" align="center">
          Phí phụ thu: {Number(props.total - totalWithoutTax).toLocaleString()}đ
        </Typography>
      </div>
    </React.Fragment>
  );
}
