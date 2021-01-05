import React, { Component } from "react";

export default class CartColumns extends Component {
  render() {
    return (
      <div className="container-fluid text-center d-none d-lg-block">
        <div className="row ">
          <div className="col-10 mx-auto col-lg-2">
            <p className="text-uppercase"></p>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <p className="text-uppercase">tên sản phẩm</p>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <p className="text-uppercase">đơn giá</p>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <p className="text-uppercase">số lượng</p>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <p className="text-uppercase">bỏ khỏi giỏ hàng</p>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <p className="text-uppercase">tổng</p>
          </div>
        </div>
      </div>
    );
  }
}
