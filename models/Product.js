import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  color: { type: String },
  size: { type: String },
  mrp: { type: Number, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0, min: 0 },
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
