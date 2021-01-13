import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ScrollTop from "react-scroll-to-top";
import ProductList from "./ProductList";

import { useToasts } from "react-toast-notifications";
import { Typography } from "@material-ui/core";
import CarouselList from "./Carousel";
import FooterArea from "./FooterArea";
export default function Homepage(props) {
  return (
    <React.Fragment>
      <Main className="py-3">
        <div className="container">
          <ScrollTop color="blue" smooth={true} />
          <CarouselList />
          <ProductList />
        </div>
      </Main>
      <FooterArea />
    </React.Fragment>
  );
  // }
}

const Main = styled.section``;
