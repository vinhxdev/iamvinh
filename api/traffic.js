import Redis from 'ioredis';

const redis = new Redis("redis://default:MtiYjsH3jj7sZFcNYZUlbpcYkqFUx6K7@tree-blooming-efficacious-87161.db.redis.io:19119");

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const now = Date.now();
        if (req.method === 'POST') {
            await redis.zadd('traffic_log', now, `req:${now}:${Math.random().toString(36).substring(2, 7)}`);
            await redis.incr('total_requests');
        }

        await redis.zremrangebyscore('traffic_log', 0, now - 10000);

        const [total, recent] = await Promise.all([
            redis.get('total_requests'),
            redis.zcard('traffic_log')
        ]);

        const realClickCount = recent ? parseInt(recent, 10) : 0;

        // 🌊 THUẬT TOÁN TẠO SÓNG NHIỄU TOÁN HỌC (DSTATS STYLE)
        const timeFactor = now / 4000; // Tốc độ cuộn đổi hình dạng sóng
        const sineWave = Math.sin(timeFactor) * 130; // Biên độ dao động lớn
        const cosineWave = Math.cos(timeFactor * 2.3) * 50; // Sóng phụ tạo thung lũng gồ ghề
        const microNoise = (Math.random() - 0.5) * 35; // Sai số ngẫu nhiên tạo gai nhọn nhỏ
        
        // Đặt tải nền mặc định dao động liên tục từ 380 đến 580 RPS
        let ambientRPS = Math.floor(450 + sineWave + cosineWave + microNoise);

        // Nếu bạn click chuột hoặc gõ phím thật, nhân hệ số tạo cú vọt đỉnh sóng (Spike) rực rỡ
        const finalRPS = ambientRPS + (realClickCount * 55);

        return res.status(200).json({
            success: true,
            totalRequests: total ? parseInt(total, 10) : 0,
            currentRPS: Math.max(20, finalRPS) // Đảm bảo chỉ số không chạm đáy
        });
    } catch (e) {
        return res.status(200).json({ success: false, totalRequests: 0, currentRPS: 380 });
    }
}
