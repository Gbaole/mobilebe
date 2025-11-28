import mongoose from "mongoose";
// 19110167-Lê Trần Gia Bảo
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  order: { type: Number, default: 0 },
});

export default mongoose.model("Category", CategorySchema);
