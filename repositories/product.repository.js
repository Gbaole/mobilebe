import BaseRepository from "./base.repository.js";
import Product from "../models/product.model.js";

export default class ProductRepository extends BaseRepository {
  constructor() {
    super(Product);
  }

  // get by category with pagination + sort
  async findByCategory(categoryId, options = {}) {
    const {
      page = 1,
      limit = 12,
      sortBy = "price",
      order = "asc",
      populate = "",
    } = options;
    const sortOrder = order === "desc" ? -1 : 1;
    const skip = (page - 1) * limit;

    let query = this.model
      .find({ category: categoryId })
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);
    if (populate) query = query.populate(populate);
    const data = await query.exec();
    const total = await this.model.countDocuments({ category: categoryId });
    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }
}
