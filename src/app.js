const express = require("express");
const authRoutes = require("./routes/auth.routes");
const ApiResponse = require("./utils/apiResponse");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Multi-tenant SaaS API running" });
});
app.use("/auth", authRoutes);

//* Global error handler
app.use((err, req, res, next) => {
  console.error(err);

  return ApiResponse.error(res, "Internal server error", {}, 500);
});

module.exports = app;
