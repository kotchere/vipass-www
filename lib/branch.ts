"use client";

import { getBranchKey } from "@/lib/env";

/**
 * Lazy loader for the Branch Web SDK, used only by the "Open in app" banner.
 *
 * The SDK is fetched from Branch's CDN on first use (never in the initial
 * bundle) and initialised once with the public key for this environment.
 * Pinned reference: Branch Web SDK 2.x — `branch-latest.min.js` tracks the
 * current 2.x release (2.86 at the time of writing, 2026-09).
 */
const BRANCH_SDK_URL = "https://cdn.branch.io/branch-latest.min.js";
const BRANCH_SDK_SCRIPT_ID = "branch-web-sdk";
export const BRANCH_LINK_TIMEOUT_MS = 2500;

type BranchCallback<T> = (error: Error | string | null, result: T) => void;

export interface BranchSdk {
  init: (
    key: string,
    options?: Record<string, unknown>,
    callback?: BranchCallback<unknown>,
  ) => void;
  link: (
    linkData: Record<string, unknown>,
    callback: BranchCallback<string | undefined>,
  ) => void;
}

declare global {
  interface Window {
    branch?: BranchSdk;
  }
}

let branchPromise: Promise<BranchSdk> | undefined;

function toError(error: Error | string | null | undefined, fallback: string): Error {
  if (error instanceof Error) return error;
  return new Error(typeof error === "string" && error ? error : fallback);
}

/**
 * Injects the Branch SDK `<script>` once and resolves with the initialised
 * `branch` global. Rejects on a script load error or an `init` failure; the
 * rejection is cached-cleared so a later call can retry.
 */
export function loadBranch(): Promise<BranchSdk> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Branch SDK is browser-only"));
  }
  if (branchPromise) return branchPromise;

  branchPromise = new Promise<BranchSdk>((resolve, reject) => {
    const fail = (reason: string) => {
      branchPromise = undefined;
      reject(new Error(reason));
    };

    const init = () => {
      const sdk = window.branch;
      if (!sdk) return fail("Branch SDK loaded without a global");
      try {
        sdk.init(getBranchKey(), undefined, (error) => {
          if (error) return fail(toError(error, "Branch init failed").message);
          resolve(sdk);
        });
      } catch (error) {
        fail(toError(error as Error, "Branch init threw").message);
      }
    };

    const existing = document.getElementById(BRANCH_SDK_SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      if (window.branch) return init();
      existing.addEventListener("load", init, { once: true });
      existing.addEventListener("error", () => fail("Branch SDK failed to load"), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = BRANCH_SDK_SCRIPT_ID;
    script.src = BRANCH_SDK_URL;
    script.async = true;
    script.addEventListener("load", init, { once: true });
    script.addEventListener("error", () => fail("Branch SDK failed to load"), { once: true });
    document.head.appendChild(script);
  });

  return branchPromise;
}

export type CreateBranchLinkInput = {
  /** Custom metadata the app routes on (`contentType`, `eventId`, …). */
  data: Record<string, string>;
  title: string;
  imageUrl?: string;
  /** Flat share URL (`https://vipass.app/<id>`) — what Branch shows as the page. */
  canonicalUrl: string;
  /** Where desktop browsers land when they open the Branch link. */
  desktopUrl: string;
};

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error(`${label} timed out`)), ms);
    promise.then(
      (value) => {
        window.clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        window.clearTimeout(timer);
        reject(error);
      },
    );
  });
}

/**
 * Mints a Branch link for the "Open in app" banner. Resolves with the link
 * URL or rejects (load error, SDK error, or the 2.5 s budget the app uses in
 * `use-share-link`) so the caller can fall back to the `vipass://` scheme.
 */
export function createBranchLink(input: CreateBranchLinkInput): Promise<string> {
  const mint = async (): Promise<string> => {
    const sdk = await loadBranch();
    return new Promise<string>((resolve, reject) => {
      sdk.link(
        {
          channel: "web",
          feature: "open_in_app",
          data: {
            ...input.data,
            $canonical_url: input.canonicalUrl,
            $og_title: input.title,
            ...(input.imageUrl ? { $og_image_url: input.imageUrl } : {}),
            $desktop_url: input.desktopUrl,
          },
        },
        (error, url) => {
          if (error) return reject(toError(error, "branch.link failed"));
          if (!url) return reject(new Error("branch.link returned no url"));
          resolve(url);
        },
      );
    });
  };

  return withTimeout(mint(), BRANCH_LINK_TIMEOUT_MS, "Branch link");
}
