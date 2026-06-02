// middleware.js
export const config = { matcher: "/(.*)" };

const BLOCKED_UA = [
  "curl",
  "wget",
  "python",
  "httpie",
  "postman",
  "insomnia",
  "scrapy",
  "go-http-client",
  "node-fetch",
  "axios",
  "libwww",
  "source"
];

const SAFE_PREVIEW_BOTS = [
  "discordbot",
  "facebookexternalhit",
  "twitterbot",
  "telegrambot",
  "whatsapp",
  "slackbot"
];

const BLOCKED_PATHS = [
  /^\/\.git/i,
  /^\/\.env/i,
  /^\/\.vercel/i,
  /\/package-lock\.json$/i,
  /\/pnpm-lock\.yaml$/i,
  /\/yarn\.lock$/i,
  /\.(map|log|bak|old|sql|sqlite|db)$/i
];

export default function middleware(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  const ua = request.headers.get("user-agent") || "";
  const accept = request.headers.get("accept") || "";
  const ual = ua.toLowerCase();

  if (BLOCKED_PATHS.some((rule) => rule.test(path))) {
    return new Response("Not Found", { status: 404 });
  }

  const isSafePreview = SAFE_PREVIEW_BOTS.some((bot) => ual.includes(bot));
  const isBlockedTool = BLOCKED_UA.some((bot) => ual.includes(bot));
  const isBrowser = /mozilla|chrome|safari|firefox|edg|opr|crios|fxios/i.test(ua);
  const wantsHtml = accept.includes("text/html") || accept.includes("*/*");
  const isAsset = /\.(css|js|png|jpg|jpeg|gif|svg|ico|webp|woff2?)$/i.test(path);

  if (!isSafePreview && (isBlockedTool || (!isBrowser && wantsHtml && !isAsset))) {
    return new Response("Access Denied", { status: 403 });
  }
}
