import express from "express";
import multer from "multer";
import { uploadCSV, getProducts, searchProducts } from "../controllers/productController.js";

const router = express.Router();
const upload = multer({ dest: "src/uploads/" });

router.post("/upload", upload.single("file"), uploadCSV);
router.get("/products", getProducts);
router.get("/products/search", searchProducts);

export default router;