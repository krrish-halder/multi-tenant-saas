const mongoose = require("mongoose");

const tenantMemberSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },

    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

tenantMemberSchema.index({ tenantId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("TenantMember", tenantMemberSchema);
