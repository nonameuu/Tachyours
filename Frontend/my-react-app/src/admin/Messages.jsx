import { useState } from "react";
import Sidebar from "../components-admin/Sidebar";
import Navbar from "../components-admin/Navbar";
import Footer from "../components-admin/Footer";
import { MdSend, MdImage, MdArrowBack } from "react-icons/md";

export default function Messages() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ⭐ auto-open first chat on desktop
  const [activeChat, setActiveChat] = useState({
    name: "Maria Santos",
    order: "Order #248 | Dri-fit Jersey",
  });

  return (
    <div className="app-layout">
      {/* NAVBAR */}
      <Navbar onToggleSidebar={() => setSidebarOpen(true)} />

      <div className="body-layout">
        {/* OVERLAY (mobile) */}
        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <aside className={`sidebar-wrapper ${sidebarOpen ? "open" : ""}`}>
          <Sidebar />
        </aside>

        {/* MAIN CONTENT */}
        <main className="content">
          <div className="main-content messages-layout">

            {/* ================= CHAT LIST ================= */}
            <div
              className={`chat-list ${
                activeChat ? "hide-mobile" : ""
              }`}
            >
              <div className="search-box">
                <input type="text" placeholder="Search Customer..." />
              </div>

              <ChatItem
                name="Maria Santos"
                message="Hi, I'd like to confirm my size and color."
                active={activeChat?.name === "Maria Santos"}
                onClick={() =>
                  setActiveChat({
                    name: "Maria Santos",
                    order: "Order #248 | Dri-fit Jersey",
                  })
                }
              />

              <ChatItem
                name="John Doe"
                message="Can I pick up my order tomorrow?"
                active={activeChat?.name === "John Doe"}
                onClick={() =>
                  setActiveChat({
                    name: "John Doe",
                    order: "Order #301",
                  })
                }
              />

              <ChatItem
                name="Hazi Cruz"
                message="I'm interested in your mesh shorts."
                active={activeChat?.name === "Hazi Cruz"}
                onClick={() =>
                  setActiveChat({
                    name: "Hazi Cruz",
                    order: "Order #198",
                  })
                }
              />
            </div>

            {/* ================= CHAT WINDOW ================= */}
            {activeChat && (
              <div className="chat-window show-mobile">
                {/* HEADER */}
                <div className="chat-header">
                  <button
                    className="back-btn"
                    onClick={() => setActiveChat(null)}
                  >
                    <MdArrowBack />
                  </button>

                  <div>
                    <h4>{activeChat.name}</h4>
                    <small>{activeChat.order}</small>
                  </div>
                </div>

                {/* MESSAGES */}
                <div className="chat-messages">
                  <Message sender="customer" text="Hi, I'd like to confirm my size and color." time="9:20 AM" />
                  <Message sender="admin" text="Sure, I can help you with that. What size are you looking for?" time="9:22 AM" />
                  <Message sender="customer" text="Large." time="9:23 AM" />
                  <Message sender="admin" text="Great! I have a large Dri-fit jersey in red, would you like to order that?" time="9:24 AM" />
                  <Message sender="customer" text="Yes, please!" time="9:25 AM" />
                </div>

                {/* INPUT */}
                <div className="chat-input">
                  <input type="text" placeholder="Type a message..." />
                  <button className="icon-btn">
                    <MdImage />
                  </button>
                  <button className="send-btn">
                    <MdSend />
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

/* ================= SUB COMPONENTS ================= */

function ChatItem({ name, message, onClick, active }) {
  return (
    <div className={`chat-item ${active ? "active" : ""}`} onClick={onClick}>
      <div className="avatar">👤</div>
      <div>
        <strong>{name}</strong>
        <p>{message}</p>
      </div>
    </div>
  );
}

function Message({ sender, text, time }) {
  return (
    <div className={`message ${sender === "admin" ? "right" : "left"}`}>
      <p>{text}</p>
      <span>{time}</span>
    </div>
  );
}
