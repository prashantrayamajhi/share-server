const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },

    userType: {
      type: String,
      enum: ["investor", "startup"],
      default: "startup",
    },

    organizationName: {
      type: String,
      trim: true,
    },

    website: {
      type: String,
      trim: true,
    },

    companySector: {
      type: String,
      trim: true,
    },

    pan: {
      type: String,
      trim: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isActivated: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  user.password = bcrypt.hashSync(user.password, 12);
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
