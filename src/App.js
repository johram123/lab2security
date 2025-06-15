import logo from "./logo.svg";
import "./App.css";
import LoginForm from "./LoginForm.jsx";
import React, { useState } from "react";

function App() {
  const [token, setToken] = useState("");

  async function performLogout() {
    const response = await fetch("http://localhost:3333/logout", {
      method: "post",
      headers: {
        // Required for ExpressJS to parse body
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // Logout successful
      setToken("");
    }
  }
  return (
    <main>
      {!token ? (
        <LoginForm setToken={setToken} />
      ) : (
        <div>
          <p>hello</p>
          <button onClick={performLogout}>Logout</button>
        </div>
      )}
    </main>
  );
}

export default App;
