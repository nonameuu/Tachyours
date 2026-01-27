import React from "react";

const categories = ["ALL", "SHORT", "T-SHIRT", "JERSEY", "CUSTOMIZE"];

export default function CategoryTabs({ activeCategory, setActiveCategory }) {
  return (
    <div style={styles.wrapper}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          style={{
            ...styles.button,
            ...(activeCategory === cat ? styles.activeButton : {}),
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

const styles = {
  wrapper: {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "12px",
  padding: "20px",
  backgroundColor: "#fff",

  marginTop: "20px", // 🔥 moves it down
},


  button: {
    padding: "10px 20px",
    borderRadius: "25px",
    border: "1px solid #D8CEEB",
    backgroundColor: "white",
    color: "black",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textTransform: "uppercase",
  },

  activeButton: {
    backgroundColor: "#D8CEEB",
    borderColor: "#D8CEEB",
  },
};
