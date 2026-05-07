import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    // 1. Lấy địa chỉ IP thực của người truy cập
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';

    try {
        // 2. Tạo một cái "nhãn" để đánh dấu IP này trong Database
        const ipKey = `visited_ip_${ip}`;
        
        // 3. Kiểm tra xem Database đã từng ghi nhận IP này chưa
        const hasVisited = await kv.get(ipKey);
        
        let totalViews;

        // Nếu IP này CHƯA TỪNG truy cập
        if (!hasVisited && ip !== 'unknown') {
            // Lưu IP này lại vĩnh viễn để lần sau không cộng nữa
            await kv.set(ipKey, 'true'); 
            // Tăng tổng số lượt xem lên 1
            totalViews = await kv.incr('global_total_views');
        } 
        // Nếu IP đã truy cập rồi (Họ đang spam nút F5)
        else {
            // Chỉ lấy con số tổng hiện tại ra đưa cho họ xem, KHÔNG CỘNG THÊM
            totalViews = await kv.get('global_total_views') || 1;
        }

        // 4. Trả kết quả (số view) về cho file script.js ở Frontend hiển thị
        res.status(200).json({ views: totalViews });

    } catch (error) {
        // Nếu Database bị lỗi hoặc chưa kết nối, trả về mặc định là 1 để web không bị sập
        res.status(500).json({ error: 'Database Error', views: 1 });
    }
}
