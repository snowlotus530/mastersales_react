import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Default from "./components/Default";
import Cart from "./components/Cart";
import SignIn from "./components/User/Login";
import Modal from "./components/Modal";
import { UserConsumer } from "./userContext";
class App extends Component {
  render() {
    return (
      <UserConsumer>
        {(value) => {
          return (
            <React.Fragment>
              <Navbar />
              <Switch>
                <Route exact path="/" component={ProductList} />
                <Route path="/details" component={Details} />
                <Route path="/cart" component={Cart} />
                <Route path="/login">
                  {value.loggedIn ? <Redirect to="/" /> : <SignIn />}
                </Route>
                <Route component={Default} />
              </Switch>
              <Modal />
            </React.Fragment>
          );
        }}
      </UserConsumer>
    );
  }
}

export default App;
