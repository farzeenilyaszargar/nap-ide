"use client";

import { useEffect, useMemo, useRef } from "react";

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
  const primaryHref = appHref || callbackHref;
  const hasCallbackFallback = false;

  const showOpenButton = Boolean(appHref);
  const callbackTriggeredRef = useRef(false);

  const triggerHiddenCallback = (href: string) => {
    if (!href || callbackTriggeredRef.current) return;
    callbackTriggeredRef.current = true;
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = href;
    document.body.appendChild(iframe);
    window.setTimeout(() => {
      iframe.remove();
    }, 2000);
  };

  useEffect(() => {
    if (window.opener && token) {
      window.opener.postMessage(
        { channel: "auth-success", token, refreshToken },
        "*"
      );
      setTimeout(() => window.close(), 300);
      return;
    }

    if (callbackHref) {
      triggerHiddenCallback(callbackHref);
    }
  }, [callbackHref, deepLink, desktopMode, legacyDeepLink, refreshToken, token]);

  const statusText = showOpenButton
    ? "Authentication complete. You can open the app below."
    : "Authentication complete. You can close this tab.";

  const primaryLabel = appHref ? "Open Nap" : "Open callback page";
  const callbackLabel = "Complete sign-in";

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto flex min-h-screen max-w-xl bg-white text-black flex-col items-center justify-center px-6 text-center">
        <h2 className="text-2xl font-semibold">Authentication Complete</h2>
        <p className="mt-4 text-sm text-gray-600">{statusText}</p>

        {showOpenButton && (
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
            {hasCallbackFallback && callbackHref && (
              <button
                className="rounded-xl border border-black px-5 py-3 text-sm font-medium text-black hover:bg-gray-100"
                onClick={() => {
                  window.location.href = callbackHref;
                }}
              >
                {callbackLabel}
              </button>
            )}

          </div>
        )}
      </div>
    </main>
  );
}
