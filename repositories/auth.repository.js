import BaseRepository from "./base.repository.js";
import User from "../models/user.model.js";

export default class AuthRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  findByUsername(username) {
    return this.model.findOne({ username });
  }

  updateOTP(id, otp) {
    return this.model.findByIdAndUpdate(id, { otp }, { new: true });
  }
}
