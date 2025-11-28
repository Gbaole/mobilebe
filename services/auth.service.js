import AuthRepository from "../repositories/auth.repository.js";
import { generateToken } from "../config/jwt.js";
import bcrypt from "bcrypt";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
}

export default class AuthService {
  constructor() {
    this.repo = new AuthRepository();
  }

  async register(data) {
    const { username, password } = data;
    const exists = await this.repo.findByUsername(username);
    if (exists) throw new Error("Username already exists");

    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.repo.create({
      ...data,
      password: hashed,
      isActive: false,
      otp: {
        code: generateOTP(),
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
      },
    });

    console.log("🔐 OTP for", user.username, ":", user.otp.code);

    return { id: user._id, username: user.username };
  }

  async verifyOTP(username, otp) {
    const user = await this.repo.findByUsername(username);
    if (!user) throw new Error("User not found");

    if (user.isActive) throw new Error("User already activated");

    if (!user.otp || user.otp.code !== otp) throw new Error("Invalid OTP");

    if (new Date() > new Date(user.otp.expiresAt))
      throw new Error("OTP expired");

    await this.repo.updateById(user._id, {
      isActive: true,
      otp: null,
    });

    return { message: "Account activated" };
  }

  async login(username, password) {
    const user = await this.repo.findByUsername(username);
    if (!user) throw new Error("Invalid username or password");

    if (!user.isActive) throw new Error("Account not activated");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid username or password");

    const token = generateToken({ id: user._id });

    return {
      token,
      user: {
        id: user._id,
        username: user.username,
      },
    };
  }

  async getProfile(userId) {
    return await this.repo.findById(userId);
  }
}
