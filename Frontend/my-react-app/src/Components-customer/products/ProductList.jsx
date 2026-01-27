import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = "http://localhost:5000/products";

export default function ProductList({ activeCategory }) {
  const [products, setProducts] = useState([]);
  const [seeAll, setSeeAll] = useState({});

  /* ================= FETCH ================= */
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() =>
        console.error("❌ Failed to fetch products")
      );
  }, []);

  /* RESET SEE ALL WHEN CATEGORY CHANGES */
  useEffect(() => {
    setSeeAll({});
  }, [activeCategory]);

  /* ================= GROUP ================= */
  const groupedProducts = products.reduce((acc, product) => {
    const key = product.category?.toLowerCase();
    if (!key) return acc;
    acc[key] = acc[key] || [];
    acc[key].push(product);
    return acc;
  }, {});

 const categoryOrder = ["short", "t-shirt", "jersey"];

  const categoriesToShow =
    !activeCategory || activeCategory === "ALL"
      ? categoryOrder
      : [activeCategory.toLowerCase()];

  return (
    <div style={styles.wrapper}>
      <AnimatePresence mode="wait">
        {categoriesToShow.map((category) => {
          const items = groupedProducts[category] || [];
          if (!items.length) return null;

          const isSeeAll = seeAll[category];
          const visibleItems = isSeeAll ? items : items.slice(0, 5);

          return (
            <motion.section
              key={category}
              style={styles.section}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              {/* HEADER */}
              <div style={styles.header}>
                <h2 style={styles.title}>
                  {category.replace("-", " ").toUpperCase()}
                </h2>

                {items.length > 5 && (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    style={styles.seeAll}
                    onClick={() =>
                      setSeeAll((prev) => ({
                        ...prev,
                        [category]: !isSeeAll,
                      }))
                    }
                  >
                    {isSeeAll ? "Show Less" : "See All"}
                  </motion.button>
                )}
              </div>

              {/* GRID */}
              <motion.div
                layout
                style={styles.grid}
                transition={{ staggerChildren: 0.08 }}
              >
                <AnimatePresence>
                  {visibleItems.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ duration: 0.35 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.section>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  wrapper: {
    padding: "32px 20px",
    maxWidth: "1480px",
    margin: "0 auto",
  },

  section: {
    marginBottom: "64px",
    marginTop: "-45px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },

  title: {
    fontSize: "clamp(18px, 2.2vw, 26px)",
    fontWeight: "800",
    letterSpacing: "0.5px",
  },

  seeAll: {
    background: "none",
    border: "none",
    color: "#6B5FA7",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "14px",
    padding: "6px 10px",
  },

  /* RESPONSIVE GRID */
  grid: {
    display: "grid",
    gridTemplateColumns: `
      repeat(
        auto-fill,
        minmax(240px, 1fr)
      )
    `,
    gap: "36px",
  },
};
