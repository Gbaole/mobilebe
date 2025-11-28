import BaseController from "./base.controller.js";
import ProductService from "../services/product.service.js";
// 19110167-Lê Trần Gia Bảo
export default class ProductController extends BaseController {
  constructor() {
    super(new ProductService());
  }

  // GET products by category
  getByCategory = async (req, res) => {
    try {
      const { categoryId } = req.params;
      const data = await this.service.getByCategory(categoryId, req.query);
      this.response.success(res, data);
    } catch (err) {
      this.response.error(res, err.message);
    }
  };
}
