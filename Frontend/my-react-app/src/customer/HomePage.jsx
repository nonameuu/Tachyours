import React from "react";
import Navbar from "../components-customer/layout/Navbar";
import Hero from "../components-customer/layout/Hero";
import BestSeller from "../components-customer/layout/BestSeller";
import Footer from "../components-customer/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
        <Hero />
        <BestSeller />
        <Footer />
    </>
  );
}
