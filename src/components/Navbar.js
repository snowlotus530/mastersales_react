import React, { Component, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../logo.png";
import { ButtonContainer } from "./Button";
import { UserConsumer } from "../userContext";
import { useToasts } from "react-toast-notifications";
import ConfirmDialog from "./ConfirmBox";
export default function Navbar() {
  // render() {
  const { addToast } = useToasts();
  const childRefLog = useRef();
  return (
    <UserConsumer>
      {(value) => {
        //console.log("log in ", value.loggedIn);
        const logOut = () => {
          value.logOut();
        };
        return (
          <Nav className="navbar navbar-expand-sm  navbar-dark linear-gradient px-sm-5">
            <Link to="/">
              <img
                height={45}
                src={logo}
                alt="store"
                className="navbar-brand"
              />
            </Link>
            <ul className="navbar-nav align-items-center">
              <li className="nav-item ml-5">
                <Link to="/" className="nav-link">
                  <span>
                    <i className="fas fa-home" />
                  </span>
                  <span> </span>
                  Trang chủ
                </Link>
              </li>
              {value.loggedIn === true ? (
                <li className="nav-item ml-5">
                  <Link to="/dashboard" className="nav-link">
                    <span>
                      <i className="fas fa-user" />
                    </span>
                    <span> </span>
                    Người dùng
                  </Link>
                </li>
              ) : null}
            </ul>
            <Link to="/cart" className="ml-auto">
              <ButtonContainer>
                <span className="mr-2">
                  <i className="fas fa-cart-plus " />
                </span>
                Giỏ hàng
              </ButtonContainer>
            </Link>
            {value.loggedIn !== true ? (
              <Link to="/login" className="ml-auto">
                <ButtonContainer>
                  <span className="mr-2">
                    <i className="fas fa-key" />
                  </span>
                  Đăng nhập
                </ButtonContainer>
              </Link>
            ) : (
              <div className="ml-auto">
                <ButtonContainer
                  onClick={() => childRefLog.current.handleClickOpen()}
                >
                  <span className="mr-2">
                    <i className="fas fa-sign-out-alt" />
                  </span>
                  Đăng xuất
                </ButtonContainer>
                <ConfirmDialog
                  ref={childRefLog}
                  action={() => logOut()}
                  title={"Đăng xuất"}
                  addToast={() => {
                    addToast(`Đăng xuất khỏi Master Sales thành công`, {
                      appearance: "success",
                    });
                  }}
                />
              </div>
            )}
          </Nav>
        );
      }}
    </UserConsumer>
  );
  // }
}

const Nav = styled.nav`
  background: var(--mainBlue);
  .nav-link {
    color: var(--mainWhite) !important;
    font-size:1.3rem;
    text-transform:capitalize;
  }
  @media (max-width: 576px) {
    .navbar-nav {
      flex-direction: row !important;
`;

// const ButtonContainer = styled.button`
// text-transform: capitalize;
// font - size: 1.4rem;
// background: transparent;
// border: 0.05rem solid var(--lightBlue);
// border - radius: 0.5rem;
// padding: 0.2rem 0.5rem;
// outline - color: red;
// cursor: pointer;
// display: inline - block;
// margin: 0.2rem 0.5rem 0.2rem 0;
// transition: all 0.5s ease -in -out;
//   &: hover {
//   background: var(--lightBlue);
//   color: var(--mainBlue);
// }
// `;
