import Redis from 'ioredis';

// Ưu tiên biến môi trường REDIS_URL nếu có, fallback về URL cũ để không gãy deploy hiện tại
const redis = new Redis(process.env.REDIS_URL || "redis://default:MtiYjsH3jj7sZFcNYZUlbpcYkqFUx6K7@tree-blooming-efficacious-87161.db.redis.io:19119");

const RPS_WINDOW_MS = 10000;       // cửa sổ trượt 10 giây để tính req/s thật
const PRESENCE_WINDOW_MS = 300000; // khách còn hoạt động trong 5 phút gần nhất được tính là online

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const now = Date.now();

        if (req.method === 'POST') {
            const body = (req.body && typeof req.body === 'object') ? req.body : {};
            const type = typeof body.type === 'string' ? body.type.slice(0, 16) : 'hit';
            const visitor = typeof body.visitor === 'string' ? body.visitor.slice(0, 48) : null;

            const write = redis.multi();
            if (visitor) write.zadd('traffic_visitors', now, visitor);
            // 'ping' chỉ là heartbeat báo hiện diện — không được đếm như một sự kiện thật
            if (type !== 'ping') {
                write.zadd('traffic_log', now, `${type}:${now}:${Math.random().toString(36).slice(2, 7)}`);
                write.incr('total_requests');
            }
            await write.exec();
        }

        const read = redis.multi();
        read.zremrangebyscore('traffic_log', 0, now - RPS_WINDOW_MS);
        read.zremrangebyscore('traffic_visitors', 0, now - PRESENCE_WINDOW_MS);
        read.get('total_requests');
        read.zcard('traffic_log');
        read.zcard('traffic_visitors');
        const replies = await read.exec();

        const totalRaw = replies && replies[2] ? replies[2][1] : null;
        const recentRaw = replies && replies[3] ? replies[3][1] : null;
        const visitorsRaw = replies && replies[4] ? replies[4][1] : null;

        const recent = recentRaw ? parseInt(recentRaw, 10) : 0;
        // RPS thật = số sự kiện thật trong 10s gần nhất / 10 — không cộng nhiễu, không phóng đại
        const currentRPS = Math.round((recent / (RPS_WINDOW_MS / 1000)) * 100) / 100;

        return res.status(200).json({
            success: true,
            totalRequests: totalRaw ? parseInt(totalRaw, 10) : 0,
            recentRequests: recent,
            currentRPS,
            visitorsOnline: visitorsRaw ? parseInt(visitorsRaw, 10) : 0
        });
    } catch (e) {
        return res.status(200).json({ success: false, totalRequests: 0, recentRequests: 0, currentRPS: 0, visitorsOnline: 0 });
    }
}
