const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    subscriptionPlan: {
      type: String,
      enum: ["FREE", "PRO", "ENTERPRISE"],
      default: "FREE",
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Soft delete scope
tenantSchema.pre(/^find/, function () {
  this.where({ deletedAt: null });
});

module.exports = mongoose.model("Tenant", tenantSchema);
