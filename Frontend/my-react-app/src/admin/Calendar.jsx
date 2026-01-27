import { useState, useEffect, useRef } from "react";
import Sidebar from "../components-admin/Sidebar";
import Navbar from "../components-admin/Navbar";
import Footer from "../components-admin/Footer";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const STORAGE_KEY = "calendarNotes";

export default function Calendar() {
  /* ================= SIDEBAR STATE ================= */
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ================= CALENDAR STATE ================= */
  const [currentDate, setCurrentDate] = useState(new Date());
  const [notes, setNotes] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [noteText, setNoteText] = useState("");

  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  /* ================= LOAD NOTES ================= */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  /* ================= CLOSE MONTH PICKER ================= */
  useEffect(() => {
    const handler = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ================= CALENDAR LOGIC ================= */
  const firstDay = new Date(year, month, 1);
  const startDay = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () =>
    setCurrentDate(new Date(year, month - 1, 1));

  const nextMonth = () =>
    setCurrentDate(new Date(year, month + 1, 1));

  /* ================= NOTES ================= */
  const openModal = (dateKey) => {
    setSelectedDate(dateKey);
    setNoteText(notes[dateKey] || "");
  };

  const closeModal = () => {
    setSelectedDate(null);
    setNoteText("");
  };

  const saveNote = () => {
    if (!noteText.trim()) return;

    const updated = { ...notes, [selectedDate]: noteText };
    setNotes(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    closeModal();
  };

  const deleteNote = () => {
    const updated = { ...notes };
    delete updated[selectedDate];
    setNotes(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    closeModal();
  };

  return (
    <div className="app-layout">
      {/* ================= NAVBAR ================= */}
      <Navbar onToggleSidebar={() => setSidebarOpen(prev => !prev)} />

      <div className="body-layout">

        {/* OVERLAY (mobile) */}
        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ================= SIDEBAR ================= */}
        <aside className={`sidebar-wrapper ${sidebarOpen ? "open" : ""}`}>
          <Sidebar onNavigate={() => setSidebarOpen(false)} />
        </aside>

        {/* ================= CONTENT ================= */}
        <main
          className="content"
          onClick={() => sidebarOpen && setSidebarOpen(false)}
        >
          <div className="main-content calendar-layout">

            {/* ================= CALENDAR ================= */}
            <div className="calendar-box">
              <div className="calendar-header">
                <button className="nav-btn" onClick={prevMonth}>‹</button>

                <div className="month-wrapper" ref={pickerRef}>
                  <div
                    className="month-title"
                    onClick={() => setShowPicker(prev => !prev)}
                  >
                    {MONTHS[month]} {year}
                  </div>

                  {showPicker && (
                    <div className="month-picker">
                      <select
                        value={month}
                        onChange={(e) => {
                          setCurrentDate(new Date(year, +e.target.value, 1));
                          setShowPicker(false);
                        }}
                      >
                        {MONTHS.map((m, i) => (
                          <option key={m} value={i}>{m}</option>
                        ))}
                      </select>

                      <select
                        size="6"
                        value={year}
                        onChange={(e) => {
                          setCurrentDate(new Date(+e.target.value, month, 1));
                          setShowPicker(false);
                        }}
                      >
                        {Array.from({ length: 15 }, (_, i) => year - 7 + i).map(y => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <button className="nav-btn" onClick={nextMonth}>›</button>
              </div>

              <div className="calendar-days">
                {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
                  <div key={d} className="day-name">{d}</div>
                ))}

                {Array.from({ length: startDay }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const dateKey = `${year}-${String(month + 1).padStart(2,"0")}-${String(i + 1).padStart(2,"0")}`;
                  return (
                    <div
                      key={i}
                      className="day-cell clickable"
                      onClick={() => openModal(dateKey)}
                    >
                      {i + 1}
                      {notes[dateKey] && <span className="note-dot" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ================= NOTES ================= */}
            <div className="notes-box">
              <h4>Your Notes</h4>

              {Object.entries(notes).map(([date, text]) => (
                <div
                  key={date}
                  className="note-card"
                  onClick={() => openModal(date)}
                >
                  <div>
                    <p className="note-title">{text}</p>
                    <span className="note-date">{date}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </main>
      </div>

      <Footer />

      {/* ================= MODAL ================= */}
      {selectedDate && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{notes[selectedDate] ? "Edit Note" : "Add Note"}</h3>
            <p>{selectedDate}</p>

            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            />

            <div className="modal-actions">
              {notes[selectedDate] && (
                <button className="btn-cancel" onClick={deleteNote}>
                  Delete
                </button>
              )}
              <button className="btn-cancel" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn-save" onClick={saveNote}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
