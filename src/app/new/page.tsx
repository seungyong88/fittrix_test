'use client';

import React, { useState, useEffect } from "react";

export default function LoginForm({ onSubmit }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  useEffect(() => {
    if (username && password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [username, password]);
  

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        border: "1px solid red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <div>
          <label htmlFor="username-input">username</label>
          <input
            type="text"
            id="username-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password-input">password</label>
          <input
            type="password"
            id="password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button 
            id="login-button" 
            type="submit"
            disabled={buttonDisabled}
            onClick={handleSubmit}
          >Login</button>
        </div>
      </form>
    </div>
  );
}
