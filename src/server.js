require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const { loadPermissions } = require("./utils/permissionMap");

const PORT = process.env.APP_PORT || 3000;

(async () => {
  await connectDB();
  await loadPermissions();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
