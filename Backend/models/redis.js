const Redis = require("ioredis");

const client = new Redis({
  host: process.env.REDIS_HOST || "redis-server", // Use container name
  port: process.env.REDIS_PORT || 6379,
  retryStrategy: (times) => {
    console.log(`Redis reconnect attempt ${times}`);
    return Math.min(times * 100, 3000);
  },
  reconnectOnError: (err) => {
    console.error("Redis Error:", err.message);
    return true;
  },
});

client.on("connect", () => {
  console.log("✅ Redis Connected");
});

client.on("error", (err) => {
  console.error("❌ Redis Connection Error:", err.message);
});

module.exports = client;