const express = require("express");
const authRoutes = require("./routes/auth.routes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Multi-tenant SaaS API running" });
});
app.use("/auth", authRoutes);


//* Global error handler
app.use((err, req, res, next) => {
  console.error(err);

  return res.status(500).json({
    status: 0,
    message: "Internal server error",
    data: {},
  });
});

module.exports = app;
