import React, { Component } from "react";
import { detailProduct } from "./data";
import axios from "axios";
const UserContext = React.createContext();

let storeProducts = [];

// const getProducts = async () => {
//   await getProductsFromDB(storeProducts);
//   storeProducts.forEach((product) => {
//     product = {
//       ...product,
//     };
//   });
//   console.log("after get", storeProducts);
// };

class UserProvider extends Component {
  state = {
    user: null,
    loggedIn: false,
  };
  componentDidMount() {
    if (JSON.parse(window.localStorage.getItem("user")) === null) {
      window.localStorage.setItem("user", JSON.stringify({}));
    }
    if (JSON.parse(window.localStorage.getItem("loggedIn")) === null) {
      window.localStorage.setItem("loggedIn", false);
    }
    this.setState({ user: JSON.parse(window.localStorage.getItem("user")) });
    this.setState({
      loggedIn: JSON.parse(window.localStorage.getItem("loggedIn")),
    });

    try {
      // await getProducts();
      // console.log("abc first");
      // this.setProducts();
      // console.log("abc then");
    } catch (error) {
      alert("error fetching user data");
    }
  }

  logIn = (user) => {
    window.localStorage.setItem("loggedIn", true);
    window.localStorage.setItem("user", JSON.stringify(user));
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
    this.setState(() => {
      return {
        user: JSON.parse(window.localStorage.getItem("user")),
        loggedIn: JSON.parse(window.localStorage.getItem("loggedIn")),
      };
    });
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          logIn: this.logIn,
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
