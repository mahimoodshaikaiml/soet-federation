import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { verifyDashboardAuthToken, COOKIE_NAME } from "@/lib/dashboard-auth";

export const dynamic = "force-dynamic";

interface AnalyticsLoginPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AnalyticsLoginPage({
  searchParams,
}: AnalyticsLoginPageProps) {
  // If already authenticated with valid token, redirect straight to dashboard
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (token && verifyDashboardAuthToken(token)) {
    redirect("/analytics-dashboard");
  }

  const resolvedParams = await searchParams;
  const hasError = resolvedParams.error === "1";

  return (
    <div className="min-h-screen bg-cream text-near-black flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-6">
          <div className="inline-block px-3 py-1 bg-gold border-2 border-near-black text-near-black text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_var(--color-near-black)] mb-3">
            Protected Area
          </div>
          <h1 className="font-display text-4xl sm:text-5xl uppercase tracking-wider text-near-black leading-none">
            SOET Federation
          </h1>
          <p className="font-display text-2xl uppercase tracking-wide text-near-black/80 mt-1">
            Analytics Login
          </p>
        </div>

        <div className="border-2 border-near-black bg-cream p-6 sm:p-8 shadow-[6px_6px_0px_var(--color-near-black)] border-t-4 border-t-gold">
          {hasError && (
            <div
              role="alert"
              className="mb-6 p-3 bg-red-500/10 border-2 border-red-600 text-red-900 text-xs sm:text-sm font-bold shadow-[2px_2px_0px_#dc2626]"
            >
              Incorrect password.
            </div>
          )}

          <form action="/api/analytics-auth/login" method="POST" className="space-y-5">
            <div>
              <label
                htmlFor="password"
                className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-near-black mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
                autoComplete="current-password"
                placeholder="Enter dashboard password"
                className="w-full px-3.5 py-2.5 bg-cream border-2 border-near-black text-near-black text-base shadow-[2px_2px_0px_var(--color-near-black)] focus:outline-none focus:ring-2 focus:ring-gold focus:border-near-black placeholder:text-near-black/40"
              />
            </div>

            <button
              type="submit"
              className="pressable w-full min-h-[48px] px-6 py-3 bg-near-black text-cream font-bold text-base uppercase tracking-wider border-2 border-near-black shadow-[4px_4px_0px_var(--color-gold)] active:shadow-[2px_2px_0px_var(--color-gold)] hover:bg-near-black/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-near-black"
            >
              Open Dashboard
            </button>
          </form>

          <div className="mt-6 pt-4 border-t-2 border-near-black/15 text-center">
            <Link
              href="/"
              className="text-xs font-bold uppercase tracking-wider text-near-black/70 hover:text-near-black underline decoration-2 underline-offset-4"
            >
              &larr; Back to Campaign Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
