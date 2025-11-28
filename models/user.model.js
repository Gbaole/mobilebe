import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: false }, // activated by OTP
  otp: {
    code: String,
    expiresAt: Date,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", UserSchema);
