"use client";
import { useEffect } from "react";

export default function ElectronAuthSuccess() {

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (window.opener) {
      window.opener.postMessage(
        { channel: "auth-success", token },
        "*"  // replace later with a stricter origin
      );
    }

    setTimeout(() => window.close(), 300);
  }, []);

  return <h2>Completing authentication…</h2>;
}
