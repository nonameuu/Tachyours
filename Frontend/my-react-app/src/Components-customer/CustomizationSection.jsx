
import { useNavigate } from "react-router-dom";
export default function CustomizationSection() {
  
  const navigate = useNavigate();
  const items = [
    {
      id: 1,
      name: "Plain Short",
      image: "/products/plain-short.png",
    },
    {
      id: 2,
      name: "Plain T-Shirt",
      image: "/products/plain-tshirt.png",
    },
    {
      id: 3,
      name: "Plain Jersey",
      image: "/products/plain-jersey.png",
    },
    {
      id: 4,
      name: "Plain Jacket",
      image: "/products/plain-jacket.png",
    },
  ];

  return (
    <div style={styles.section}>
      <h2 style={styles.title}>Customize Your Product</h2>
      <p style={styles.subtitle}>
        Choose a base product and apply your own design
      </p>

      <div style={styles.grid}>
        {items.map((item) => (
          <div key={item.id} style={styles.card}>
            <img src={item.image} alt={item.name} style={styles.image} />

            <h3 style={styles.cardTitle}>{item.name}</h3>
            <p style={styles.description}>
              This product is ready for customization
            </p>

            <button style={styles.button} onClick={() => navigate("/customize")}>
              Click this to put your design
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  section: {
    padding: "60px 20px",
    backgroundColor: "#ffffff", // matches your system color vibe
    marginTop: "-90px",
  },

  title: {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "8px",
  },

  subtitle: {
    textAlign: "center",
    fontSize: "16px",
    color: "#555",
    marginBottom: "40px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "16px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    transition: "transform 0.3s ease",
  },

  image: {
    width: "100%",
    height: "180px",
    objectFit: "contain",
    marginBottom: "12px",
  },

  cardTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "6px",
  },

  description: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "16px",
  },

  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
};
