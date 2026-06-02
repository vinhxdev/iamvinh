import { kv } from "@vercel/kv";
import crypto from "crypto";

const TOTAL_KEY = "vinhprofile:total_views";
const ONLINE_KEY = "vinhprofile:online_users";

function getIp(req) {
  const forwarded = req.headers["x-forwarded-for"];

  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }

  return req.socket?.remoteAddress || "unknown";
}

function getHash(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method Not Allowed"
    });
  }

  res.setHeader("Cache-Control", "no-store");

  try {
    const ua = req.headers["user-agent"] || "";
    const ip = getIp(req);

    const id = getHash(`${ip}:${ua}`);
    const uniqueKey = `vinhprofile:unique:${id}`;

    const isNew = await kv.set(uniqueKey, "1", {
      nx: true,
      ex: 86400
    });

    let views = await kv.get(TOTAL_KEY);

    if (isNew) {
      views = await kv.incr(TOTAL_KEY);
    }

    if (!views) {
      await kv.set(TOTAL_KEY, 1);
      views = 1;
    }

    const now = Date.now();

    await kv.zadd(ONLINE_KEY, {
      score: now,
      member: id
    });

    await kv.zremrangebyscore(ONLINE_KEY, 0, now - 60000);

    const online = await kv.zcard(ONLINE_KEY);

    return res.status(200).json({
      views: Number(views) || 1,
      online: Number(online) || 1
    });
  } catch {
    return res.status(200).json({
      views: 1,
      online: 1,
      fallback: true
    });
  }
}
