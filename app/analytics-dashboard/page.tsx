import { notFound } from "next/navigation";
import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

interface AnalyticsEventRow {
  anonymous_id: string;
  session_id: string;
  event_name: string;
  event_label: string | null;
  device_type: string | null;
}

export default async function AnalyticsDashboardPage() {
  // Prevent public access in production
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  let events: AnalyticsEventRow[] = [];
  let errorLoading = false;

  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("analytics_events")
      .select("anonymous_id, session_id, event_name, event_label, device_type")
      .neq("event_name", "test_event");

    if (error) {
      errorLoading = true;
    } else if (data) {
      events = data as AnalyticsEventRow[];
    }
  } catch {
    errorLoading = true;
  }

  // Aggregate Core Metrics
  const uniqueVisitorSet = new Set<string>();
  const totalSessionSet = new Set<string>();

  let websiteOpens = 0;
  let readManifestoClicks = 0;
  let manifestoOpens = 0;
  let whatsappCommunityClicks = 0;
  let whatsappShareClicks = 0;
  let suggestionClicks = 0;

  // Scroll milestone distinct sessions
  const scroll25Sessions = new Set<string>();
  const scroll50Sessions = new Set<string>();
  const scroll75Sessions = new Set<string>();
  const scroll100Sessions = new Set<string>();

  // Manifesto open counts per point title
  const manifestoPointCounts: Record<string, number> = {};

  // Device breakdown from page_view events only (distinct sessions)
  const mobilePageViewSessions = new Set<string>();
  const desktopPageViewSessions = new Set<string>();

  for (const event of events) {
    if (event.anonymous_id) {
      uniqueVisitorSet.add(event.anonymous_id);
    }
    if (event.session_id) {
      totalSessionSet.add(event.session_id);
    }

    switch (event.event_name) {
      case "page_view":
        websiteOpens++;
        if (event.device_type === "mobile") {
          mobilePageViewSessions.add(event.session_id);
        } else if (event.device_type === "desktop") {
          desktopPageViewSessions.add(event.session_id);
        }
        break;

      case "read_manifesto_click":
        readManifestoClicks++;
        break;

      case "manifesto_open":
        manifestoOpens++;
        if (event.event_label) {
          manifestoPointCounts[event.event_label] =
            (manifestoPointCounts[event.event_label] || 0) + 1;
        }
        break;

      case "whatsapp_community_click":
        whatsappCommunityClicks++;
        break;

      case "whatsapp_share_click":
        whatsappShareClicks++;
        break;

      case "suggestion_click":
        suggestionClicks++;
        break;

      case "scroll_25":
        if (event.session_id) scroll25Sessions.add(event.session_id);
        break;

      case "scroll_50":
        if (event.session_id) scroll50Sessions.add(event.session_id);
        break;

      case "scroll_75":
        if (event.session_id) scroll75Sessions.add(event.session_id);
        break;

      case "scroll_100":
        if (event.session_id) scroll100Sessions.add(event.session_id);
        break;

      default:
        break;
    }
  }

  const uniqueVisitors = uniqueVisitorSet.size;
  const totalSessions = totalSessionSet.size;

  // Top 5 most opened manifesto points
  const topManifestoPoints = Object.entries(manifestoPointCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Device breakdown
  const mobileCount = mobilePageViewSessions.size;
  const desktopCount = desktopPageViewSessions.size;
  const totalDeviceSessions = mobileCount + desktopCount;
  const mobilePct =
    totalDeviceSessions > 0
      ? Math.round((mobileCount / totalDeviceSessions) * 100)
      : 0;
  const desktopPct =
    totalDeviceSessions > 0
      ? Math.round((desktopCount / totalDeviceSessions) * 100)
      : 0;

  const coreMetrics = [
    { label: "Unique Visitors", value: uniqueVisitors, highlight: true },
    { label: "Website Opens", value: websiteOpens },
    { label: "Sessions", value: totalSessions },
    { label: "Read Manifesto", value: readManifestoClicks },
    { label: "Manifesto Opens", value: manifestoOpens },
    { label: "WhatsApp Community", value: whatsappCommunityClicks },
    { label: "WhatsApp Shares", value: whatsappShareClicks },
    { label: "Suggestions", value: suggestionClicks },
  ];

  const scrollMetrics = [
    {
      label: "Reached 25%",
      count: scroll25Sessions.size,
      pct:
        totalSessions > 0
          ? Math.round((scroll25Sessions.size / totalSessions) * 100)
          : 0,
    },
    {
      label: "Reached 50%",
      count: scroll50Sessions.size,
      pct:
        totalSessions > 0
          ? Math.round((scroll50Sessions.size / totalSessions) * 100)
          : 0,
    },
    {
      label: "Reached 75%",
      count: scroll75Sessions.size,
      pct:
        totalSessions > 0
          ? Math.round((scroll75Sessions.size / totalSessions) * 100)
          : 0,
    },
    {
      label: "Reached Bottom",
      count: scroll100Sessions.size,
      pct:
        totalSessions > 0
          ? Math.round((scroll100Sessions.size / totalSessions) * 100)
          : 0,
    },
  ];

  return (
    <div className="min-h-screen bg-cream text-near-black py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Banner */}
        <header className="border-2 border-near-black bg-cream p-6 sm:p-8 shadow-[6px_6px_0px_var(--color-near-black)] border-b-4 border-b-gold">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-block px-3 py-1 bg-gold border-2 border-near-black text-near-black text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_var(--color-near-black)] mb-3">
                Local Testing Dashboard
              </div>
              <h1 className="font-display text-4xl sm:text-5xl uppercase tracking-wider text-near-black leading-none">
                SOET Federation
              </h1>
              <p className="font-display text-2xl sm:text-3xl text-near-black/80 tracking-wide mt-1">
                Analytics Dashboard
              </p>
              <p className="text-sm font-medium text-near-black/70 mt-1">
                Anonymous campaign website analytics
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="pressable inline-flex items-center px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-near-black bg-cream border-2 border-near-black shadow-[2px_2px_0px_var(--color-near-black)] hover:bg-gold transition-colors"
              >
                &larr; View Website
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t-2 border-near-black/15 text-xs text-near-black/60 font-medium">
            No names, phone numbers, MAC addresses, or raw IP addresses are collected.
          </div>
        </header>

        {errorLoading && (
          <div className="p-4 bg-gold/20 border-2 border-near-black shadow-[4px_4px_0px_var(--color-near-black)] text-sm font-semibold">
            Note: Could not retrieve live data from Supabase. Ensure database connection and local credentials are configured.
          </div>
        )}

        {/* Core Metric Cards Grid */}
        <section aria-label="Core Metrics">
          <h2 className="font-display text-2xl uppercase tracking-wider text-near-black mb-4">
            Campaign Overview
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {coreMetrics.map((metric) => (
              <div
                key={metric.label}
                className={`p-4 sm:p-5 border-2 border-near-black bg-cream shadow-[4px_4px_0px_var(--color-near-black)] flex flex-col justify-between ${
                  metric.highlight ? "border-t-4 border-t-gold" : ""
                }`}
              >
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-near-black/70 leading-snug">
                  {metric.label}
                </span>
                <span className="font-display text-4xl sm:text-5xl text-near-black mt-2 leading-none">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Scroll & Engagement Funnel */}
        <section aria-label="Engagement & Scroll Depth">
          <div className="border-2 border-near-black bg-cream p-6 shadow-[6px_6px_0px_var(--color-near-black)]">
            <div className="mb-4 pb-2 border-b-2 border-near-black/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <h2 className="font-display text-2xl uppercase tracking-wider text-near-black">
                Scroll &amp; Reading Engagement
              </h2>
              <span className="text-xs text-near-black/60 font-semibold uppercase tracking-wider">
                Distinct sessions per milestone
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {scrollMetrics.map((item) => (
                <div
                  key={item.label}
                  className="p-4 border-2 border-near-black/20 bg-near-black/[0.02]"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-near-black/70 block">
                    {item.label}
                  </span>
                  <span className="font-display text-3xl sm:text-4xl text-near-black mt-1 block leading-none">
                    {item.count}
                  </span>
                  <span className="text-xs font-semibold text-near-black/50 mt-1 block">
                    {item.pct}% of sessions
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Two Columns: Most Opened Points & Device Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Most Opened Manifesto Points */}
          <section
            aria-label="Top Manifesto Points"
            className="border-2 border-near-black bg-cream p-6 shadow-[6px_6px_0px_var(--color-near-black)] flex flex-col justify-between"
          >
            <div>
              <div className="mb-4 pb-2 border-b-2 border-near-black/15">
                <h2 className="font-display text-2xl uppercase tracking-wider text-near-black">
                  Most Opened Points
                </h2>
                <span className="text-xs text-near-black/60 font-semibold uppercase tracking-wider">
                  Top 5 priorities by user interaction
                </span>
              </div>

              {topManifestoPoints.length === 0 ? (
                <p className="text-sm text-near-black/60 italic py-4">
                  No manifesto points opened yet.
                </p>
              ) : (
                <ol className="space-y-3">
                  {topManifestoPoints.map(([title, count], index) => (
                    <li
                      key={title}
                      className="flex items-center justify-between gap-3 p-2.5 border-2 border-near-black/15 bg-cream hover:bg-gold/10 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="shrink-0 w-6 h-6 flex items-center justify-center bg-near-black text-cream text-xs font-bold">
                          {index + 1}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-near-black truncate uppercase tracking-tight">
                          {title}
                        </span>
                      </div>
                      <span className="font-display text-xl text-near-black shrink-0 px-2 py-0.5 bg-gold border border-near-black shadow-[1px_1px_0px_var(--color-near-black)] leading-none">
                        {count}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </section>

          {/* Device Breakdown */}
          <section
            aria-label="Device Breakdown"
            className="border-2 border-near-black bg-cream p-6 shadow-[6px_6px_0px_var(--color-near-black)] flex flex-col justify-between"
          >
            <div>
              <div className="mb-4 pb-2 border-b-2 border-near-black/15">
                <h2 className="font-display text-2xl uppercase tracking-wider text-near-black">
                  Device Breakdown
                </h2>
                <span className="text-xs text-near-black/60 font-semibold uppercase tracking-wider">
                  From unique page visit sessions
                </span>
              </div>

              <div className="space-y-4 pt-2">
                {/* Mobile */}
                <div className="p-3 border-2 border-near-black/20 bg-near-black/[0.02]">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-bold uppercase tracking-wider text-near-black">
                      Mobile (&lt; 768px)
                    </span>
                    <span className="font-display text-2xl text-near-black">
                      {mobileCount} ({mobilePct}%)
                    </span>
                  </div>
                  <div className="w-full bg-near-black/15 h-3 border border-near-black">
                    <div
                      className="bg-gold h-full"
                      style={{ width: `${mobilePct}%` }}
                    />
                  </div>
                </div>

                {/* Desktop */}
                <div className="p-3 border-2 border-near-black/20 bg-near-black/[0.02]">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-bold uppercase tracking-wider text-near-black">
                      Desktop (&ge; 768px)
                    </span>
                    <span className="font-display text-2xl text-near-black">
                      {desktopCount} ({desktopPct}%)
                    </span>
                  </div>
                  <div className="w-full bg-near-black/15 h-3 border border-near-black">
                    <div
                      className="bg-near-black h-full"
                      style={{ width: `${desktopPct}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-near-black/15 text-xs text-near-black/50">
              Total active device sessions: {totalDeviceSessions}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
