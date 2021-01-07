import React, { Component } from "react";
import { detailProduct } from "./data";
import axios from "axios";
import {
  getProductsFromDB,
  getOrdersFromDB,
  postOrderToDB,
  postOrderDetailToDB,
} from "./api";
import { autoGenerateOrder, autoGenerateOrderDetail } from "./helpers";
const ProductContext = React.createContext();

let storeProducts = [];

const getProducts = async () => {
  await getProductsFromDB(storeProducts);
  storeProducts.forEach((product) => {
    product = {
      ...product,
    };
  });
  console.log("after get", storeProducts);
};

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
  };
  async componentDidMount() {
    if (JSON.parse(window.localStorage.getItem("products")) === null) {
      window.localStorage.setItem("products", JSON.stringify([]));
    }
    if (JSON.parse(window.localStorage.getItem("cart")) === null) {
      window.localStorage.setItem("cart", JSON.stringify([]));
    }
    if (JSON.parse(window.localStorage.getItem("detailProduct")) === null) {
      window.localStorage.setItem("detailProduct", JSON.stringify([]));
    }
    if (JSON.parse(window.localStorage.getItem("cartSubTotal")) === null) {
      window.localStorage.setItem("cartSubTotal", JSON.stringify(0));
    }
    if (JSON.parse(window.localStorage.getItem("cartTax")) === null) {
      window.localStorage.setItem("cartTax", JSON.stringify(0));
    }
    if (JSON.parse(window.localStorage.getItem("cartTotal")) === null) {
      window.localStorage.setItem("cartTotal", JSON.stringify(0));
    }
    this.state.products = JSON.parse(window.localStorage.getItem("products"));
    this.state.cart = JSON.parse(window.localStorage.getItem("cart"));
    this.state.detailProduct = JSON.parse(
      window.localStorage.getItem("detailProduct")
    );
    this.state.cartSubTotal = JSON.parse(
      window.localStorage.getItem("cartSubTotal")
    );
    this.state.cartTax = JSON.parse(window.localStorage.getItem("cartTax"));
    this.state.cartTotal = JSON.parse(window.localStorage.getItem("cartTotal"));
    try {
      await getProducts();
      console.log("abc first");
      //console.log("before set ", storeProducts);
      this.setProducts();
      console.log("abc then");
      //console.log("after set ", storeProducts);
    } catch (error) {
      alert("error fetching product data");
    }
  }

  setProducts = async () => {
    let productsToShow = [];
    //await getProductsFromDB(productsFromDB);
    storeProducts.forEach((item, index) => {
      const random = 0 + Math.floor(Math.random() * 25);
      item.moTa =
        "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.";
      const product = item;
      const singleItem = {
        //...item,
        id: product.id,
        title: product.tenMh,
        img: product.hinhAnh,
        price: product.donGia,
        company: product.maNccNavigation.tenNcc,
        inCart: false,
        count: 0,
        total: 0,
        info: product.moTa,
        discount: random,
      };
      productsToShow = [...productsToShow, singleItem];
    });
    if (JSON.parse(window.localStorage.getItem("products")).length === 0) {
      console.log("local set");
      window.localStorage.setItem("products", JSON.stringify(productsToShow));
    }
    this.setState(() => {
      return { products: JSON.parse(window.localStorage.getItem("products")) };
    }, this.checkCartItems);
    console.log("products ", this.state.products);
  };

  getItem = (id) => {
    const product = this.state.products.find((item) => item.id === id);
    return product;
  };
  handleDetail = (id) => {
    const product = this.getItem(id);
    window.localStorage.setItem("detailProduct", JSON.stringify(product));
    this.setState(() => {
      return {
        detailProduct: JSON.parse(window.localStorage.getItem("detailProduct")),
      };
    });
  };
  addToCart = (id) => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    console.log("add product ", product);
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;

    window.localStorage.setItem("products", JSON.stringify([...tempProducts]));
    window.localStorage.setItem(
      "cart",
      JSON.stringify([...this.state.cart, product])
    );
    window.localStorage.setItem(
      "detailProduct",
      JSON.stringify({ ...product })
    );

    this.setState(() => {
      //const currentCart = [...this.state.cart, product];
      //window.localStorage.setItem('cart',JSON.stringify(currentCart));
      return {
        products: JSON.parse(window.localStorage.getItem("products")),
        cart: JSON.parse(window.localStorage.getItem("cart")),
        detailProduct: JSON.parse(window.localStorage.getItem("detailProduct")),
      };
    }, this.addTotals);
    //console.log(this.state.detailProduct)
  };
  openModal = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };
  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };
  increment = (id) => {
    let tempCart = [...this.state.cart];
    console.log("items add", tempCart);
    const selectedProduct = tempCart.find((item) => {
      return item.id === id;
    });
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;
    window.localStorage.setItem("cart", JSON.stringify([...tempCart]));
    this.setState(() => {
      return {
        cart: JSON.parse(window.localStorage.getItem("cart")),
      };
    }, this.addTotals);
  };
  decrement = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find((item) => {
      return item.id === id;
    });
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      window.localStorage.setItem("cart", JSON.stringify([...tempCart]));
      this.setState(() => {
        return { cart: JSON.parse(window.localStorage.getItem("cart")) };
      }, this.addTotals);
    }
  };
  getTotals = () => {
    // const subTotal = this.state.cart
    //   .map(item => item.total)
    //   .reduce((acc, curr) => {
    //     acc = acc + curr;
    //     return acc;
    //   }, 0);
    let subTotal = 0;
    this.state.cart.map((item) => (subTotal += item.total));
    const tempTax = subTotal * 0.05;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    return {
      subTotal,
      tax,
      total,
    };
  };
  addTotals = () => {
    const totals = this.getTotals();
    window.localStorage.setItem(
      "cartSubTotal",
      JSON.stringify(totals.subTotal)
    );
    window.localStorage.setItem("cartTax", JSON.stringify(totals.tax));
    window.localStorage.setItem("cartTotal", JSON.stringify(totals.total));
    this.setState(
      () => {
        return {
          cartSubTotal: JSON.parse(window.localStorage.getItem("cartSubTotal")),
          cartTax: JSON.parse(window.localStorage.getItem("cartTax")),
          cartTotal: JSON.parse(window.localStorage.getItem("cartTotal")),
        };
      },
      () => {
        // console.log(this.state);
      }
    );
  };
  removeItem = (id) => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    tempCart = tempCart.filter((item) => {
      return item.id !== id;
    });

    window.localStorage.setItem("products", JSON.stringify([...tempProducts]));
    window.localStorage.setItem("cart", JSON.stringify([...tempCart]));

    this.setState(() => {
      return {
        cart: JSON.parse(window.localStorage.getItem("cart")),
        products: JSON.parse(window.localStorage.getItem("products")),
      };
    }, this.addTotals);
  };
  resetProducts = () => {
    this.state.products.forEach((product) => {
      product.inCart = false;
      product.count = 0;
      product.total = 0;
    });
    window.localStorage.setItem(
      "products",
      JSON.stringify([...this.state.products])
    );
  };
  clearCart = () => {
    this.resetProducts();
    window.localStorage.setItem("cart", JSON.stringify([]));
    this.setState(
      () => {
        return { cart: JSON.parse(window.localStorage.getItem("cart")) };
      },
      () => {
        this.resetProducts();
        console.log("products reset: ", this.state.products);
        //this.setProducts();
        this.addTotals();
      }
    );
  };

  orderCart = async () => {
    let newIdOrder;
    await autoGenerateOrder().then((result) => (newIdOrder = result));
    const order = {
      id: newIdOrder,
      maKH: "KH" + 1, // get khach hang
      ngayDat: new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      thanhTien: this.state.cartTotal,
      trangThai: 0,
      isDeleted: false,
      // maKhNavigation: null,
      // ctPhieudathangs: [],
      // hoadons: [],
    };
    console.log("get order ", order);
    await postOrderToDB(order);
    let newIdOrderdetail;
    await autoGenerateOrderDetail().then((result) => (newIdOrderdetail = result));
    this.state.cart.forEach(async (product, index) => {
      const orderDetail = {
        id: "CTPDH" + (parseInt(newIdOrderdetail) + index).toString(),
        maPhieuDh: newIdOrder,
        maMh: product.id,
        sldat: product.count,
        donGia: product.price,
        tongTien: product.total,
        isDeleted: false,
        //maMhNavigation: null,
        //maPhieuDhNavigation: null,
      };
      console.log("detail : ", orderDetail);
      await postOrderDetailToDB(orderDetail);
    });
  };
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
          orderCart: this.orderCart,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
