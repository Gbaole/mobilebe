import BaseRepository from "./base.repository.js";
import Category from "../models/category.model.js";

export default class CategoryRepository extends BaseRepository {
  constructor() {
    super(Category);
  }

  findByName(name) {
    return this.model.findOne({ name });
  }
}
