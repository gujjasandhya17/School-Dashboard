// src/App.tsx
import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./App.css";
import FileUpload from "./components/FileUpload";

type UserRole = "admin" | "teacher" | "viewer";

const App = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [range, setRange] = useState<"7" | "30">("7");
  const [role, setRole] = useState<UserRole>("admin");

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.height = "100vh";
    document.body.style.width = "100vw";

    // Request notification permission on app load
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        console.log("Notification permission:", permission);
      });
    }
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const lineData = useMemo(() => {
    if (range === "7") {
      return [
        { date: "Mon", attendance: 30 },
        { date: "Tue", attendance: 45 },
        { date: "Wed", attendance: 50 },
        { date: "Thu", attendance: 40 },
        { date: "Fri", attendance: 60 },
        { date: "Sat", attendance: 38 },
        { date: "Sun", attendance: 42 },
      ];
    }

    return Array.from({ length: 30 }, (_, i) => ({
      date: `Day ${i + 1}`,
      attendance: Math.floor(30 + Math.random() * 30),
    }));
  }, [range]);

  const pieData = [
    { name: "Male", value: 60 },
    { name: "Female", value: 40 },
  ];

  const pieColors = ["#3b82f6", "#f59e0b"];

  const sendNotification = () => {
    if ("serviceWorker" in navigator && "Notification" in window) {
      if (Notification.permission === "granted") {
        navigator.serviceWorker.ready
          .then((registration) => {
            registration.showNotification("Admin Alert", {
              body: "You clicked the notification button!",
              icon: "/icon.png",
              badge: "/badge.png",
            });
          })
          .catch((err) => {
            console.error("SW registration failed:", err);
          });
      } else {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            sendNotification();
          }
        });
      }
    } else {
      alert("Notifications not supported in this browser.");
    }
  };

  return (
    <div
      className={`app ${darkMode ? "dark" : ""}`}
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        fontFamily: "sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: "250px",
          backgroundColor: darkMode ? "#1e293b" : "#1e40af",
          color: "#fff",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
            School Admin
          </h2>
          <nav>
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px", padding: 0 }}>
              <li><a href="#" style={{ color: "#fff", textDecoration: "none" }}>Dashboard</a></li>
              <li><a href="#" style={{ color: "#fff", textDecoration: "none" }}>Students</a></li>
              <li><a href="#" style={{ color: "#fff", textDecoration: "none" }}>Teachers</a></li>
              <li><a href="#" style={{ color: "#fff", textDecoration: "none" }}>Settings</a></li>
            </ul>
          </nav>
        </div>

        <button
          onClick={toggleTheme}
          style={{
            padding: "10px",
            backgroundColor: "#fff",
            color: darkMode ? "#1e293b" : "#1e40af",
            borderRadius: "5px",
            fontWeight: "bold",
            marginTop: "auto",
          }}
        >
          Toggle Dark Mode
        </button>
      </aside>

      {/* Main */}
      <main
        style={{
          flex: 1,
          backgroundColor: darkMode ? "#0f172a" : "#f1f5f9",
          color: darkMode ? "#fff" : "#000",
          padding: "40px",
          overflowY: "auto",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Dashboard</h1>
        <p style={{ marginBottom: "20px" }}>Welcome to the School Admin Dashboard!</p>

        {/* Role Selector */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "bold", marginRight: "10px" }}>Current Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            style={{
              padding: "6px 12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        {/* Notification Button */}
        <button
          style={{
            backgroundColor: "#10b981",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            marginBottom: "30px",
          }}
          onClick={sendNotification}
        >
          Send Notification
        </button>

        {/* (The rest of your dashboard UI continues as-is...) */}
        
        {/* Range Selector, Charts, File Upload remain unchanged */}
      </main>
    </div>
  );
};

export default App;
