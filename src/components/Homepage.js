import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ProductList from "./ProductList";

import { useToasts } from "react-toast-notifications";
import { Typography } from "@material-ui/core";
import CarouselList from "./Carousel";
export default function Homepage(props) {
  return (
    <React.Fragment>
      <Main className="py-3">
        <div className="container">
          <CarouselList />
          <ProductList />
        </div>
      </Main>
    </React.Fragment>
  );
  // }
}

const Main = styled.section``;
