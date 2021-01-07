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
  await axios.post(apiUrl + "/khachhang/login", user).then((result) => {
    //alert(JSON.stringify(result.data));
    return result.data;
  }, (error) => {
      //alert('no find user');
      return null;
  });

export {
  getProductsFromDB,
  getOrdersFromDB,
  getOrderDetailsFromDB,
  postOrderToDB,
  postOrderDetailToDB,
  getUsersFromDB,
  loginDB
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
