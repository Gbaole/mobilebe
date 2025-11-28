import ProductRepository from "../repositories/product.repository.js";

export default class ProductService {
  constructor() {
    this.repo = new ProductRepository();
  }

  async create(payload) {
    return await this.repo.create(payload);
  }

  async findAll(filter = {}, options = {}) {
    return await this.repo.findAll(filter, options);
  }

  async getByCategory(categoryId, query = {}) {
    const page = parseInt(query.page || 1);
    const limit = Math.min(parseInt(query.limit || 12), 100);
    const sortBy = query.sortBy || "price";
    const order = query.order || "asc";
    return await this.repo.findByCategory(categoryId, {
      page,
      limit,
      sortBy,
      order,
      populate: "category",
    });
  }
}
