const Tenant = require("../models/Tenant");
const TenantMember = require("../models/TenantMember");
const ApiResponse = require("../utils/apiResponse");

module.exports = async (req, res, next) => {
  try {
    const { userId, tenantId } = req.auth;

    if (!tenantId) {
      return ApiResponse.error(res, "Tenant context missing", {}, 400);
    }

    // 1️⃣ Check tenant exists
    const tenant = await Tenant.findById(tenantId);
    if (!tenant) {
      return ApiResponse.error(res, "Tenant not found", {}, 404);
    }

    // 2️⃣ Check user membership
    const membership = await TenantMember.findOne({
      tenantId,
      userId,
    }).populate({
      path: "roleId",
      populate: {
        path: "permissions",
      },
    });

    if (!membership) {
      return ApiResponse.error(res, "Access denied for tenant", {}, 403);
    }

    // 3️⃣ Attach tenant context
    req.tenant = tenant;
    req.membership = membership;

    next();
  } catch (error) {
    console.error(error);
    return ApiResponse.error(res, "Tenant isolation failed", {}, 500);
  }
};
