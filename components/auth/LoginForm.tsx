"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ensureProfileAction } from "@/app/login/actions";
import { getSiteUrl } from "@/lib/env";
import { createClient } from "@/lib/supabase/client";

type Provider = "apple" | "google";

type Step = "email" | "code";

const CODE_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 30;

interface LoginFormProps {
  /** Validated same-origin path to land on after sign-in. */
  next: string;
  /** Error carried over from the OAuth callback (`/login?error=…`). */
  initialError?: string;
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.72A5.41 5.41 0 0 1 3.68 9c0-.6.1-1.18.29-1.72V4.95H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.05l3.01-2.33Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.9 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M16.37 12.63c-.02-2.24 1.83-3.32 1.91-3.37-1.04-1.52-2.66-1.73-3.24-1.76-1.38-.14-2.69.81-3.39.81-.7 0-1.78-.79-2.92-.77-1.5.02-2.89.87-3.66 2.22-1.56 2.71-.4 6.72 1.12 8.92.75 1.08 1.63 2.29 2.79 2.24 1.12-.04 1.55-.72 2.9-.72 1.35 0 1.74.72 2.92.7 1.21-.02 1.97-1.1 2.71-2.18.85-1.25 1.2-2.46 1.22-2.52-.03-.01-2.34-.9-2.36-3.57ZM14.15 6.05c.62-.75 1.03-1.79.92-2.83-.89.04-1.97.59-2.6 1.34-.57.66-1.08 1.72-.94 2.74.99.08 2-.5 2.62-1.25Z" />
    </svg>
  );
}

function describeError(err: unknown, fallback: string): string {
  if (err && typeof err === "object" && "message" in err) {
    const message = String((err as { message?: unknown }).message ?? "");
    if (/rate limit|too many|over_email_send_rate_limit/i.test(message)) {
      return "Too many attempts. Please wait a minute and try again.";
    }
    if (/expired|invalid/i.test(message)) {
      return "That code is invalid or has expired. Request a new one.";
    }
    if (message) return message;
  }
  return fallback;
}

export default function LoginForm({ next, initialError }: LoginFormProps) {
  const router = useRouter();

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState<null | Provider | "otp" | "verify">(null);
  const [error, setError] = useState<string | undefined>(initialError);
  const [resendIn, setResendIn] = useState(0);

  const codeInputRef = useRef<HTMLInputElement>(null);
  const verifyingRef = useRef(false);

  // Resend cooldown ticker.
  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  // Focus the code field once it appears.
  useEffect(() => {
    if (step === "code") codeInputRef.current?.focus();
  }, [step]);

  async function signInWithProvider(provider: Provider) {
    setError(undefined);
    setBusy(provider);
    const supabase = createClient();
    const redirectTo = `${getSiteUrl()}/auth/callback?next=${encodeURIComponent(next)}`;
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo },
    });
    if (oauthError) {
      setError(describeError(oauthError, "Couldn't start that sign-in. Please try again."));
      setBusy(null);
    }
    // On success the browser navigates away to the provider.
  }

  async function sendCode(targetEmail: string) {
    setError(undefined);
    setBusy("otp");
    const supabase = createClient();
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email: targetEmail,
      options: { shouldCreateUser: true },
    });
    setBusy(null);
    if (otpError) {
      setError(describeError(otpError, "Couldn't send the code. Check the address and try again."));
      return false;
    }
    setResendIn(RESEND_COOLDOWN_SECONDS);
    return true;
  }

  async function handleEmailSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Enter a valid email address.");
      return;
    }
    setEmail(trimmed);
    const sent = await sendCode(trimmed);
    if (sent) {
      setCode("");
      setStep("code");
    }
  }

  async function verifyCode(token: string) {
    if (verifyingRef.current) return;
    verifyingRef.current = true;
    setError(undefined);
    setBusy("verify");

    const supabase = createClient();
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });

    if (verifyError) {
      setError(describeError(verifyError, "That code didn't work. Try again."));
      setCode("");
      setBusy(null);
      verifyingRef.current = false;
      codeInputRef.current?.focus();
      return;
    }

    // Session cookies are now set by the browser client; bootstrap `users` row
    // server-side, then move on. A profile failure is logged server-side and
    // must not block the user.
    await ensureProfileAction();

    router.replace(next);
    router.refresh();
  }

  function handleCodeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const digits = event.target.value.replace(/\D/g, "").slice(0, CODE_LENGTH);
    setCode(digits);
    setError(undefined);
    if (digits.length === CODE_LENGTH) {
      void verifyCode(digits);
    }
  }

  async function handleCodeSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (code.length === CODE_LENGTH) await verifyCode(code);
  }

  const disabled = busy !== null;

  return (
    <div className="vp-stack">
      <div className="vp-stack vp-stack--tight">
        <button
          type="button"
          className="vp-btn vp-btn-primary vp-btn--block"
          onClick={() => signInWithProvider("apple")}
          disabled={disabled}
        >
          <AppleIcon />
          {busy === "apple" ? "Redirecting…" : "Continue with Apple"}
        </button>
        <button
          type="button"
          className="vp-btn vp-btn-secondary vp-btn--block"
          onClick={() => signInWithProvider("google")}
          disabled={disabled}
        >
          <GoogleIcon />
          {busy === "google" ? "Redirecting…" : "Continue with Google"}
        </button>
      </div>

      <div className="vp-divider" role="separator">
        <span>or</span>
      </div>

      {step === "email" ? (
        <form className="vp-stack vp-stack--tight" onSubmit={handleEmailSubmit} noValidate>
          <label className="vp-label" htmlFor="login-email">
            Email
          </label>
          <input
            id="login-email"
            className="vp-input"
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(undefined);
            }}
            disabled={disabled}
            required
          />
          {error && (
            <p className="vp-error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="vp-btn vp-btn-primary vp-btn--block" disabled={disabled}>
            {busy === "otp" ? "Sending code…" : "Email me a code"}
          </button>
          <p className="vp-muted vp-small">
            We&apos;ll email you a 6-digit code. No password needed.
          </p>
        </form>
      ) : (
        <form className="vp-stack vp-stack--tight" onSubmit={handleCodeSubmit} noValidate>
          <label className="vp-label" htmlFor="login-code">
            Enter the code we sent to <strong>{email}</strong>
          </label>
          <input
            ref={codeInputRef}
            id="login-code"
            className="vp-input vp-input--code"
            type="text"
            name="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]*"
            maxLength={CODE_LENGTH}
            placeholder="••••••"
            value={code}
            onChange={handleCodeChange}
            disabled={busy === "verify"}
            aria-invalid={error ? true : undefined}
          />
          {error && (
            <p className="vp-error" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="vp-btn vp-btn-primary vp-btn--block"
            disabled={disabled || code.length !== CODE_LENGTH}
          >
            {busy === "verify" ? "Verifying…" : "Sign in"}
          </button>
          <div className="vp-row vp-row--between">
            <button
              type="button"
              className="vp-link"
              onClick={() => {
                setStep("email");
                setCode("");
                setError(undefined);
              }}
              disabled={busy === "verify"}
            >
              Use a different email
            </button>
            <button
              type="button"
              className="vp-link"
              onClick={() => void sendCode(email)}
              disabled={disabled || resendIn > 0}
            >
              {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend code"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
