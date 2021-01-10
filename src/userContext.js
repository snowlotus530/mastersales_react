import React, { Component } from "react";
import { detailProduct } from "./data";
import axios from "axios";
import { getOrdersOfUserFromDB, putOrderToDeleteFromDB } from "./api";
const UserContext = React.createContext();

let ordersInUser = [];

const getOrdersOfUser = async (userId) => {
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
    modalOpen: false,
    modalOrder: {},
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

    // await getOrdersOfUser(user.id);
    // console.log(user.id);
    

    this.setState(() => {
      return {
        user: JSON.parse(window.localStorage.getItem("user")),
        loggedIn: JSON.parse(window.localStorage.getItem("loggedIn")),
      };
    }, this.setOrdersOfUser);
  };

  logOut = () => {
    window.localStorage.setItem("loggedIn", false);
    window.localStorage.setItem("user", JSON.stringify({}));
    window.localStorage.setItem("orders", JSON.stringify([]));
    ordersInUser = [];
    this.setState(() => {
      return {
        user: JSON.parse(window.localStorage.getItem("user")),
        loggedIn: JSON.parse(window.localStorage.getItem("loggedIn")),
        order: JSON.parse(window.localStorage.getItem("order")),
      };
    });
  };

  setOrdersOfUser = async () => {
    ordersInUser = [];
    await getOrdersOfUser(this.state.user.id);
    console.log("user ",this.state.user);
    let ordersToShow = [];
    //await getProductsFromDB(productsFromDB);
    ordersToShow.push(...ordersInUser.map((item) => item));
    // if (JSON.parse(window.localStorage.getItem("orders")).length === 0) {
    window.localStorage.setItem("orders", JSON.stringify(ordersToShow));
    console.log("local setorders ",JSON.parse(window.localStorage.getItem("orders")));
    // }
    this.setState(() => {
      return { orders: JSON.parse(window.localStorage.getItem("orders")) };
    });
    console.log("orders ", this.state.orders);
  };

  deleteOrder = async (orderId) => {
    let orderDeleted;
    this.state.orders.forEach(
      (order) => {
        if(order.id === orderId){
          order.isDeleted = true;
          orderDeleted = {...order};
        }
      }
    );
    await putOrderToDeleteFromDB(orderId, orderDeleted);
    window.localStorage.setItem("orders", JSON.stringify([...this.state.orders]));
    this.setState(() => {
      return { orders: JSON.parse(window.localStorage.getItem("orders")) };
    });
    console.log("orders after delete: ", this.state.orders);
  };

  openModal = (id) => {
    const order = this.getItem(id);
    this.setState(() => {
      return { modalOrder: order, modalOpen: true };
    });
  };
  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };
  getItem = (id) => {
    const order = this.state.orders.find((item) => item.id === id);
    return order;
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          logIn: this.logIn,
          setOrdersOfUser: this.setOrdersOfUser,
          logOut: this.logOut,
          deleteOrder: this.deleteOrder,
          openModal: this.openModal,
          closeModal: this.closeModal,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };
