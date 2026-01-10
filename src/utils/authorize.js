const authorizeMiddleware = require("../middlewares/authorize.middleware");
const { getPermissionId } = require("./permissionMap");

module.exports = (permissions) => {
  if (typeof permissions === "string") {
    permissions = [permissions];
  }

  const permissionIds = permissions.map((p) => getPermissionId(p));

  return authorizeMiddleware(permissionIds);
};
