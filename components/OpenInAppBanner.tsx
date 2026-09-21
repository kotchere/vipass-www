"use client";

import { useEffect, useRef, useState } from "react";

import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/app-links";
import { createBranchLink } from "@/lib/branch";

const APP_ICON_SRC = "/assets/images/favicon.png";
const DISMISSED_KEY = "openInApp:dismissed";
const PHONE_MEDIA_QUERY = "(max-width: 768px)";
const STORE_FALLBACK_DELAY_MS = 1500;
/** Set on <html> while the banner is shown so the fixed header and page padding shift down. */
const BANNER_HEIGHT_VAR = "--vp-app-banner-h";

export type OpenInAppBannerProps = {
  /** `vipass://…` URL used when Branch is unavailable. */
  deepLink: string;
  /** Custom metadata the app's `resolveBranchRoute` reads (`contentType`, ids…). */
  branchData: Record<string, string>;
  title: string;
  subtitle?: string;
  /** Flat share URL (`https://vipass.app/<id>`). */
  canonicalUrl: string;
  /** `https://vipass.app/events/<id>` — where desktop browsers land. */
  desktopUrl: string;
  imageUrl?: string;
};

type Platform = "ios" | "android";

function detectPlatform(userAgent: string): Platform | null {
  if (/iPhone|iPad|iPod/i.test(userAgent)) return "ios";
  if (/Android/i.test(userAgent)) return "android";
  return null;
}

function readDismissed(): boolean {
  try {
    return window.localStorage.getItem(DISMISSED_KEY) === "1";
  } catch {
    return false;
  }
}

function writeDismissed(): void {
  try {
    window.localStorage.setItem(DISMISSED_KEY, "1");
  } catch {
    // Storage blocked (private mode, ITP) — dismissal just won't persist.
  }
}

/**
 * Open the app via the `vipass://` scheme; if the page is still visible
 * after a short delay the app is not installed, so send the user to the store.
 */
function openViaSchemeThenStore(deepLink: string, storeUrl: string): void {
  let timer: number | undefined;

  const cancel = () => {
    if (timer !== undefined) window.clearTimeout(timer);
    timer = undefined;
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pagehide", cancel);
  };
  const onVisibility = () => {
    if (document.visibilityState === "hidden") cancel();
  };

  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("pagehide", cancel);

  timer = window.setTimeout(() => {
    const stillHere = document.visibilityState === "visible";
    cancel();
    if (stillHere) window.location.href = storeUrl;
  }, STORE_FALLBACK_DELAY_MS);

  window.location.href = deepLink;
}

/**
 * "Open in app" strip for phone browsers. Renders nothing on the server, on
 * desktop/tablet viewports, on non-mobile user agents, and once dismissed.
 */
export default function OpenInAppBanner({
  deepLink,
  branchData,
  title,
  subtitle = "Get tickets, see who's going",
  canonicalUrl,
  desktopUrl,
  imageUrl,
}: OpenInAppBannerProps) {
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [visible, setVisible] = useState(false);
  const [opening, setOpening] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const detected = detectPlatform(navigator.userAgent);
    if (!detected) return;
    if (readDismissed()) return;

    const mql = window.matchMedia(PHONE_MEDIA_QUERY);
    const sync = () => setVisible(mql.matches);
    setPlatform(detected);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);

  // The banner is position: fixed above the (also fixed) site header, so it
  // publishes its rendered height for the header offset and page padding.
  useEffect(() => {
    const root = document.documentElement;
    const el = rootRef.current;
    if (!visible || !el) {
      root.style.removeProperty(BANNER_HEIGHT_VAR);
      return;
    }
    const apply = () => root.style.setProperty(BANNER_HEIGHT_VAR, `${el.offsetHeight}px`);
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    return () => {
      observer.disconnect();
      root.style.removeProperty(BANNER_HEIGHT_VAR);
    };
  }, [visible]);

  if (!platform || !visible) return null;

  const storeUrl = platform === "ios" ? APP_STORE_URL : PLAY_STORE_URL;

  const dismiss = () => {
    writeDismissed();
    setVisible(false);
  };

  const open = async () => {
    if (opening) return;
    setOpening(true);
    try {
      const url = await createBranchLink({
        data: branchData,
        title,
        imageUrl,
        canonicalUrl,
        desktopUrl,
      });
      window.location.assign(url);
      return;
    } catch {
      openViaSchemeThenStore(deepLink, storeUrl);
    } finally {
      setOpening(false);
    }
  };

  return (
    <div ref={rootRef} className="vp-open-in-app" role="complementary" aria-label="Open in the Vipass app">
      {/* eslint-disable-next-line @next/next/no-img-element -- local static asset, no optimisation needed */}
      <img className="vp-open-in-app__icon" src={APP_ICON_SRC} alt="" width={44} height={44} />
      <div className="vp-open-in-app__text">
        <strong className="vp-open-in-app__title">Vipass</strong>
        <span className="vp-open-in-app__subtitle">{subtitle}</span>
      </div>
      <button
        type="button"
        className="vp-btn vp-btn-primary vp-open-in-app__open"
        onClick={open}
        disabled={opening}
      >
        Open
      </button>
      <button
        type="button"
        className="vp-open-in-app__close"
        onClick={dismiss}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
