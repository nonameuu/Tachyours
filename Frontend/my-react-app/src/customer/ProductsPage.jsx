import React, { useState } from "react";
import Navbar from "../components-customer/layout/Navbar";
import Footer from "../components-customer/layout/Footer";
import CategoryTabs from "../components-customer/CategoryTabs";
import ProductList from "../components-customer/products/ProductList";
import CustomizationSection from "../components-customer/CustomizationSection";

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  return (
    <>
      <Navbar />
      
      <CategoryTabs
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <ProductList activeCategory={activeCategory} />

      <CustomizationSection />

      <Footer />
    </>
  );
}
