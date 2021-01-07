import React, { Component, useState } from "react";
import PayPalButton from "./PayPalButton";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import ConfirmDialog from '../ConfirmBox'

export default function CartTotals (props){
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
    const { addToast } = useToasts();
    const [dialogOpen,setDialogOpen] = useState(false);
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
                      setDialogOpen(true);
                      clearCart();
                      addToast(`Xóa toàn bộ giỏ thành công`, { appearance: "success" });
                    }}
                  >
                    Xóa toàn bộ
                  </button>
                  <ConfirmDialog open={dialogOpen} />
                </Link>
                <h5>
                  <span className=""> Tạm tính :</span>{" "}
                  <strong> {Number(cartSubTotal).toLocaleString()}đ </strong>
                </h5>
                <h5 className="">
                  <span className=""> Phí vận chuyển :</span>{" "}
                  <strong> {Number(cartTax).toLocaleString()}đ </strong>
                </h5>
                <h5>
                  <span className=""> Tổng cộng :</span>{" "}
                  <strong> {Number(cartTotal).toLocaleString()}đ </strong>
                </h5>
                <br />
                <Link to="/cart">
                  <button
                    className="btn btn-outline-primary text-uppercase mb-3 px-5"
                    type="button"
                    onClick={() => {
                      // dat hang o day
                      orderCart();
                      addToast(`Đặt hàng thành công`, { appearance: "success" });
                    }}
                  >
                    Đặt hàng
                  </button>
                </Link>
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
  // }
}
