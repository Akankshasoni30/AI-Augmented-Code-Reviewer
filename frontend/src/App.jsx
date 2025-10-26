import React, { useState, useRef, useEffect } from "react";
import CodeInput from "./components/CodeInput";
import ReviewDisplay from "./components/ReviewDisplay";
import "./App.css";

const App = () => {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [leftWidth, setLeftWidth] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleSubmit = async () => {
    if (!code.trim()) {
      alert("Please enter your code!");
      return;
    }

    setLoading(true);
    setReview("");

    try {
      const res = await fetch("http://localhost:3000/ai/get-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!res.ok) throw new Error("Failed to fetch AI review.");
      const data = await res.json();
      setReview(data.review || data.response || "No review returned.");
    } catch (err) {
      setReview("Error connecting to backend.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCode("");
    setReview("");
  };

  // ---- Resize logic ----
  const startDragging = (e) => {
    e.preventDefault();
    isDragging.current = true;
    document.body.style.cursor = "col-resize";
  };

  const stopDragging = () => {
    isDragging.current = false;
    document.body.style.cursor = "default";
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newLeftWidth =
      ((e.clientX - containerRect.left) / containerRect.width) * 100;

    if (newLeftWidth > 20 && newLeftWidth < 80) {
      setLeftWidth(newLeftWidth);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDragging);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDragging);
    };
  }, []);

  return (
    <div className={`app-container ${darkMode ? "dark" : "light"}`}>
      <header className="app-header">
        <h1>AI Code Reviewer</h1>

        <div className="header-actions">
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className="slider"></span>
          </label>
          <span className="mode-label">
            {darkMode ? "Dark Mode" : "Light Mode"}
          </span>

          <button className="reset-btn" onClick={handleReset}>
            🔄 Reset
          </button>
        </div>
      </header>

      <div className="content" ref={containerRef}>
        <div
          className="panel left"
          style={{ width: `${leftWidth}%`, minWidth: "20%", maxWidth: "80%" }}
        >
          <CodeInput
            code={code}
            setCode={setCode}
            onSubmit={handleSubmit}
            darkMode={darkMode}
            loading={loading}
          />
        </div>

        <div
          className="divider"
          onMouseDown={startDragging}
          style={{ cursor: "col-resize", userSelect: "none" }}
        >
          <div className="handle"></div>
        </div>

        <div
          className="panel right"
          style={{ width: `${100 - leftWidth}%`, minWidth: "20%" }}
        >
          {loading ? (
            <div className="loading">Analyzing code... ✍️</div>
          ) : (
            <ReviewDisplay review={review} darkMode={darkMode} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;









