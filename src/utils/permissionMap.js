const Permission = require("../models/Permission");

let permissionCache = null;

exports.loadPermissions = async () => {
  const permissions = await Permission.find();
  permissionCache = {};

  permissions.forEach((p) => {
    permissionCache[p.key] = p._id.toString();
  });

  console.log("✅ Permissions loaded into cache");
};

exports.getPermissionId = (key) => {
  if (!permissionCache || !permissionCache[key]) {
    throw new Error(`Permission not found: ${key}`);
  }
  return permissionCache[key];
};
