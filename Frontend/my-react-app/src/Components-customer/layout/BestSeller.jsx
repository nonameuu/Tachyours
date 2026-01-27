import React, { useState, useEffect } from "react";
import ProductCard from "../products/ProductCard";

export default function BestSeller() {
  const [products, setProducts] = useState([]);

  // FETCH PRODUCTS FROM MOCK API
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Best Seller</h2>

      <div style={styles.container}>
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: "10px 20px",
    backgroundColor: "#fff",
    textAlign: "center",
  },

  heading: {
    fontSize: "clamp(34px, 5vw, 48px)", // 🔥 BIG & RESPONSIVE
    fontWeight: "700",
    marginBottom: "40px",
    fontFamily: "'Playfair Display', serif", // 🔥 premium font
    letterSpacing: "1px",
  },

  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "30px",
  },
};
