import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Details from "./components/Details";
import Default from "./components/Default";
import Cart from "./components/Cart";
import SignIn from "./components/User/Login";
import SignUp from "./components/User/Signup";
import Dashboard from "./components/User/Dashboard";
import Orders from "./components/User/OrderDetails";
import ProductModal from "./components/ProductModal";
import OrderModal from "./components/User/OrderModal";
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
                <Route exact path="/" component={Homepage} />
                <Route path="/details" component={Details} />
                <Route path="/cart" component={Cart} />
                <Route path="/login">
                  {value.loggedIn ? <Redirect to="/cart" /> : <SignIn />}
                </Route>
                <Route path="/signup">
                  {value.loggedIn ? <Redirect to="/cart" /> : <SignUp />}
                </Route>
                <Route path="/dashboard">
                  {value.loggedIn ? <Dashboard /> : <Homepage />}
                </Route>
                <Route component={Default} />
              </Switch>
              <ProductModal />
              <OrderModal />
            </React.Fragment>
          );
        }}
      </UserConsumer>
    );
  }
}

export default App;
