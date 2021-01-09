import React, { Component } from "react";
import styled from "styled-components";
import { UserConsumer } from "../../userContext";
import { ButtonContainer } from "../Button";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../../productContext";
import { Button } from "bootstrap";
import Orders from "./OrderDetails";
export default class OrderModal extends Component {
  render() {
    return (
      <ProductConsumer>
        {(valueProduct) => {
          return (
            <UserConsumer>
              {(value) => {
                const { modalOpen, closeModal } = value;
                const { ctPhieudathangs, thanhTien } = value.modalOrder;
                const detailsToShow = ctPhieudathangs?.map((item) => {
                  
                  const findProduct = valueProduct.products?.find(product => product.id === item.maMh);
                  return {...item, tenMh: findProduct.title}
                })
                if (!modalOpen) {
                  return null;
                } else {
                  return (
                    <ModalContainer>
                      <div className="container">
                        <div className="row">
                          <div
                            className="col-8 mx-auto col-md-8 col-lg-8 p-5 text-center text-capitalize"
                            id="modal"
                          >
                            <Orders
                              details={detailsToShow}
                              total={thanhTien}
                            />
                            {/* <h5>Sản phẩm thêm vào giỏ hàng</h5>
                      <img src={img} className="img-fluid" alt="" />
                      <h5>{title}</h5>
                      <h5 className="text-muted">
                        Giá : {Number(price).toLocaleString()}đ
                      </h5>
                      <Link to="/">
                        <ButtonContainer
                          onClick={() => {
                            closeModal();
                          }}
                        >
                          Tiếp tục Shopping
                        </ButtonContainer>
                      </Link>
                      <Link to="/cart">
                        <ButtonContainer
                          cart
                          onClick={() => {
                            closeModal();
                          }}
                        >
                          Đến giỏ hàng
                        </ButtonContainer>
                      </Link> */}
                            <ButtonContainer
                              close
                              onClick={() => {
                                closeModal();
                              }}
                            >
                              Đóng
                            </ButtonContainer>
                          </div>
                        </div>
                      </div>
                    </ModalContainer>
                  );
                }
              }}
            </UserConsumer>
          );
        }}
      </ProductConsumer>
    );
  }
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  #modal {
    background: var(--mainWhite);
  }
`;
