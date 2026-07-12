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

        // Xóa các logs cũ hơn 10 giây để bảo toàn dung lượng bộ nhớ
        await redis.zremrangebyscore('traffic_log', 0, now - 10000);

        const [total, recent] = await Promise.all([
            redis.get('total_requests'),
            redis.zcard('traffic_log')
        ]);

        return res.status(200).json({
            success: true,
            totalRequests: total ? parseInt(total, 10) : 0,
            currentRPS: Math.max(1, Math.round(recent / 10))
        });
    } catch (e) {
        return res.status(200).json({ success: false, totalRequests: 0, currentRPS: 0 });
    }
}
