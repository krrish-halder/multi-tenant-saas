const Tenant = require("../models/Tenant");
const Role = require("../models/Role");
const TenantMember = require("../models/TenantMember");
const Permission = require("../models/Permission");

exports.createTenantWithOwner = async (user) => {
  // 1. Create tenant
  const tenant = await Tenant.create({
    name: `${user.username}'s Workspace`,
    ownerId: user._id,
  });

  // 2. Fetch all permissions
  const permissions = await Permission.find();
  const permissionIds = permissions.map((p) => p._id);

  // 3. Create OWNER role
  const ownerRole = await Role.create({
    tenantId: tenant._id,
    name: "OWNER",
    permissions: permissionIds,
    isSystemRole: true,
  });

  // 4. Create ADMIN role (subset)
  const adminRole = await Role.create({
    tenantId: tenant._id,
    name: "ADMIN",
    permissions: permissionIds, // later we can reduce
    isSystemRole: true,
  });

  // 5. Create MEMBER role (empty or minimal)
  const memberRole = await Role.create({
    tenantId: tenant._id,
    name: "MEMBER",
    permissions: [],
    isSystemRole: true,
  });

  // 6. Attach owner as tenant member
  await TenantMember.create({
    tenantId: tenant._id,
    userId: user._id,
    roleId: ownerRole._id,
  });

  return {
    tenant,
    role: ownerRole,
  };
};
