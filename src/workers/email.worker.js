require("dotenv").config();

const { Worker } = require("bullmq");
const { sendMail } = require("../services/mail.service");
const connection = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};

const worker = new Worker(
  "email-queue",
  async (job) => {
    // console.log("📩 Processing email job:", job.id);

    const { to, subject, html } = job.data;

    await sendMail({ to, subject, html });
  },
  { connection }
);

// worker.on("completed", (job) => {
//   console.log(`✅ Email job ${job.id} completed`);
// });

// worker.on("failed", (job, err) => {
//   console.error(`❌ Email job ${job?.id} failed`, err);
// });

console.log("📬 Email worker started");
