import React, { Component, useState, useRef } from "react";
import PayPalButton from "./PayPalButton";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import ConfirmDialog from "../ConfirmBox";
import TextField from "@material-ui/core/TextField";
import { UserConsumer } from "../../userContext";
import useForm from "../../useForm";

// const childRef = React.createRef();

export default function CartTotals(props) {
  // render() {
  const {
    cartSubTotal,
    cartTax,
    cartTotal,
    cart,
    clearCart,
    orderCart,
  } = props.valueProduct;
  const valueUser = props.valueUser;
  const { history } = props;
  const emptyCart = cart.length === 0 ? true : false;
  const childRefClear = useRef();
  const childRefOrder = useRef();
  const { addToast } = useToasts();

  const shop = () => {
    // dat hang o day
    const user = JSON.parse(window.localStorage.getItem("user"));
    if (!(Object.keys(user).length === 0 && user.constructor === Object)) {
      childRefOrder.current.handleClickOpen();
    } else {
      history.push("/login");
    }
  };

  const initialFieldValues = {
    address: valueUser.user.diaChi,
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("address" in fieldValues)
      temp.address = fieldValues.address ? "" : "Hãy nhập địa chỉ";
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
      shop();
    }
  };
  // const [dialogOpen, setDialogOpen] = useState(false);
  // const toggleDialog = () => {
  //   setDialogOpen(!dialogOpen);
  // };
  return (
    <React.Fragment>
      {!emptyCart && (
        <div className="container">
          <div className="row">
            <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
              <Link to="/cart">
                <button
                  className="btn btn-outline-danger text-uppercase mb-3 px-5"
                  type="button"
                  onClick={() => {
                    childRefClear.current.handleClickOpen();
                  }}
                >
                  Xóa toàn bộ
                </button>
              </Link>
              <ConfirmDialog
                ref={childRefClear}
                action={clearCart}
                title={"Xóa giỏ hàng"}
                addToast={() => {
                  addToast(`Xóa toàn bộ giỏ thành công`, {
                    appearance: "success",
                  });
                }}
              />
              <h5>
                <span className=""> Tạm tính :</span>{" "}
                <strong> {Number(cartSubTotal).toLocaleString()}đ </strong>
              </h5>
              <h5 className="">
                <span className=""> Phí phụ thu :</span>{" "}
                <strong> {Number(cartTax).toLocaleString()}đ </strong>
              </h5>
              <h5>
                <span className=""> Tổng cộng :</span>{" "}
                <strong> {Number(cartTotal).toLocaleString()}đ </strong>
              </h5>
              <br />
              {/* <Link to="/cart"> */}

              {/* </Link> */}
              <ConfirmDialog
                ref={childRefOrder}
                action={async () => {
                  await orderCart(values.address);
                  valueUser.setOrdersOfUser();
                }}
                title={"Đặt hàng"}
                addToast={() => {
                  addToast(`Đặt hàng thành công`, {
                    appearance: "success",
                  });
                }}
              />
              {/* <PayPalButton
                  totalAmount={cartTotal}
                  clearCart={clearCart}
                  history={history}
                /> */}
            </div>
          </div>
          <form
            // className={classes.form}
            noValidate
            onSubmit={(e) => handleSubmit(e)}
          >
            <button
              className="btn btn-outline-primary text-uppercase mb-3 px-5"
              type="submit"
              // onClick={() => shop()}
            >
              Đặt hàng
            </button>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="address"
              label="Địa chỉ người nhận"
              name="address"
              autoComplete="off"
              autoFocus
              multiline
              value={values.address}
              onChange={handleInputChange}
              {...(errors.address && {
                error: true,
                helperText: errors.address,
              })}
            />
          </form>
        </div>
      )}
    </React.Fragment>
  );
  // }
}
