require("dotenv").config();

const { Queue } = require("bullmq");
const redis = require("../config/redis");
const connection = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};

const emailQueue = new Queue("email-queue", {
  connection,
});

module.exports = emailQueue;
