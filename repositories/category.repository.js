import BaseRepository from "./base.repository.js";
import Category from "../models/category.model.js";
// 19110167-Lê Trần Gia Bảo
export default class CategoryRepository extends BaseRepository {
  constructor() {
    super(Category);
  }

  findByName(name) {
    return this.model.findOne({ name });
  }
}
