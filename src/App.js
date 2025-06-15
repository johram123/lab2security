import logo from "./logo.svg";
import "./App.css";
import LoginForm from "./LoginForm.jsx";
import ChuckNorris from "./ChuckNorris.jsx";
import React, { useState } from "react";

function App() {
  const [token, setToken] = useState("");

  async function performLogout() {
    try {
      const response = await fetch("http://localhost:3333/logout", {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setToken("");
      } else {
        alert("Logout failed. Please try again.");
      }
    } catch (error) {
      alert("Network error during logout.");
      console.error(error);
    }
  }

  return (
    <main>
      {!token ? (
        <LoginForm setToken={setToken} />
      ) : (
        <div className="glass-container">
          <ChuckNorris token={token} />
          <button className="logout" onClick={performLogout}>
            Logout
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
