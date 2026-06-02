export const config = {
  matcher: ["/((?!api|_next|favicon.ico|.*\\..*).*)"]
};

const BLOCKED_UA = [
  "curl",
  "wget",
  "python",
  "postman",
  "insomnia",
  "scrapy",
  "node-fetch",
  "axios",
  "go-http-client",
  "source"
];

export default function middleware(request) {
  const ua = request.headers.get("user-agent") || "";
  const ual = ua.toLowerCase();

  const isBlocked = BLOCKED_UA.some((x) => ual.includes(x));
  const isBrowser = /mozilla|chrome|safari|firefox|edg|opr|crios|fxios/i.test(ua);

  if (isBlocked || !isBrowser) {
    return new Response("Access Denied", {
      status: 403,
      headers: {
        "content-type": "text/plain; charset=utf-8"
      }
    });
  }
}
