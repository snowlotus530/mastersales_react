import React from "react";
import { Link } from "react-router-dom";
import { ButtonContainer } from "../Button";

export default function EmptyCart() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="mx-auto text-center text-title text-capitalize">
          <h3>Mua hàng nào</h3>
          <img src="emptycart.png" alt="empty shopping cart" />
        </div>

        <div className="col-10 mx-auto my-4 text-center text-title text-capitalize">
          <Link to="/">
            <ButtonContainer>Shopping</ButtonContainer>
          </Link>
        </div>
      </div>
    </div>
  );
}
