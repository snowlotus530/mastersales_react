import React, { Component, useState, useRef } from "react";
import PayPalButton from "./PayPalButton";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import ConfirmDialog from "../ConfirmBox";
import { UserConsumer } from "../../userContext";

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
  } = props.value;
  const { history } = props;
  const emptyCart = cart.length === 0 ? true : false;
  const childRefClear = useRef();
  const childRefOrder = useRef();
  const { addToast } = useToasts();
  // const [dialogOpen, setDialogOpen] = useState(false);
  // const toggleDialog = () => {
  //   setDialogOpen(!dialogOpen);
  // };
  return (
    <UserConsumer>
      {(valueUser) => {
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
                      <strong>
                        {" "}
                        {Number(cartSubTotal).toLocaleString()}đ{" "}
                      </strong>
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
                    <button
                      className="btn btn-outline-primary text-uppercase mb-3 px-5"
                      type="button"
                      onClick={() => {
                        // dat hang o day
                        const user = JSON.parse(
                          window.localStorage.getItem("user")
                        );
                        if (
                          !(
                            Object.keys(user).length === 0 &&
                            user.constructor === Object
                          )
                        ) {
                          childRefOrder.current.handleClickOpen();
                        } else {
                          history.push("/login");
                        }
                      }}
                    >
                      Đặt hàng
                    </button>
                    {/* </Link> */}
                    <ConfirmDialog
                      ref={childRefOrder}
                      action={async () => {
                        await orderCart();
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
              </div>
            )}
          </React.Fragment>
        );
      }}
    </UserConsumer>
  );
  // }
}
