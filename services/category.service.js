import CategoryRepository from "../repositories/category.repository.js";

export default class CategoryService {
  constructor() {
    this.repo = new CategoryRepository();
  }

  async create(payload) {
    return await this.repo.create(payload);
  }

  async findAll(options = {}) {
    // options can include populate, sort, limit, skip
    return await this.repo.findAll({}, options);
  }

  async findById(id) {
    return await this.repo.findById(id);
  }
}
