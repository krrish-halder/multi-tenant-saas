const jwt = require("jsonwebtoken");
const ApiResponse = require("../utils/apiResponse");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return ApiResponse.error(res, "Unauthorized", {}, 401);
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.auth = {
      userId: decoded.userId,
      tenantId: decoded.tenantId,
      roleId: decoded.roleId,
    };

    next();
  } catch (err) {
    return ApiResponse.error(res, "Invalid token", {}, 401);
  }
};
