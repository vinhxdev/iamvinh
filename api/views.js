// api/views.js
import { kv } from "@vercel/kv";
import { createHash, randomUUID } from "node:crypto";

const TOTAL_KEY = "vp:views:total";
const ONLINE_KEY = "vp:views:online";
const UNIQUE_TTL = 60 * 60 * 24;
const ONLINE_TTL_MS = 60 * 1000;

function hash(value) {
  return createHash("sha256").update(String(value)).digest("hex").slice(0, 40);
}

function getIp(req) {
  const raw =
    req.headers["x-vercel-forwarded-for"] ||
    req.headers["x-forwarded-for"] ||
    req.headers["cf-connecting-ip"] ||
    req.socket?.remoteAddress ||
    "unknown";

  return String(raw).split(",")[0].trim();
}

function parseCookies(cookieHeader = "") {
  return Object.fromEntries(
    cookieHeader
      .split(";")
      .map((v) => v.trim().split("="))
      .filter(([k, v]) => k && v)
  );
}

function setJsonHeaders(res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
}

export default async function handler(req, res) {
  setJsonHeaders(res);

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const ua = req.headers["user-agent"] || "";
  const ip = getIp(req);

  if (!/mozilla|chrome|safari|firefox|edg|opr|crios|fxios/i.test(ua)) {
    return res.status(403).json({ error: "Access Denied", views: 1, online: 1 });
  }

  try {
    const cookies = parseCookies(req.headers.cookie || "");
    const vid = /^[a-f0-9-]{20,80}$/i.test(cookies.vp_vid || "") ? cookies.vp_vid : randomUUID();
    const isHttps = req.headers["x-forwarded-proto"] === "https" || process.env.VERCEL;

    res.setHeader(
      "Set-Cookie",
      `vp_vid=${vid}; Max-Age=31536000; Path=/; HttpOnly; SameSite=Lax${isHttps ? "; Secure" : ""}`
    );

    const fingerprint = hash(`${ip}|${ua}|${vid}`);
    const uniqueKey = `vp:views:unique:${fingerprint}`;

    const created = await kv.set(uniqueKey, "1", {
      nx: true,
      ex: UNIQUE_TTL
    });

    let totalViews = created ? await kv.incr(TOTAL_KEY) : await kv.get(TOTAL_KEY);

    if (!totalViews) {
      await kv.set(TOTAL_KEY, 1, { nx: true });
      totalViews = 1;
    }

    const now = Date.now();

    await kv.zadd(ONLINE_KEY, {
      score: now,
      member: fingerprint
    });

    await kv.zremrangebyscore(ONLINE_KEY, 0, now - ONLINE_TTL_MS);

    const online = await kv.zcard(ONLINE_KEY);

    return res.status(200).json({
      views: Number(totalViews) || 1,
      online: Number(online) || 1,
      counted: Boolean(created)
    });
  } catch {
    return res.status(500).json({
      error: "Database Error",
      views: 1,
      online: 1
    });
  }
}
