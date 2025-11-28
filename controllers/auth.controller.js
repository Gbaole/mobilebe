import BaseController from "./base.controller.js";
import AuthService from "../services/auth.service.js";

export default class AuthController extends BaseController {
  constructor() {
    super(new AuthService());
  }

  register = async (req, res) => {
    try {
      const user = await this.service.register(req.body);
      this.response.success(res, user, "Register success", 201);
    } catch (err) {
      this.response.error(res, err.message);
    }
  };

  login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const data = await this.service.login(username, password);
      this.response.success(res, data, "Login success");
    } catch (err) {
      this.response.error(res, err.message);
    }
  };

  profile = async (req, res) => {
    try {
      const data = await this.service.getProfile(req.user._id);
      this.response.success(res, data);
    } catch (err) {
      this.response.error(res, err.message);
    }
  };
  verifyOTP = async (req, res) => {
    try {
      const { username, otp } = req.body;
      const data = await this.service.verifyOTP(username, otp);
      this.response.success(res, data, "Verify success");
    } catch (err) {
      this.response.error(res, err.message);
    }
  };
}
