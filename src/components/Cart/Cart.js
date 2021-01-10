import React, { Component } from "react";
import Title from "../Title";
import CartColumns from "./CartColumns";
import CartList from "./CartList";
import CartTotals from "./CartTotals";
import { ProductConsumer } from "../../productContext";
import EmptyCart from "./EmptyCart";
import { UserConsumer } from "../../userContext";
export default class Store extends Component {
  render() {
    return (
      <section>
        <ProductConsumer>
          {(valueProduct) => {
            return (
              <UserConsumer>
                {(value) => {
                  const { cart } = valueProduct;
                  if (cart.length > 0) {
                    return (
                      <React.Fragment>
                        <div className="py-5">
                          <Title name="Let's" title="shopping" />
                          <br />
                          <CartColumns />
                          <CartList value={valueProduct} />
                          <CartTotals
                            valueProduct={valueProduct}
                            valueUser={value}
                            history={this.props.history}
                          />
                        </div>
                      </React.Fragment>
                    );
                  } else {
                    return <EmptyCart />;
                  }
                }}
              </UserConsumer>
            );
          }}
        </ProductConsumer>
      </section>
    );
  }
}
