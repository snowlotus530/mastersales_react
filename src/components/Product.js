import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../productContext";

import { useToasts } from "react-toast-notifications";
export default function Product(props) {
  // render() {
  const { id, title, img, price, inCart, discount } = props.product;
  const { addToast } = useToasts();
  return (
    <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
      <div className="card">
        <ProductConsumer>
          {(value) => {
            return (
              <div
                className="img-container p-5"
                onClick={() => value.handleDetail(id)}
              >
                <Link to="/details">
                  <img src={img} alt="" className="card-img-top" />
                </Link>
                <button
                  className="cart-btn"
                  disabled={inCart ? true : false}
                  onClick={() => {
                    console.log("you click");
                    value.addToCart(id);
                    value.openModal(id);
                    addToast(`Thêm vào giỏ hàng ${title} thành công`, {
                      appearance: "success",
                    });
                  }}
                >
                  {inCart ? (
                    <p className="text-capitalize mb-0" disabled>
                      đã thêm
                    </p>
                  ) : (
                    <i className="fas fa-cart-plus" />
                  )}
                </button>
              </div>
            );
          }}
        </ProductConsumer>
        <div className="card-footer d-flex justify-content-between">
          <p className="align-self-center mb-0">{title}</p>
          {/* {discount > 0 && discount < 5 ? (
              <p className="text-yellow bg-dark rounded p-1">NEW</p>
            ) : discount > 20 ? (
              <p className="text-yellow bg-dark rounded p-1">HOT</p>
            ) : null} */}
        </div>
        <div className="card-footer d-flex justify-content-between">
          <h5 className="text-red font-italic mb-0">
            {Number(price.toFixed(0)).toLocaleString()}
            <span className="mr-1">đ</span>
          </h5>
          {discount !== 0 ? (
            <h6 className="text-lightdark font-italic mb-0 text-tiny">
              <del>
                {Number(
                  Math.floor(price / (100 - discount)) * 100
                ).toLocaleString()}
                <span className="mr-1">đ</span>
              </del>
            </h6>
          ) : null}
          {discount > 5 ? (
            <h6 className="text-white bg-danger rounded-circle p-1 mb-0">
              -{discount}
              <span className="mr-1">%</span>
            </h6>
          ) : null}
        </div>
      </div>
    </ProductWrapper>
  );
  // }
}

const ProductWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 1s linear;
  }
  .card-footer {
    background: transparent;
    border-top: transparent;
    transition: all 1s linear;
  }
  &:hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }
    .card-footer {
      background: rgba(247, 247, 247);
    }
  }
  .img-container {
    position: relative;
    overflow: hidden;
  }
  .card-img-top {
    transition: all 1s linear;
  }
  .img-container:hover .card-img-top {
    transform: scale(1.2);
  }
  .cart-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    border: none;
    color: var(--mainWhite);
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%, 100%);
    transition: all 1s ease-in-out;
  }
  .img-container:hover .cart-btn {
    transform: translate(0, 0);
  }
  .cart-btn:hover {
    color: var(--mainBlue);
    cursor: pointer;
  }
`;
