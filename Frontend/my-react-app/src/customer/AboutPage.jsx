import React, { useEffect, useRef } from "react";
import Navbar from "../components-customer/layout/Navbar";
import Footer from "../components-customer/layout/Footer";
import { FaFacebookSquare } from "react-icons/fa";

export default function About() {
  const sectionsRef = useRef([]);

  /* 🔥 SCROLL REVEAL ANIMATION */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />

      <main style={styles.page}>
        {/* IMAGE + TEXT SECTIONS */}
        <section style={styles.altSection}>
          {/* IMAGE LEFT / TEXT RIGHT */}
          <div
            ref={(el) => (sectionsRef.current[0] = el)}
            style={styles.altRow}
          >
            <img
              src="/images/about1.jpg"
              alt="Workshop"
              style={styles.altImage}
            />

            <div style={styles.altText}>
              <h2 style={styles.altTitle}>Where It All Began</h2>
              <p style={styles.altParagraph}>
                Our journey started in a small workshop fueled by passion,
                creativity, and the belief that quality clothing begins with
                dedication and skill.
              </p>
            </div>
          </div>

          {/* TEXT LEFT / IMAGE RIGHT */}
          <div
            ref={(el) => (sectionsRef.current[1] = el)}
            style={{ ...styles.altRow, flexDirection: "row-reverse" }}
          >
            <img
              src="/images/about2.jpg"
              alt="Production"
              style={styles.altImage}
            />

            <div style={styles.altText}>
              <h2 style={styles.altTitle}>Built Through Craftsmanship</h2>
              <p style={styles.altParagraph}>
                Every piece goes through careful production — from fabric
                selection to final stitching — ensuring comfort, durability, and
                performance.
              </p>
            </div>
          </div>

          {/* IMAGE LEFT / TEXT RIGHT */}
          <div
            ref={(el) => (sectionsRef.current[2] = el)}
            style={styles.altRow}
          >
            <img
              src="/images/about3.jpg"
              alt="Tailoring"
              style={styles.altImage}
            />

            <div style={styles.altText}>
              <h2 style={styles.altTitle}>Designed to Move With You</h2>
              <p style={styles.altParagraph}>
                Our designs reflect movement, teamwork, and confidence —
                clothing made not just to be worn, but to support every motion
                you make.
              </p>
            </div>
          </div>
        </section>

        {/* STORY */}
        <section style={styles.story}>
          <h1 style={styles.heading}>Crafted with Purpose</h1>

          <p style={styles.text}>
            Founded in <strong>2013</strong>, <strong>Tachyons Clothing</strong>{" "}
            began as a small family venture led by two siblings with a clear
            vision — to create apparel that balances comfort, durability, and
            Filipino craftsmanship.
          </p>

          <p style={styles.text}>
            What started as a humble tailoring shop has grown into a trusted
            custom clothing brand, known for producing high-quality sportswear
            and event apparel designed to perform and last.
          </p>

          <p style={styles.text}>
            Today, we move forward with the same passion that started it all —
            delivering clothing that empowers confidence, supports movement, and
            keeps you comfortable in every moment.
          </p>
        </section>

        {/* GET IN TOUCH */}
        <section style={styles.contactSection}>
          <h2 style={styles.subHeading}>Get in Touch</h2>

          <div style={styles.contactGrid}>
            <a
              href="https://maps.google.com/?q=43 Rosario St. Brgy San Juan, Taytay Rizal"
              target="_blank"
              rel="noreferrer"
              style={styles.contactCard}
            >
              <span style={styles.icon}>📍</span>
              <div>
                <p style={styles.contactTitle}>Visit Us</p>
                <p style={styles.contactText}>
                  43 Rosario St. Brgy San Juan, Taytay, Rizal
                </p>
              </div>
            </a>

            <a href="tel:091232212" style={styles.contactCard}>
              <span style={styles.icon}>📞</span>
              <div>
                <p style={styles.contactTitle}>Call Us</p>
                <p style={styles.contactText}>0912-322-12</p>
              </div>
            </a>

            <a
              href="https://facebook.com/TachyonsClothing"
              target="_blank"
              rel="noreferrer"
              style={styles.contactCard}
            >
              <FaFacebookSquare style={styles.fbIcon} />
              <div>
                <p style={styles.contactTitle}>Facebook</p>
                <p style={styles.contactText}>Tachyons Clothing</p>
              </div>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    width: "100%",
    background: "linear-gradient(180deg,#fafafa,#f5f4fb)",
    fontFamily: "Inter, system-ui, sans-serif",
  },

  /* IMAGE + TEXT */
  altSection: {
    display: "flex",
    flexDirection: "column",
    gap: "90px",
    padding: "90px 24px",
    maxWidth: "1200px",
    margin: "0 auto",
  },

  altRow: {
    display: "flex",
    alignItems: "center",
    gap: "48px",
    flexWrap: "wrap",
    opacity: 0,
    transform: "translateY(40px)",
    transition: "all 0.8s ease",
  },

  altImage: {
    width: "100%",
    maxWidth: "520px",
    height: "340px",
    objectFit: "cover",
    borderRadius: "26px",
    flex: 1,
    boxShadow: `
      0 28px 70px rgba(124, 58, 237, 0.28),
      0 12px 30px rgba(0, 0, 0, 0.12)
    `,
  },

  altText: {
    flex: 1,
    maxWidth: "520px",
  },

  altTitle: {
    fontSize: "28px",
    fontWeight: "800",
    marginBottom: "16px",
  },

  altParagraph: {
    fontSize: "16px",
    lineHeight: "1.8",
    color: "#374151",
  },

  /* STORY */
  story: {
    maxWidth: "880px",
    margin: "80px auto",
    padding: "0 24px",
    textAlign: "center",
    marginBottom: "10px",
    marginTop: "-60px",
  },

  heading: {
    fontSize: "38px",
    fontWeight: "800",
    marginBottom: "28px",
  },

  text: {
    fontSize: "16px",
    lineHeight: "1.9",
    marginBottom: "20px",
    color: "#374151",
  },

  /* CONTACT */
  contactSection: {
    background: "linear-gradient(135deg,#f1effa,#ffffff)",
    padding: "80px 24px",
    marginTop: "-60px",
  },

  subHeading: {
    textAlign: "center",
    fontSize: "30px",
    fontWeight: "700",
    marginBottom: "42px",
  },

  contactGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "28px",
    maxWidth: "960px",
    margin: "0 auto",
  },

  contactCard: {
    background: "#D8CEEB",
    padding: "24px",
    borderRadius: "22px",
    display: "flex",
    gap: "16px",
    textDecoration: "none",
    color: "#111",
    boxShadow: "0 18px 40px rgba(0,0,0,0.1)",
    alignItems: "center",
  },

  icon: {
    fontSize: "30px",
  },

  fbIcon: {
    fontSize: "34px",
    color: "#1877F2",
  },

  contactTitle: {
    fontSize: "15px",
    fontWeight: "700",
    marginBottom: "6px",
  },

  contactText: {
    fontSize: "14px",
    color: "#4b5563",
  },
};
