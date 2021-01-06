import axios from "axios";

const apiUrl = 'http://localhost:51224/api';

const getProductsFromDB = async (products) => await axios.get(apiUrl + '/mathang').then(response => response.data).then(
    (result)=>{
        products.push(...result.map(item => item));
        //console.log("fetching: ", products);
    },
    (error)=>{
        alert('API for products connection failed, turn on server', error);
        console.log("Product get api error: ",error);
    }
)

export { getProductsFromDB };

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
