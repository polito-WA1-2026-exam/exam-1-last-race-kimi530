import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { getUserInfo } from "./api/auth";
import Header from "./components/Header";
import InstructionsPage from "./pages/InstructionsPage";
import LoginPage from "./pages/LoginPage";
import SetupPage from "./pages/SetupPage";
import PlanningPage from "./pages/PlanningPage";
import ExecutionPage from "./pages/ExecutionPage";
import ResultPage from "./pages/ResultPage";
import LeaderboardPage from "./pages/LeaderboardPage";

function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [gameData, setGameData] = useState(null); // { startId, endId }
  const [result, setResult] = useState(null); // { score, steps, valid }

  useEffect(() => {
    getUserInfo()
      .then((u) => {
        setUser(u);
        setChecking(false);
      })
      .catch(() => {
        setUser(null);
        setChecking(false);
      });
  }, []);

  if (checking) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Header user={user} onLogout={() => setUser(null)} />
      <Routes>
        <Route path="/" element={<InstructionsPage user={user} />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginPage onLogin={setUser} />}
        />
        <Route
          path="/game/setup"
          element={
            !user ? (
              <Navigate to="/login" />
            ) : (
              <SetupPage setGameData={setGameData} />
            )
          }
        />
        <Route
          path="/game/planning"
          element={
            !user || !gameData ? (
              <Navigate to="/" />
            ) : (
              <PlanningPage gameData={gameData} setResult={setResult} />
            )
          }
        />
        <Route
          path="/game/execution"
          element={
            !user || !result ? (
              <Navigate to="/" />
            ) : (
              <ExecutionPage result={result} />
            )
          }
        />
        <Route
          path="/game/result"
          element={
            !user || !result ? (
              <Navigate to="/" />
            ) : (
              <ResultPage
                result={result}
                setGameData={setGameData}
                setResult={setResult}
              />
            )
          }
        />
        <Route
          path="/leaderboard"
          element={!user ? <Navigate to="/login" /> : <LeaderboardPage />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
