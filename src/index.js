import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { ProductProvider } from "./productContext";
import { UserProvider } from "./userContext";
import { ToastProvider } from "react-toast-notifications";

ReactDOM.render(
  <ProductProvider>
    <UserProvider>
      <ToastProvider autoDismiss={true}>
        <Router>
          <App />
        </Router>
      </ToastProvider>
    </UserProvider>
  </ProductProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
