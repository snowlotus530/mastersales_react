import React, { Component } from "react";
import { ProductConsumer } from "../productContext";
import { ButtonContainer } from "./Button";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
export default function Details() {
  // render() {
  const { addToast } = useToasts();

  return (
    <ProductConsumer>
      {(value) => {
        const {
          id,
          company,
          img,
          info,
          price,
          title,
          inCart,
        } = value.detailProduct;

        return (
          <div className="container py-5">
            {/* title */}
            <div className="row">
              <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                <h1>{title}</h1>
              </div>
            </div>
            {/* end of title */}
            <div className="row">
              <div className="col-10 mx-auto col-md-6 my-3">
                <img src={img} className="img-fluid" alt="" />
              </div>
              {/* product info */}
              <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                {/* <h1>{title}</h1> */}
                <h4 className="text-uppercase text-muted mt-3 mb-2">
                  <span className="text-uppercase">{company}</span>
                </h4>
                <h4 className="text-title text-blue">
                  <strong>
                    Giá: {price}
                    <span> VND</span>
                  </strong>
                </h4>
                <p className="text-capitalize font-weight-bold mt-3 mb-0">
                  Thông tin sản phẩm
                </p>
                <p className="text-muted lead">{info}</p>
                {/* buttons */}
                <div>
                  <Link to="/">
                    <ButtonContainer>Trở về</ButtonContainer>
                  </Link>
                  <ButtonContainer
                    cart
                    disabled={inCart ? true : false}
                    onClick={() => {
                      value.addToCart(id);
                      value.openModal(id);
                      addToast(`Thêm vào giỏ hàng ${title} thành công`, {
                        appearance: "success",
                      });
                    }}
                  >
                    {inCart ? "Đã thêm" : "Thêm vào giỏ hàng"}
                  </ButtonContainer>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </ProductConsumer>
  );
  // }
}
