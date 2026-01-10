const ApiResponse = require("../utils/apiResponse");

module.exports = (requiredPermissions = []) => {
  if (typeof requiredPermissions === "string") {
    requiredPermissions = [requiredPermissions];
  }

  return (req, res, next) => {
    const role = req.membership.roleId;

    if (!role || !role.permissions) {
      return ApiResponse.error(res, "Access denied", {}, 403);
    }

    const rolePermissions = role.permissions.map((p) => p.toString());

    const hasPermission = requiredPermissions.every((permissionId) =>
      rolePermissions.includes(permissionId)
    );

    if (!hasPermission) {
      return ApiResponse.error(res, "Insufficient permissions", {}, 403);
    }

    next();
  };
};
