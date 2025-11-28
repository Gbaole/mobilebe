import mongoose from "mongoose";

// 19110167-Lê Trần Gia Bảo
const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  images: [String],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Product", ProductSchema);
