export const config = { matcher: '/(.*)' };
export default function middleware(request) {
  const ua = request.headers.get('user-agent') || '';
  const ual = ua.toLowerCase();
  const botKeywords = ['curl','postman','python','wget','node-fetch','axios','bot','spider','crawler','scraper','source'];
  const isBot = botKeywords.some(k => ual.includes(k));
  const isBrowser = ua.includes('Mozilla') || ua.includes('Chrome') || ua.includes('Safari');
  if (isBot || !isBrowser) {
    return new Response('Access Denied', { status: 403 });
  }
}
