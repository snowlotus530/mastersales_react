import React, { Component, useState } from "react";
import Product from "./Product";
import Title from "./Title";
import { storeProducts } from "../data";
import styled from "styled-components";
import { ProductConsumer } from "../productContext";
export default function ProductList() {
  const [filter,setFiler] = useState("");
  return (
    <React.Fragment>
      <Title name="Hot" title="sales" />
      <div className="row">
        {/* {  console.log('product list')} */}
        <ProductConsumer>
          {(value) => {
            console.log("product list inside");
            return value.products.map((product) => {
              return <Product key={product.id} product={product} />;
            });
          }}
        </ProductConsumer>
      </div>
    </React.Fragment>
  )
}

const ProductWrapper = styled.section``;
