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
          onClick={() => {
            if ("serviceWorker" in navigator) {
              navigator.serviceWorker.ready
                .then((registration) => {
                  registration.active?.postMessage({
                    type: "SHOW_NOTIFICATION",
                    title: "Admin Alert",
                    body: "You clicked the notification button!",
                  });
                })
                .catch((err) => console.error("Service Worker not ready:", err));
            }
          }}
        >
          Send Notification
        </button>

        {/* Range Selector */}
        {role !== "viewer" && (
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "bold", marginRight: "10px" }}>View Range:</label>
            <select
              value={range}
              onChange={(e) => setRange(e.target.value as "7" | "30")}
              style={{
                padding: "6px 12px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
            </select>
          </div>
        )}

        {/* Line Chart */}
        {role !== "viewer" && (
          <div
            style={{
              padding: "30px",
              backgroundColor: darkMode ? "#1e293b" : "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              marginBottom: "40px",
              height: "300px",
            }}
          >
            <h2 style={{ marginBottom: "1rem" }}>📊 Attendance Overview</h2>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#475569" : "#ccc"} />
                <XAxis dataKey="date" stroke={darkMode ? "#fff" : "#333"} />
                <YAxis stroke={darkMode ? "#fff" : "#333"} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? "#334155" : "#f9fafb",
                    borderColor: "#e5e7eb",
                  }}
                />
                <Line type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Pie Chart */}
        {role !== "viewer" && (
          <div
            style={{
              padding: "30px",
              backgroundColor: darkMode ? "#1e293b" : "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              height: "300px",
            }}
          >
            <h2 style={{ marginBottom: "1rem" }}>🧑‍🎓 Gender Breakdown</h2>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? "#334155" : "#f9fafb",
                    borderColor: "#e5e7eb",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* File Upload (Admin only) */}
        {role === "admin" && (
          <div
            style={{
              padding: "30px",
              backgroundColor: darkMode ? "#1e293b" : "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              marginTop: "40px",
            }}
          >
            <h2 style={{ marginBottom: "1rem" }}>📁 Upload Student Records</h2>
            <FileUpload />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
