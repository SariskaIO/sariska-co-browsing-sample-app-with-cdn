import "./App.css";
import MainTask from "./components/MainTask";
import { useMemo, useRef, useEffect, useState } from "react";
import { PomodoroProvider } from "./context/PomodoroContext";
import SaveButton from "./components/SaveButton";
import PomodoroGrid from "./components/PomodoroGrid";

const App = () => {
  const gridRef = useRef(null);
  const [isCobrowsing, setIsCobrowsing] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [userIdInput, setUserIdInput] = useState("");

  const themes = useMemo(
    () => ({
      pomodoro: {
        foreground: "#ffffff",
        background: "#d95550",
      },
      short_break: {
        foreground: "#ffffff",
        background: "#1565c0",
      },
      long_break: {
        foreground: "#ffffff",
        background: "#ab47bc",
      },
      completed: {
        foreground: "#ffffff",
        background: "#4caf50",
      },
    }),
    []
  );

  const startCoBrowsing = (userId) => {
    if (!userId) return alert("Please enter a user ID");
    window["SARISKA_API_KEY"] =
      "249500aabe9312153f2ac7b13daabd996dd345a79eb328cc3dd2a2";
    window.startCoBrowsing(userId, "cobrowsingsession5");
    setIsCobrowsing(true);
    setShowInput(false);
  };

  const stopCoBrowsing = () => {
    window.stopCoBrowsing();
    setIsCobrowsing(false);
  };

  return (
    <PomodoroProvider>
      {/* Co-browsing controls on top-right */}
      <div style={{ position: "absolute", top: 10, right: 10, zIndex: 999 }}>
        {!isCobrowsing ? (
          <>
            <button
              onClick={() => setShowInput(!showInput)}
              style={{
                padding: "8px 12px",
                backgroundColor: "#1976d2",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Start Cobrowsing
            </button>
            {showInput && (
              <div style={{ marginTop: "8px" }}>
                <input
                  type="text"
                  placeholder="Enter user ID"
                  value={userIdInput}
                  onChange={(e) => setUserIdInput(e.target.value)}
                  style={{
                    padding: "6px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    marginRight: "6px",
                  }}
                />
                <button
                  onClick={() => startCoBrowsing(userIdInput)}
                  style={{
                    padding: "6px 10px",
                    backgroundColor: "#43a047",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Start
                </button>
              </div>
            )}
          </>
        ) : (
          <button
            onClick={stopCoBrowsing}
            style={{
              padding: "8px 12px",
              backgroundColor: "#e53935",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Stop Cobrowsing
          </button>
        )}
      </div>

      {/* Main components */}
      <MainTask themes={themes} />
      <PomodoroGrid gridRef={gridRef} themes={themes} />
      <SaveButton gridRef={gridRef} />
    </PomodoroProvider>
  );
};

export default App;
