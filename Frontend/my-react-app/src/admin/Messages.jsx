import { useState } from "react";
import Sidebar from "../components-admin/Sidebar";
import Navbar from "../components-admin/Navbar";
import Footer from "../components-admin/Footer";
import { MdSend, MdImage, MdArrowBack } from "react-icons/md";

export default function Messages() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [activeChat, setActiveChat] = useState({
    name: "Maria Santos",
    order: "Order #248 | Dri-fit Jersey",
    status: "Processing",
  });

  const isLocked =
    activeChat?.status === "Delivered" || activeChat?.status === "Archived";

  return (
    <div className="app-layout">
      <Navbar onToggleSidebar={() => setSidebarOpen(true)} />

      <div className="body-layout">
        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside className={`sidebar-wrapper ${sidebarOpen ? "open" : ""}`}>
          <Sidebar />
        </aside>

        <main className="content">
          <div className="main-content messages-layout">

            {/* CHAT LIST */}
            <div className={`chat-list ${activeChat ? "hide-mobile" : ""}`}>
              <div className="search-box">
                <input type="text" placeholder="Search customer or order..." />
              </div>

              <ChatItem
                name="Maria Santos"
                message="Hi, I'd like to confirm my size and color."
                unread
                active={activeChat?.name === "Maria Santos"}
                onClick={() =>
                  setActiveChat({
                    name: "Maria Santos",
                    order: "Order #248 | Dri-fit Jersey",
                    status: "Processing",
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
                    status: "Delivered",
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
                    status: "Archived",
                  })
                }
              />
            </div>

            {/* CHAT WINDOW */}
            {activeChat && (
              <div className="chat-window show-mobile">
                <div className="chat-header">
                  <button
                    className="back-btn"
                    onClick={() => setActiveChat(null)}
                  >
                    <MdArrowBack />
                  </button>

                  <div className="chat-header-info">
                    <h4>{activeChat.name}</h4>
                    <small>{activeChat.order}</small>
                  </div>

                  <span
                    className={`status-badge ${activeChat.status.toLowerCase()}`}
                  >
                    {activeChat.status}
                  </span>
                </div>

                <div className="chat-messages">
                  <Message sender="customer" text="Hi, I'd like to confirm my size and color." time="9:20 AM" />
                  <Message sender="admin" text="Sure, I can help you with that. What size are you looking for?" time="9:22 AM" />
                  <Message sender="customer" text="Large." time="9:23 AM" />
                  <Message sender="admin" text="Great! I have a large Dri-fit jersey in red." time="9:24 AM" />
                  <Message sender="customer" text="Yes, please!" time="9:25 AM" />
                </div>

                {!isLocked && (
                  <div className="quick-replies">
                    <span className="quick-label">Quick replies</span>
                    <div className="quick-reply-list">
                      <button className="quick-reply">
                        Order is being processed
                      </button>
                      <button className="quick-reply">
                        Please send proof of payment
                      </button>
                      <button className="quick-reply">
                        We’ll get back to you shortly
                      </button>
                    </div>
                  </div>
                )}

                <div className={`chat-input ${isLocked ? "disabled" : ""}`}>
                  <input
                    type="text"
                    placeholder={
                      isLocked
                        ? "This conversation is locked"
                        : "Type your message..."
                    }
                    disabled={isLocked}
                  />
                  <button className="icon-btn" disabled={isLocked}>
                    <MdImage />
                  </button>
                  <button className="send-btn" disabled={isLocked}>
                    <MdSend />
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />

      {/* ================= CSS (INLINE) ================= */}
      <style>{`
        .quick-replies {
          padding: 8px 12px;
          border-top: 1px solid #eee;
          background: #fafafa;
        }

        .quick-label {
          font-size: 12px;
          color: #888;
          margin-bottom: 6px;
          display: block;
        }

        .quick-reply-list {
          display: flex;
          gap: 8px;
          overflow-x: auto;
        }

        .quick-reply {
          background: #f1f0ff;
          color: #4b3fd1;
          border: none;
          border-radius: 999px;
          padding: 6px 14px;
          font-size: 13px;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s ease;
        }

        .quick-reply:hover {
          background: #e3e1ff;
        }

        .status-badge {
          font-size: 12px;
          padding: 4px 10px;
          border-radius: 999px;
          background: #eee;
          color: #555;
        }

        .status-badge.processing {
          background: #fff4e5;
          color: #c77d00;
        }

        .status-badge.delivered {
          background: #e6f6ec;
          color: #1e7f43;
        }

        .status-badge.archived {
          background: #f2f2f2;
          color: #777;
        }
      `}</style>
    </div>
  );
}

/* SUB COMPONENTS */

function ChatItem({ name, message, onClick, active, unread }) {
  return (
    <div className={`chat-item ${active ? "active" : ""}`} onClick={onClick}>
      <div className="avatar">👤</div>
      <div className="chat-preview">
        <strong>{name}</strong>
        <p>{message}</p>
      </div>
      {unread && <span className="unread-dot" />}
    </div>
  );
}

function Message({ sender, text, time }) {
  return (
    <div className={`message ${sender === "admin" ? "right" : "left"}`}>
      <div className="bubble">
        <p>{text}</p>
        <span>{time}</span>
      </div>
    </div>
  );
}
