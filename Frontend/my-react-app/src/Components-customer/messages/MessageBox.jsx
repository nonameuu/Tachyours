import React, { useState } from "react";

const STICKERS = ["😀", "🔥", "❤️", "👍", "😂"];

export default function MessageBox() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showStickers, setShowStickers] = useState(false);

  const createMeta = () => {
    const now = new Date();
    return {
      time: now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: now.toLocaleDateString(),
    };
  };

  const sendMessage = (content, type = "text") => {
    const meta = createMeta();

    const newMsg = {
      id: Date.now(),
      type,
      content,
      ...meta,
      status: "sent", // sent → seen
    };

    setMessages((prev) => [...prev, newMsg]);
    setMessage("");
    setShowStickers(false);

    // simulate "seen by admin"
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === newMsg.id ? { ...m, status: "seen" } : m
        )
      );
    }, 2000);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(message);
  };

  const handleSticker = (sticker) => {
    sendMessage(sticker);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type.startsWith("image")) {
      sendMessage(URL.createObjectURL(file), "image");
    } else {
      sendMessage(file.name, "file");
    }
  };

  return (
    <div style={styles.box}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h3 style={styles.title}>Messages</h3>
          <span style={styles.status}>
            <span style={styles.dot} /> TACHYONS ADMIN
          </span>
        </div>
      </div>

      {/* CHAT */}
      <div style={styles.chat}>
        {messages.length === 0 && (
          <p style={styles.empty}>Start a conversation ✨</p>
        )}

        {messages.map((msg) => (
          <div key={msg.id} style={styles.bubble}>
            {msg.type === "text" && <p>{msg.content}</p>}
            {msg.type === "image" && (
              <img src={msg.content} alt="" style={styles.image} />
            )}
            {msg.type === "file" && <p>📎 {msg.content}</p>}

            <div style={styles.meta}>
              <span>{msg.time}</span>
              <span>{msg.status === "sent" ? "✓" : "✓✓"}</span>
            </div>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div style={styles.inputArea}>
        <input
          type="file"
          id="fileUpload"
          style={{ display: "none" }}
          onChange={handleFile}
        />

        <label htmlFor="fileUpload" style={styles.attach}>
          📎
        </label>

        {/* STICKERS */}
        <div style={{ position: "relative" }}>
          <span
            style={styles.stickerBtn}
            onClick={() => setShowStickers(!showStickers)}
          >
            😊
          </span>

          {showStickers && (
            <div style={styles.stickerBox}>
              {STICKERS.map((s) => (
                <span
                  key={s}
                  style={styles.sticker}
                  onClick={() => handleSticker(s)}
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>

        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.input}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button onClick={handleSend} style={styles.send}>
          ➤
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  box: {
    flex: 1,
    background: "rgba(255,255,255,0.95)",
    padding: "22px",
    borderRadius: "18px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    minHeight: "520px",
    fontFamily: "Inter, system-ui, sans-serif",
  },

  header: {
    borderBottom: "1px solid rgba(0,0,0,0.08)",
    paddingBottom: "12px",
    marginBottom: "14px",
  },

  title: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "700",
  },

  status: {
    fontSize: "13px",
    color: "#16a34a",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginTop: "4px",
  },

  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#16a34a",
  },

  chat: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  empty: {
    color: "#9ca3af",
    textAlign: "center",
    marginTop: "40px",
  },

  bubble: {
    background: "#f3f1fb",
    padding: "12px 14px",
    borderRadius: "16px",
    maxWidth: "70%",
    boxShadow: "0 6px 14px rgba(0,0,0,0.05)",
  },

  meta: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "11px",
    color: "#6b7280",
    marginTop: "4px",
  },

  image: {
    width: "180px",
    borderRadius: "12px",
  },

  inputArea: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "14px",
    borderTop: "1px solid rgba(0,0,0,0.08)",
    paddingTop: "12px",
  },

  attach: {
    fontSize: "20px",
    cursor: "pointer",
  },

  stickerBtn: {
    fontSize: "20px",
    cursor: "pointer",
  },

  stickerBox: {
    position: "absolute",
    bottom: "40px",
    background: "#fff",
    padding: "8px",
    borderRadius: "12px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
    display: "flex",
    gap: "8px",
  },

  sticker: {
    fontSize: "22px",
    cursor: "pointer",
  },

  input: {
    flex: 1,
    padding: "12px 16px",
    borderRadius: "999px",
    border: "1px solid #ddd",
    outline: "none",
  },

  send: {
    border: "none",
    background: "linear-gradient(135deg,#6b5fa7,#9f8fe3)",
    color: "#fff",
    borderRadius: "50%",
    width: "42px",
    height: "42px",
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(107,95,167,0.4)",
  },
};
