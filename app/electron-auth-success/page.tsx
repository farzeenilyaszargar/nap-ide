"use client";
import { useEffect } from "react";

export default function ElectronAuthSuccess() {

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const refreshToken = params.get("refresh_token");

    if (window.opener) {
      window.opener.postMessage(
        { channel: "auth-success", token, refreshToken },
        "*"  // replace later with a stricter origin
      );
      setTimeout(() => window.close(), 300);
    } else {
      // Fallback for standard browser flow: Redirect to deep link
      if (token) {
        const deepLink = `nap://auth?token=${token}${refreshToken ? `&refresh_token=${refreshToken}` : ''}`;
        window.location.href = deepLink;
      }
    }
  }, []);

  return <h2>Completing authentication…</h2>;
}
