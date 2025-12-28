require("dotenv").config();
const mongoose = require("mongoose");
const Permission = require("../models/Permission");

const permissions = [
  {
    key: "tenant:invite",
    description: "Invite users to tenant",
  },
  {
    key: "tenant:remove_member",
    description: "Remove tenant members",
  },
  {
    key: "tenant:update",
    description: "Update tenant details",
  },
  {
    key: "role:create",
    description: "Create custom roles",
  },
  {
    key: "role:update",
    description: "Update roles",
  },
  {
    key: "project:create",
    description: "Create projects",
  },
  {
    key: "project:update",
    description: "Update projects",
  },
  {
    key: "task:create",
    description: "Create tasks",
  },
  {
    key: "task:assign",
    description: "Assign tasks to users",
  },
];

const seedPermissions = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    for (const permission of permissions) {
      await Permission.updateOne(
        { key: permission.key },
        { $setOnInsert: permission },
        { upsert: true }
      );
    }

    console.log("✅ Permissions seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Permission seeding failed", error);
    process.exit(1);
  }
};

seedPermissions();
