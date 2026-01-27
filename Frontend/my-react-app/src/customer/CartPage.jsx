import React from "react";
import Navbar from "../components-customer/layout/Navbar";
import Footer from "../components-customer/layout/Footer";
import MyCart from "../components-customer/cart/CartItem";

export default function Cart() {
  return (
    <>
      <Navbar />
        <MyCart />
        <Footer />
    </>
  );
}
