import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

const FORBIDDEN_METADATA_KEYS =
  /^(ip|ip_address|ipaddress|client_ip|clientip|remote_ip|remoteip|remote_address|remoteaddress|mac|mac_address|macaddress|user_agent|useragent)$/i;

function isPlainObject(val: unknown): val is Record<string, unknown> {
  return (
    typeof val === "object" &&
    val !== null &&
    !Array.isArray(val) &&
    Object.prototype.toString.call(val) === "[object Object]"
  );
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  if (!isPlainObject(body)) {
    return NextResponse.json(
      { error: "Request payload must be a JSON object" },
      { status: 400 }
    );
  }

  const {
    anonymousId,
    sessionId,
    eventName,
    eventLabel,
    pagePath,
    deviceType,
    metadata = {},
  } = body;

  // Validate eventName (required string, max 100 chars)
  if (typeof eventName !== "string" || !eventName.trim()) {
    return NextResponse.json({ error: "eventName is required" }, { status: 400 });
  }
  if (eventName.length > 100) {
    return NextResponse.json(
      { error: "eventName exceeds allowed length" },
      { status: 400 }
    );
  }

  // Validate anonymousId and sessionId (required strings, max 128 chars)
  if (typeof anonymousId !== "string" || !anonymousId.trim()) {
    return NextResponse.json(
      { error: "anonymousId must be a non-empty string" },
      { status: 400 }
    );
  }
  if (anonymousId.length > 128) {
    return NextResponse.json(
      { error: "anonymousId exceeds allowed length" },
      { status: 400 }
    );
  }

  if (typeof sessionId !== "string" || !sessionId.trim()) {
    return NextResponse.json(
      { error: "sessionId must be a non-empty string" },
      { status: 400 }
    );
  }
  if (sessionId.length > 128) {
    return NextResponse.json(
      { error: "sessionId exceeds allowed length" },
      { status: 400 }
    );
  }

  // Validate optional eventLabel
  let sanitizedEventLabel: string | null = null;
  if (eventLabel !== undefined && eventLabel !== null) {
    if (typeof eventLabel !== "string") {
      return NextResponse.json({ error: "eventLabel must be a string" }, { status: 400 });
    }
    if (eventLabel.length > 255) {
      return NextResponse.json(
        { error: "eventLabel exceeds allowed length" },
        { status: 400 }
      );
    }
    sanitizedEventLabel = eventLabel.trim();
  }

  // Validate optional pagePath
  let sanitizedPagePath: string | null = null;
  if (pagePath !== undefined && pagePath !== null) {
    if (typeof pagePath !== "string") {
      return NextResponse.json({ error: "pagePath must be a string" }, { status: 400 });
    }
    if (pagePath.length > 500) {
      return NextResponse.json(
        { error: "pagePath exceeds allowed length" },
        { status: 400 }
      );
    }
    sanitizedPagePath = pagePath.trim();
  }

  // Validate optional deviceType
  let sanitizedDeviceType: string | null = null;
  if (deviceType !== undefined && deviceType !== null) {
    if (typeof deviceType !== "string") {
      return NextResponse.json({ error: "deviceType must be a string" }, { status: 400 });
    }
    if (deviceType.length > 50) {
      return NextResponse.json(
        { error: "deviceType exceeds allowed length" },
        { status: 400 }
      );
    }
    sanitizedDeviceType = deviceType.trim();
  }

  // Validate metadata (must be a plain object, reject arrays)
  if (!isPlainObject(metadata)) {
    return NextResponse.json({ error: "metadata must be a plain object" }, { status: 400 });
  }

  // Strip/ignore any IP, MAC, or User-Agent fields from metadata
  const sanitizedMetadata: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(metadata)) {
    if (FORBIDDEN_METADATA_KEYS.test(key)) {
      continue;
    }
    sanitizedMetadata[key] = value;
  }

  let supabase;
  try {
    supabase = getSupabaseServerClient();
  } catch {
    return NextResponse.json(
      { error: "Analytics service unavailable" },
      { status: 500 }
    );
  }

  try {
    const { error } = await supabase.from("analytics_events").insert({
      anonymous_id: anonymousId.trim(),
      session_id: sessionId.trim(),
      event_name: eventName.trim(),
      event_label: sanitizedEventLabel,
      page_path: sanitizedPagePath,
      device_type: sanitizedDeviceType,
      metadata: sanitizedMetadata,
    });

    if (error) {
      return NextResponse.json({ error: "Failed to record event" }, { status: 500 });
    }
  } catch {
    return NextResponse.json({ error: "Failed to record event" }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
