import React, { Component } from "react";
import { detailProduct } from "./data";
import axios from "axios";
import { getOrdersOfUserFromDB } from "./api";
const UserContext = React.createContext();

let ordersInUser = [];

const getOrdersOfUsers = async (userId) => {
  await getOrdersOfUserFromDB(userId, ordersInUser);
  ordersInUser.forEach((order) => {
    order = { ...order };
  });
  console.log("after get", ordersInUser);
};

class UserProvider extends Component {
  state = {
    user: null,
    loggedIn: false,
    orders: [],
  };
  async componentDidMount() {
    if (JSON.parse(window.localStorage.getItem("user")) === null) {
      window.localStorage.setItem("user", JSON.stringify({}));
    }
    if (JSON.parse(window.localStorage.getItem("loggedIn")) === null) {
      window.localStorage.setItem("loggedIn", false);
    }
    if (JSON.parse(window.localStorage.getItem("orders")) === null) {
      window.localStorage.setItem("orders", JSON.stringify([]));
    }
    this.setState({ user: JSON.parse(window.localStorage.getItem("user")) });
    this.setState({
      loggedIn: JSON.parse(window.localStorage.getItem("loggedIn")),
    });
    this.state.orders = JSON.parse(window.localStorage.getItem("orders"));

    try {
      // await getProducts();
      // console.log("abc first");
      // this.setProducts();
      // console.log("abc then");
    } catch (error) {
      alert("error fetching user data");
    }
  }

  logIn = async (user) => {
    window.localStorage.setItem("loggedIn", true);
    window.localStorage.setItem("user", JSON.stringify(user));

    await getOrdersOfUsers(user.id);
    console.log(user.id);
    this.setOrdersOfUser();

    this.setState(() => {
      return {
        user: JSON.parse(window.localStorage.getItem("user")),
        loggedIn: JSON.parse(window.localStorage.getItem("loggedIn")),
      };
    });
  };

  logOut = () => {
    window.localStorage.setItem("loggedIn", false);
    window.localStorage.setItem("user", JSON.stringify({}));
    window.localStorage.setItem("orders", JSON.stringify([]));
    this.setState(() => {
      return {
        user: JSON.parse(window.localStorage.getItem("user")),
        loggedIn: JSON.parse(window.localStorage.getItem("loggedIn")),
        order: JSON.parse(window.localStorage.getItem("order")),
      };
    });
  };

  setOrdersOfUser = async () => {
    let ordersToShow = [];
    //await getProductsFromDB(productsFromDB);
    ordersToShow.push(...ordersInUser.map((item) => item));
    // if (JSON.parse(window.localStorage.getItem("orders")).length === 0) {
      console.log("local set orders");
      window.localStorage.setItem("orders", JSON.stringify(ordersToShow));
    // }
    this.setState(() => {
      return { orders: JSON.parse(window.localStorage.getItem("orders")) };
    });
    console.log("orders ", this.state.orders);
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          logIn: this.logIn,
          setOrdersOfUser: this.setOrdersOfUser,
          logOut: this.logOut,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };
