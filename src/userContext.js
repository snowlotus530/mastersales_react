import React, { Component } from "react";
import { detailProduct } from "./data";
import axios from "axios";
import { autoGenerateContact } from "./helpers";
import {
  getOrdersOfUserFromDB,
  putOrderToDB,
  getContactsOfUserFromDB,
  putContactToDB,
  postContactToDB,
} from "./api";
const UserContext = React.createContext();

let ordersInUser = [];
let contactsInUser = [];

const getOrdersOfUser = async (userId) => {
  await getOrdersOfUserFromDB(userId, ordersInUser);
  ordersInUser.forEach((order) => {
    order = { ...order };
  });
  console.log("after get", ordersInUser);
};

const getContactsOfUser = async (userId) => {
  await getContactsOfUserFromDB(userId, contactsInUser);
  contactsInUser.forEach((contact) => {
    contact = { ...contact };
  });
  console.log("after get", contactsInUser);
};

class UserProvider extends Component {
  state = {
    user: null,
    loggedIn: false,
    modalOpen: false,
    modalOrder: {},
    orders: [],
    contacts: [],
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
    if (JSON.parse(window.localStorage.getItem("contacts")) === null) {
      window.localStorage.setItem("contacts", JSON.stringify([]));
    }
    this.setState({ user: JSON.parse(window.localStorage.getItem("user")) });
    this.setState({
      loggedIn: JSON.parse(window.localStorage.getItem("loggedIn")),
    });
    this.state.orders = JSON.parse(window.localStorage.getItem("orders"));
    this.state.contacts = JSON.parse(window.localStorage.getItem("contacts"));

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

    this.setState(
      () => {
        return {
          user: JSON.parse(window.localStorage.getItem("user")),
          loggedIn: JSON.parse(window.localStorage.getItem("loggedIn")),
        };
      },
      () => {
        this.setOrdersOfUser();
        this.setContactsOfUser();
      },
    );
  };

  logOut = () => {
    window.localStorage.setItem("loggedIn", false);
    window.localStorage.setItem("user", JSON.stringify({}));
    window.localStorage.setItem("orders", JSON.stringify([]));
    window.localStorage.setItem("contacts", JSON.stringify([]));
    ordersInUser = [];
    contactsInUser = [];
    this.setState(() => {
      return {
        user: JSON.parse(window.localStorage.getItem("user")),
        loggedIn: JSON.parse(window.localStorage.getItem("loggedIn")),
        orders: JSON.parse(window.localStorage.getItem("orders")),
        contacts: JSON.parse(window.localStorage.getItem("contacts")),
      };
    });
  };

  setOrdersOfUser = async () => {
    ordersInUser = [];
    await getOrdersOfUser(this.state.user.id);
    console.log("user 1 ", this.state.user);
    let ordersToShow = [];
    //await getProductsFromDB(productsFromDB);
    ordersToShow.push(...ordersInUser.map((item) => item));
    // if (JSON.parse(window.localStorage.getItem("orders")).length === 0) {
    window.localStorage.setItem("orders", JSON.stringify(ordersToShow));
    console.log(
      "local setorders ",
      JSON.parse(window.localStorage.getItem("orders"))
    );
    // }
    this.setState(() => {
      return { orders: JSON.parse(window.localStorage.getItem("orders")) };
    });
    console.log("orders ", this.state.orders);
  };

  setContactsOfUser = async () => {
    contactsInUser = [];
    await getContactsOfUser(this.state.user.id);
    console.log("user 2 ", this.state.user);
    let contactsToShow = [];
    //await getProductsFromDB(productsFromDB);
    contactsToShow.push(...contactsInUser.map((item) => item));
    // if (JSON.parse(window.localStorage.getItem("orders")).length === 0) {
    window.localStorage.setItem("contacts", JSON.stringify(contactsToShow));
    console.log(
      "local setcontacts ",
      JSON.parse(window.localStorage.getItem("contacts"))
    );
    // }
    this.setState(() => {
      return { contacts: JSON.parse(window.localStorage.getItem("contacts")) };
    });
    console.log("contacts ", this.state.contacts);
  };

  deleteOrder = async (orderId) => {
    let orderDeleted;
    this.state.orders.forEach((order) => {
      if (order.id === orderId) {
        order.isDeleted = true;
        orderDeleted = { ...order };
      }
    });
    await putOrderToDB(orderId, orderDeleted);
    window.localStorage.setItem(
      "orders",
      JSON.stringify([...this.state.orders])
    );
    this.setState(() => {
      return { orders: JSON.parse(window.localStorage.getItem("orders")) };
    });
    console.log("orders after delete: ", this.state.orders);
  };

  deleteContact = async (contactId) => {
    let contactDeleted;
    this.state.contacts.forEach((contact) => {
      if (contact.id === contactId) {
        contact.isDeleted = true;
        contactDeleted = { ...contact };
      }
    });
    await putContactToDB(contactId, contactDeleted);
    window.localStorage.setItem(
      "contacts",
      JSON.stringify([...this.state.contacts])
    );
    this.setState(() => {
      return { contacts: JSON.parse(window.localStorage.getItem("contacts")) };
    });
    console.log("contacts after delete: ", this.state.contacts);
  };

  postContact = async (question) => {
    let newIdContact;
    await autoGenerateContact().then((result) => (newIdContact = result));
    let userId = JSON.parse(window.localStorage.getItem("user")).id;
    const contact = {
      id: newIdContact,
      maKH: userId,
      cauHoi: question,
      traLoi: null,
      isDeleted: false,
      ngayDat: new Date().toLocaleString(),
      ngayTraLoi: null,
      nguoiTraLoi: null,
    };
    console.log("get contact ", contact);
    await postContactToDB(contact);
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
          setContactsOfUser: this.setContactsOfUser,
          deleteContact: this.deleteContact,
          postContact: this.postContact,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };
