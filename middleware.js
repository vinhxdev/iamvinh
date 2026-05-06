export const config = {
  // Cấu hình Middleware chạy trên toàn bộ đường dẫn của web
  matcher: '/(.*)',
};

export default function middleware(request) {
  // Lấy thông tin 'Giấy phép lái xe' (User-Agent) của người truy cập
  const userAgent = request.headers.get('user-agent') || '';
  const userAgentLower = userAgent.toLowerCase();

  // Danh sách từ khóa của các công cụ soi code, tool fetch dữ liệu, bot...
  const blockedTools = [
    'curl', 'postman', 'python', 'wget', 'node-fetch', 
    'go-http', 'java', 'axios', 'bot', 'spider', 'crawler', 'scraper'
  ];

  // Kiểm tra xem có chứa từ khóa bị cấm không
  const isBlocked = blockedTools.some(tool => userAgentLower.includes(tool));
  
  // Trình duyệt thật thường luôn có chữ Mozilla, Chrome, hoặc Safari
  const isBrowser = userAgent.includes('Mozilla') || userAgent.includes('Chrome') || userAgent.includes('Safari');

  // NẾU LÀ TOOL (hoặc không phải trình duyệt chuẩn) -> ĐÁ VĂNG!
  if (isBlocked || !isBrowser) {
    return new Response(
      `<!DOCTYPE html>
      <html lang="en">
      <head><title>Access Denied</title></head>
      <body style="background:#000; color:#ef4444; display:flex; align-items:center; justify-content:center; height:100vh; font-family:monospace; font-size:20px; font-weight:bold; margin:0; text-align:center;">
        [SECURE SYSTEM] ACCESS DENIED.<br>Automated tools and source viewers are strictly prohibited.
      </body>
      </html>`,
      {
        status: 403, // Mã lỗi 403: Forbidden (Cấm truy cập)
        headers: { 'content-type': 'text/html' }
      }
    );
  }

  // NẾU LÀ NGƯỜI DÙNG THẬT DÙNG TRÌNH DUYỆT -> CHO QUA
  // Trình duyệt sẽ tải index.html và dính tiếp bẫy JS Anti-Tamper của chúng ta
}
