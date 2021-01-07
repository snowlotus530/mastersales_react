import React, { Component } from "react";
import PayPalButton from "./PayPalButton";
import { Link } from "react-router-dom";
export default class CartTotals extends Component {
  render() {
    const {
      cartSubTotal,
      cartTax,
      cartTotal,
      cart,
      clearCart,
      orderCart,
    } = this.props.value;
    const { history } = this.props;
    const emptyCart = cart.length === 0 ? true : false;
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
                      clearCart();
                    }}
                  >
                    Xóa toàn bộ
                  </button>
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
  }
}
