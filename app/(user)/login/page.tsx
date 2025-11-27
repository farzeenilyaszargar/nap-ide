"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });

    // Next.js will follow redirect automatically
    if (res.redirected) {
      window.location.href = res.url;
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        /><br /><br />
        <input placeholder="password" type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        /><br /><br />

        <button>Login</button>
      </form>
    </div>
  );
}
