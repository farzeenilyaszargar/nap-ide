"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

  const showOpenButton = Boolean(appHref);
  const [showCallbackButton, setShowCallbackButton] = useState(false);
  const callbackTriggeredRef = useRef(false);
  const callbackAttemptsRef = useRef(0);
  const alertShownRef = useRef(false);

  const fireHiddenCallback = (href: string) => {
    // Prefer passive loads to reduce mixed-content blocking on HTTPS.
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(href, new Blob([], { type: "text/plain" }));
      }
    } catch {}
    try {
      void fetch(href, {
        mode: "no-cors",
        cache: "no-store",
        credentials: "omit",
      });
    } catch {}
    const img = new Image();
    img.referrerPolicy = "no-referrer";
    img.src = href;
    img.alt = "";
    // Fallback iframe for environments that don't fire image requests.
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = href;
    document.body.appendChild(iframe);
    window.setTimeout(() => iframe.remove(), 2000);
  };

  const triggerHiddenCallback = (href: string) => {
    if (!href) return;
    callbackAttemptsRef.current += 1;
    if (!callbackTriggeredRef.current) {
      callbackTriggeredRef.current = true;
    }
    fireHiddenCallback(href);
    if (callbackAttemptsRef.current < 3) {
      window.setTimeout(() => triggerHiddenCallback(href), 800);
    }
  };

  useEffect(() => {
    if (desktopMode && !alertShownRef.current) {
      alertShownRef.current = true;
      window.alert("Please open the Nap app to complete sign-in.");
    }

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
      if (desktopMode) {
        const timer = window.setTimeout(() => {
          if (document.hasFocus()) {
            setShowCallbackButton(true);
          }
        }, 1500);
        return () => window.clearTimeout(timer);
      }
    }
  }, [callbackHref, deepLink, desktopMode, legacyDeepLink, refreshToken, token]);

  const statusText = showOpenButton
    ? "Authentication complete. You can open the app below."
    : showCallbackButton
      ? "Authentication complete. If the app doesn't open, complete sign-in below."
      : "Authentication complete. You can close this tab.";

  const primaryLabel = appHref ? "Open Nap" : "Open callback page";
  const callbackLabel = "Complete sign-in";

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto flex min-h-screen max-w-xl bg-white text-black flex-col items-center justify-center px-6 text-center">
        <h2 className="text-2xl font-semibold">Authentication Complete</h2>
        <p className="mt-4 text-sm text-gray-600">{statusText}</p>

        {(showOpenButton || showCallbackButton) && (
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
            {showCallbackButton && callbackHref && (
              <button
                className="rounded-xl border border-black px-5 py-3 text-sm font-medium text-black hover:bg-gray-100"
                onClick={() => {
                  const popup = window.open(
                    callbackHref,
                    "nap-auth",
                    "width=10,height=10,left=-10000,top=-10000"
                  );
                  if (popup) {
                    window.setTimeout(() => {
                      try {
                        popup.close();
                      } catch {}
                    }, 1500);
                  } else {
                    triggerHiddenCallback(callbackHref);
                  }
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
