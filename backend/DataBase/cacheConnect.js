const redis = require("redis");
require("dotenv").config();

const PORT = parseInt(process.env.NODE_REDIS_PORT) || 6379;
const HOST = process.env.NODE_REDIS_PORT || "127.0.0.1";

const Client = redis.createClient({
  port: PORT,
  host: HOST,
});

Client.on("connect", () => {
  console.log("☘️  Client connected to redis...");
});

Client.on("ready", () => {
  console.log("☘️  Client connected to redis and ready to use...");
});

Client.on("error", (err) => {
  console.log(`🍁  ${err.message}`);
});

Client.on("end", () => {
  console.log("🍁  Client disconnected from redis");
});

process.on("SIGINT", () => {
  Client.quit();
});

Client.connect();

module.exports = Client;
