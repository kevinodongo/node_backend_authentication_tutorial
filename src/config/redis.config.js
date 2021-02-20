const redis = require("redis");
const client = redis.createClient({
  host: process.env.REDIS_DB_URI,
});

module.exports = client