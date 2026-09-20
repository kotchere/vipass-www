import type { Metadata } from "next";
import { redirect } from "next/navigation";

import LoginForm from "@/components/auth/LoginForm";
import SiteHeader from "@/components/layout/SiteHeader";
import { sanitizeNextPath } from "@/lib/safe-next";
import { getUser } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Sign in - Vipass",
  robots: { index: false, follow: false },
};

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const ERROR_MESSAGES: Record<string, string> = {
  oauth: "That sign-in didn't complete. Please try again.",
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const next = sanitizeNextPath(params.next) ?? "/";
  const errorKey = typeof params.error === "string" ? params.error : undefined;
  const initialError = errorKey ? ERROR_MESSAGES[errorKey] : undefined;

  const user = await getUser();
  if (user) {
    redirect(next);
  }

  return (
    <div id="main">
      <div
        className="f-D2wOp f-128kipa"
        data-layout-template="true"
        data-selection="true"
        style={{ minHeight: "100vh", width: "auto" }}
      >
        <div className="f-gdzxqr-container" data-f-layout-hint-center-x="true">
          <div className="ssr-variant hidden-1l0aw67 hidden-xwr0r7">
            <SiteHeader />
          </div>
        </div>
        <main className="vp-page vp-page--narrow">
          <div className="vp-card vp-stack">
            <div className="vp-stack vp-stack--tight">
              <h1 className="vp-title">Sign in</h1>
              <p className="vp-muted">
                Use the same account as the Vipass app to see your tickets everywhere.
              </p>
            </div>
            <LoginForm next={next} initialError={initialError} />
          </div>
        </main>
      </div>
    </div>
  );
}
