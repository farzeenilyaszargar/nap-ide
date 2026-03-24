"use client";

import { useEffect, useMemo, useState } from "react";

function getSearchParams(): URLSearchParams {
  if (typeof window === "undefined") {
    return new URLSearchParams();
  }
  return new URLSearchParams(window.location.search);
}

export default function ElectronAuthSuccess() {
  const params = useMemo(() => getSearchParams(), []);

  const desktopMode = params.get("desktop") === "1";
  const deepLink = params.get("deep_link");
  const callbackHref = params.get("callback");
  const token = params.get("token");
  const refreshToken = params.get("refresh_token");

  const legacyDeepLink = token
    ? `nap://auth?token=${token}${refreshToken ? `&refresh_token=${refreshToken}` : ""}`
    : null;
  const appHref = deepLink || legacyDeepLink;
  const primaryHref = appHref;

  const showOpenButton = Boolean(appHref);
  const [showOpenFallback, setShowOpenFallback] = useState(false);

  useEffect(() => {
    if (window.opener && token) {
      window.opener.postMessage(
        { channel: "auth-success", token, refreshToken },
        "*"
      );
      setTimeout(() => window.close(), 300);
      return;
    }

    if (desktopMode && appHref) {
      window.location.href = appHref;
      const timer = window.setTimeout(() => {
        if (document.hasFocus()) {
          if (callbackHref) {
            window.location.href = callbackHref;
            return;
          }
          setShowOpenFallback(true);
        }
      }, 1200);
      return () => window.clearTimeout(timer);
    }
  }, [appHref, callbackHref, desktopMode, refreshToken, token]);

  const statusText = showOpenFallback
    ? "If the app did not open, use the button below."
    : showOpenButton
      ? "Opening Nap..."
      : "Authentication complete. You can close this tab.";

  const primaryLabel = "Open Nap";

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto flex min-h-screen max-w-xl bg-white text-black flex-col items-center justify-center px-6 text-center">
        <h2 className="text-2xl font-semibold">Authentication Complete</h2>
        <p className="mt-4 text-sm text-gray-600">{statusText}</p>

        {(showOpenButton || showOpenFallback) && (
          <div className="mt-8 flex flex-col gap-3">
            {primaryHref && (
              <button
                className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
                onClick={() => {
                  window.location.href = primaryHref;
                }}
              >
                {primaryLabel}
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
