import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import hero1 from "../../assets/hero/hero1.jpg";
import hero2 from "../../assets/hero/hero2.jpg";
import hero3 from "../../assets/hero/hero3.jpg";
import hero4 from "../../assets/hero/hero4.jpg";

const images = [hero1, hero2, hero3, hero4];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [isHover, setIsHover] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % images.length);

  return (
    <div style={styles.hero}>
      {/* SLIDER */}
      <div
        style={{
          ...styles.slider,
          width: `${images.length * 100}%`,
          transform: `translateX(-${(100 / images.length) * current}%)`,
        }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            style={{
              ...styles.slide,
              backgroundImage: `url(${img})`,
            }}
          />
        ))}
      </div>

      {/* TITLE */}
      <h2
        style={{
          ...styles.title,
          fontSize: isMobile ? "30px" : "48px",
        }}
      >
        Redefine Your Comfort in Motion
      </h2>

      {/* SHOP NOW BUTTON */}
      <button
        style={{
          ...styles.button,
          padding: isMobile ? "14px 36px" : "22px 52px",
          fontSize: isMobile ? "18px" : "22px",
          transform: isActive
            ? "translateX(-50%) scale(0.95)"
            : isHover
            ? "translateX(-50%) scale(1.07)"
            : "translateX(-50%) scale(1)",
          boxShadow: isHover
            ? "0 14px 30px rgba(0,0,0,0.45)"
            : "0 6px 14px rgba(0,0,0,0.35)",
          backgroundColor: isHover ? "#b9a8dc" : "#D8CEEB",
          color: "#fff", // 🔥 white text
        }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => {
          setIsHover(false);
          setIsActive(false);
        }}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
      >
        Shop Now
      </button>

      {/* ARROWS */}
      <FaArrowLeft
        style={{ ...styles.leftArrow, fontSize: isMobile ? "22px" : "30px" }}
        onClick={prevSlide}
      />
      <FaArrowRight
        style={{ ...styles.rightArrow, fontSize: isMobile ? "22px" : "30px" }}
        onClick={nextSlide}
      />

      {/* DOTS */}
      <div style={styles.dotsContainer}>
        {images.map((_, index) => (
          <div
            key={index}
            style={{
              ...styles.dot,
              width: isMobile ? "10px" : "14px",
              height: isMobile ? "10px" : "14px",
              backgroundColor: current === index ? "#fff" : "transparent",
              borderColor: "#fff",
            }}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  hero: {
    width: "100%",
    height: "550px",
    position: "relative",
    overflow: "hidden",
  },

  slider: {
    display: "flex",
    height: "100%",
    transition: "transform 0.8s ease-in-out",
  },

  slide: {
    flex: "100%",
    backgroundSize: "cover", // 🔥 WIDE IMAGE
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },

  title: {
    position: "absolute",
    top: "70px", // 🔥 moved down
    width: "100%",
    textAlign: "center",
    fontWeight: "700",
    fontFamily: "'Playfair Display', serif", // 🔥 different font
    color: "#fff",
    letterSpacing: "1px",
    textShadow: "0 4px 10px rgba(0,0,0,0.75)",
  },

  button: {
    position: "absolute",
    bottom: "70px",
    left: "50%",
    transform: "translateX(-50%)",
    border: "none",
    borderRadius: "32px",
    cursor: "pointer",
    fontWeight: "700",
    letterSpacing: "0.6px",
    transition: "all 0.25s ease",
  },

  leftArrow: {
    position: "absolute",
    top: "50%",
    left: "20px",
    color: "#fff",
    cursor: "pointer",
    transform: "translateY(-50%)",
    userSelect: "none",
  },

  rightArrow: {
    position: "absolute",
    top: "50%",
    right: "20px",
    color: "#fff",
    cursor: "pointer",
    transform: "translateY(-50%)",
    userSelect: "none",
  },

  dotsContainer: {
    position: "absolute",
    bottom: "20px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: "12px",
  },

  dot: {
    borderRadius: "50%",
    border: "2px solid #fff",
    cursor: "pointer",
    transition: "0.3s",
  },
};
