import React from "react";
import { ButtonContainer } from "./Button";

export default function Default(props) {
  console.log(props);

  return (
    <div className="container">
      <div className="row">
        <div className="col-10 mx-auto text-center text-title text-uppercase pt-5">
          <h1 className="display-5">Something is wrong</h1>
          <h3>
            the URL{" "}
            <span className="text-danger">"{props.location.pathname}"</span> was
            not found
          </h3>
          <img src="route-notfound.png" alt="Let go" />
        </div>
      </div>
    </div>
  );
}
