const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],

    isSystemRole: {
      type: Boolean,
      default: false, // Owner/Admin default roles
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", roleSchema);
