import React, { useState } from "react";

export default function LoginForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    performLogin(username, password);

    setPassword("");
  };

  async function performLogin(username, password) {
    const response = await fetch("http://localhost:3333/login", {
      method: "post",
      headers: {
        // Required for ExpressJS to parse body
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok && data.uuid) {
      // Authenticated

      const token = data.uuid;

      // Send token to parent App component.
      setToken(token);
    } else {
      // Authentication failed

      setMessage(data.message);

      // Display message to user.
    }
  }

  return (
    <div className="glass-container">
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        {message && <p className="error-message">{message}</p>}
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
}
