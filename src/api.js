import axios from "axios";

const apiUrl = "http://localhost:51224/api";

const getProductsFromDB = async (products) =>
  await axios
    .get(apiUrl + "/mathang")
    .then((response) => response.data)
    .then(
      (result) => {
        products.push(...result.map((item) => item));
        //console.log("fetching: ", products);
      },
      (error) => {
        alert("API for products connection failed, turn on server", error);
        console.log("Product get api error: ", error);
      }
    );

const getOrdersFromDB = async (orders) =>
  await axios
    .get(apiUrl + "/phieudathang")
    .then((response) => response.data)
    .then(
      (result) => {
        orders.push(...result.map((item) => item));
        //console.log("fetching: ", orders);
      },
      (error) => {
        alert("API for orders connection failed, turn on server", error);
        console.log("Order get api error: ", error);
      }
    );

const postOrderToDB = async (order) =>
  await axios.post(apiUrl + "/phieudathang", order).then((result) => {
    //alert(result.data);
  });

const getOrderDetailsFromDB = async (orderDetails) =>
  await axios
    .get(apiUrl + "/ctphieudathang")
    .then((response) => response.data)
    .then(
      (result) => {
        orderDetails.push(...result.map((item) => item));
        //console.log("fetching: ", orderDetails);
      },
      (error) => {
        alert("API for orderDetails connection failed, turn on server", error);
        console.log("OrderDetails get api error: ", error);
      }
    );

const postOrderDetailToDB = async (orderDetail) =>
  await axios.post(apiUrl + "/ctphieudathang", orderDetail).then((result) => {
    //alert(result.data);
  });

const getUsersFromDB = async (user) =>
  await axios
    .get(apiUrl + "/khachhang")
    .then((response) => response.data)
    .then(
      (result) => {
        user.push(...result.map((item) => item));
        //console.log("fetching: ", user);
      },
      (error) => {
        alert("API for users connection failed, turn on server", error);
        console.log("Users get api error: ", error);
      }
    );

const loginDB = async (user) =>
  await axios.post(apiUrl + "/khachhang/login", user).then(
    (result) => {
      //alert(JSON.stringify(result.data));
      return result.data;
    },
    (error) => {
      //alert('no find user');
      return null;
    }
  );

const postUserToDB = async (user) =>
  await axios.post(apiUrl + "/khachhang", user).then(
    (result) => {
      //alert(JSON.stringify(result.data));
      return result.data;
    },
    (error) => {
      //alert('no find user');
      return null;
    }
  );

const getOrdersOfUserFromDB = async (userId, orders) =>
  await axios
    .get(apiUrl + "/phieudathang/user/" + userId)
    .then((response) => response.data)
    .then(
      (result) => {
        orders.push(...result.map((item) => item));
        //console.log("fetching: ", orders);
      },
      (error) => {
        alert("API for orders user connection failed, turn on server", error);
        console.log("Orders user get api error: ", error);
      }
    );

const putOrderToDB = async (orderId, order) => {
  await axios.put(apiUrl + "/phieudathang/" + orderId, order).then(
    (result) => {
      //alert(JSON.stringify(result.data));
    },
    (error) => {
      alert("Put order failed, try again", error);
    }
  );
};

const getOneUserFromDB = async (userId) => {
  await axios.get(apiUrl + "/khachhang/" + userId).then(
    (result) => {
      alert("fetch user" + JSON.stringify(result.data));
      return result.data;
    },
    (error) => {
      alert("Get user failed", error);
    }
  );
};

const putUserToDB = async (userId, user) => {
  return await axios.put(apiUrl + "/khachhang/" + userId, user).then(
    (result) => {
      //alert(JSON.stringify(result.data));
      console.log("fetching data ", user);
      return user;
    },
    (error) => {
      // alert("Put user failed, try again", error);
      return false;
    }
  );
};

const getContactsFromDB = async (contacts) =>
  await axios
    .get(apiUrl + "/tuvankh")
    .then((response) => response.data)
    .then(
      (result) => {
        contacts.push(...result.map((item) => item));
        //console.log("fetching: ", contacts);
      },
      (error) => {
        alert("API for contacts connection failed, turn on server", error);
        console.log("Contact get api error: ", error);
      }
    );

const postContactToDB = async (contact) =>
  await axios.post(apiUrl + "/tuvankh", contact).then(
    (result) => {
      //alert(JSON.stringify(result.data));
      return result.data;
    },
    (error) => {
      //alert('no find user');
      return null;
    }
  );

const putContactToDB = async (contactId, contact) => {
  await axios.put(apiUrl + "/tuvankh/" + contactId, contact).then(
    (result) => {
      //alert(JSON.stringify(result.data));
    },
    (error) => {
      alert("Put contact failed, try again", error);
    }
  );
};

const getContactsOfUserFromDB = async (userId, contacts) =>
  await axios
    .get(apiUrl + "/tuvankh/user/" + userId)
    .then((response) => response.data)
    .then(
      (result) => {
        contacts.push(...result.map((item) => item));
        //console.log("fetching: ", contacts);
      },
      (error) => {
        alert("API for contacts user connection failed, turn on server", error);
        console.log("Contacts user get api error: ", error);
      }
    );

export {
  getProductsFromDB,
  getOrdersFromDB,
  getOrderDetailsFromDB,
  postOrderToDB,
  postOrderDetailToDB,
  getUsersFromDB,
  postUserToDB,
  getOneUserFromDB,
  loginDB,
  getOrdersOfUserFromDB,
  putOrderToDB,
  putUserToDB,
  getContactsFromDB,
  postContactToDB,
  putContactToDB,
  getContactsOfUserFromDB,
};

// fetch("http://localhost:51224/api/mathang")
// .then((res) => res.json())
// .then((result) => {
//   this.setState({
//     employees: result,
//     ...this.state
//   });
//   console.log(result);
// });

// axios.get("http://localhost:51224/api/mathang")
//   .then((response) => response.data)
//   .then(
//     (result) => {
//       this.setState({
//         ...this.state,
//         test: result,
//       });
//     },
//     (error) => {
//       this.setState({ error });
//     }
//   );
