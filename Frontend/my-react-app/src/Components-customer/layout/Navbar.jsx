import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaShoppingCart,
  FaEnvelope,
  FaBell,
  FaBars,
  FaTimes,
  FaSearch,
} from "react-icons/fa";

const NAVBAR_HEIGHT = 112;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [isSticky, setIsSticky] = useState(false);

  const [hasNotification] = useState(true);
  const [hasMessage] = useState(true);
  const [hasCartItem] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const IconWithDot = ({ showDot, onClick, children }) => (
    <div style={styles.iconWrapper} onClick={onClick}>
      {children}
      {showDot && <span style={styles.dot} />}
    </div>
  );

  return (
    <>
      {/* STICKY WRAPPER */}
      <div
        style={{
          ...styles.stickyWrapper,
          ...(isSticky ? styles.sticky : {}),
        }}
      >
        {/* TOP NAV */}
        <div style={styles.topNav}>
          <h1
            style={{
              ...styles.logo,
              ...(isMobile ? {} : styles.logoDesktop),
            }}
          >
            TACHYONS
          </h1>

          {!isMobile && (
            <>
              <div style={styles.searchWrapper}>
                <div style={styles.searchContainer}>
                  <input
                    type="text"
                    placeholder="Search products..."
                    style={styles.searchBar}
                  />
                  <FaSearch style={styles.searchIcon} />
                </div>
              </div>

              <div style={styles.icons}>
                <IconWithDot
                  showDot={hasMessage}
                  onClick={() => navigate("/customer-messages")}
                >
                  <FaEnvelope style={styles.icon} />
                </IconWithDot>

                <IconWithDot
                  showDot={hasNotification}
                  onClick={() => navigate("/customer-notification")}
                >
                  <FaBell style={styles.icon} />
                </IconWithDot>

                <IconWithDot
                  showDot={hasCartItem}
                  onClick={() => navigate("/customer-cart")}
                >
                  <FaShoppingCart style={styles.icon} />
                </IconWithDot>

                <FaUser
                  style={styles.icon}
                  onClick={() => navigate("/customer-profile")}
                />
              </div>
            </>
          )}

          {isMobile && (
            <div
              style={styles.hamburger}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </div>
          )}
        </div>

        {/* DESKTOP MENU */}
        {!isMobile && (
          <div style={styles.bottomNav}>
            <button style={styles.navButton} onClick={() => navigate("/")}>
              HOME
            </button>
            <button
              style={styles.navButton}
              onClick={() => navigate("/customer-products")}
            >
              PRODUCT
            </button>
            <button
              style={styles.navButton}
              onClick={() => navigate("/customer-about")}
            >
              ABOUT US
            </button>
          </div>
        )}
      </div>

      {/* MOBILE SEARCH */}
      {isMobile && (
        <div style={styles.mobileSearchWrapper}>
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search products..."
              style={styles.searchBar}
            />
            <FaSearch style={styles.searchIcon} />
          </div>
        </div>
      )}

      {/* OVERLAY */}
      {isMobile && menuOpen && (
        <div style={styles.overlay} onClick={() => setMenuOpen(false)} />
      )}

      {/* MOBILE SIDEBAR */}
      {isMobile && menuOpen && (
        <div style={styles.sidebar}>
          <div style={styles.sidebarSection}>
            <div
              style={styles.menuItem}
              onClick={() => {
                navigate("/");
                setMenuOpen(false);
              }}
            >
              HOME
            </div>
            <div
              style={styles.menuItem}
              onClick={() => {
                navigate("/customer-products");
                setMenuOpen(false);
              }}
            >
              PRODUCT
            </div>
            <div
              style={styles.menuItem}
              onClick={() => {
                navigate("/customer-about");
                setMenuOpen(false);
              }}
            >
              ABOUT US
            </div>
          </div>

          <div style={styles.iconRow}>
            <IconWithDot
              showDot={hasMessage}
              onClick={() => {
                navigate("/customer-messages");
                setMenuOpen(false);
              }}
            >
              <FaEnvelope style={styles.sidebarIcon} />
            </IconWithDot>

            <IconWithDot
              showDot={hasNotification}
              onClick={() => {
                navigate("/customer-notification");
                setMenuOpen(false);
              }}
            >
              <FaBell style={styles.sidebarIcon} />
            </IconWithDot>

            <IconWithDot
              showDot={hasCartItem}
              onClick={() => {
                navigate("/customer-cart");
                setMenuOpen(false);
              }}
            >
              <FaShoppingCart style={styles.sidebarIcon} />
            </IconWithDot>

            <FaUser
              style={styles.sidebarIcon}
              onClick={() => {
                navigate("/customer-profile");
                setMenuOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  stickyWrapper: {
    backgroundColor: "#D8CEEB",
    zIndex: 1000,
  },

  sticky: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
  },

  topNav: {
    display: "flex",
    alignItems: "center",
    padding: "12px 20px",
  },

  /* LOGO */
  logo: {
    width: "220px",
    fontSize: "clamp(26px, 6vw, 42px)",
    fontWeight: "600",
    letterSpacing: "clamp(2px, 0.8vw, 5px)",
    margin: 0,
    lineHeight: 1,
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    transform: "translateY(2px)", // mobile/tablet optical center
  },

  logoDesktop: {
    transform: "translateY(0px)", // desktop perfect center
  },

  searchWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },

  searchContainer: {
    position: "relative",
    width: "100%",
    maxWidth: "420px",
  },

  searchBar: {
    width: "77%",
    height: "40px",
    borderRadius: "20px",
    border: "1px solid #aaa",
    padding: "0 45px 0 16px",
  },

  searchIcon: {
    position: "absolute",
    right: "50px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#666",
  },

  icons: {
    display: "flex",
    gap: "25px",
  },

  iconWrapper: {
    position: "relative",
    cursor: "pointer",
  },

  icon: {
    fontSize: "20px",
    color: "#444",
  },

  dot: {
    position: "absolute",
    top: "-4px",
    right: "-4px",
    width: "9px",
    height: "9px",
    backgroundColor: "red",
    borderRadius: "50%",
  },

  bottomNav: {
    display: "flex",
    justifyContent: "center",
    gap: "50px",
    padding: "10px 0",
  },

  navButton: {
    background: "none",
    border: "none",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
  },

  hamburger: {
    marginLeft: "auto",
    cursor: "pointer",
  },

  mobileSearchWrapper: {
    padding: "10px 20px",
    display: "flex",
    justifyContent: "center",
  },

  overlay: {
    position: "fixed",
    top: `${NAVBAR_HEIGHT}px`,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 999,
  },

  sidebar: {
    position: "fixed",
    top: `${NAVBAR_HEIGHT}px`,
    right: 0,
    width: "280px",
    height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
    backgroundColor: "#fff",
    padding: "24px",
    zIndex: 1001,
  },

  sidebarSection: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  menuItem: {
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
  },

  iconRow: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "30px",
  },

  sidebarIcon: {
    fontSize: "22px",
    color: "#444",
    cursor: "pointer",
  },
};
