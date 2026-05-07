import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    // 1. Lấy IP thực của người truy cập
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';

    try {
        const totalViewsKey = 'global_total_views_real'; // Key moi bat dau tu 1
        const ipKey = `visited_ip_24h_${ip}`;
        
        // 2. Kiểm tra IP đã tồn tại trong 24h qua chưa
        const hasVisited = await kv.get(ipKey);
        
        let totalViews;

        // Nếu CHƯA TỪNG truy cập trong 24h (bao gồm cả fake IP mới)
        if (!hasVisited && ip !== 'unknown') {
            // Lưu IP vào Database với thời gian hết hạn là 24 giờ (86400 giây)
            await kv.set(ipKey, 'true', { ex: 86400 }); 
            
            // Tăng tổng đếm thực tế lên 1
            totalViews = await kv.incr(totalViewsKey);
        } 
        // Nếu ĐÃ TRUY CẬP trong 24h (F5 lại hoặc IP cũ)
        else {
            // Chỉ lấy con số tổng hiện tại, KHÔNG CỘNG THÊM
            totalViews = await kv.get(totalViewsKey) || 1;
        }

        // 3. Trả về kết quả cho Frontend
        res.status(200).json({ views: totalViews });

    } catch (error) {
        // Fallback an toàn
        res.status(500).json({ error: 'Database Error', views: 1 });
    }
}
