import BaseController from "./base.controller.js";
import CategoryService from "../services/category.service.js";

export default class CategoryController extends BaseController {
  constructor() {
    super(new CategoryService());
  }

  // override getAll to ensure sort order
  getAll = async (req, res) => {
    try {
      const data = await this.service.findAll({ sort: { order: 1, name: 1 } });
      this.response.success(res, data);
    } catch (err) {
      this.response.error(res, err.message);
    }
  };
}
