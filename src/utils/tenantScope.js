exports.withTenant = (req, data = {}) => {
  return {
    ...data,
    tenantId: req.tenant._id,
  };
};
