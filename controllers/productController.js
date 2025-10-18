import fs from "fs";
import csv from "csv-parser";
import Product from "../models/Product.js";

// Upload CSV and store valid products
export const uploadCSV = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const results = [];
    const failed = [];
    fs.createReadStream(req.file.path)
      .pipe(
        csv({
          mapHeaders: ({ header }) =>
            header.trim().replace(/\uFEFF/g, "").toLowerCase(),
        })
      )
      .on("data", (row) => {
        const required = ["sku", "name", "brand", "mrp", "price"];
        const missing = required.filter((f) => !row[f]);
        const mrp = Number(row.mrp);
        const price = Number(row.price);
        const quantity = Number(row.quantity || 0);

        const errors = [];
        if (missing.length) errors.push(`Missing fields: ${missing.join(", ")}`);
        if (price > mrp) errors.push("Price cannot exceed MRP");
        if (quantity < 0) errors.push("Quantity cannot be negative");

        if (errors.length) {
          failed.push({ sku: row.sku || "unknown", errors });
        } else {
          results.push({
            sku: row.sku,
            name: row.name,
            brand: row.brand,
            color: row.color || null,
            size: row.size || null,
            mrp,
            price,
            quantity,
          });
        }
      })
      .on("end", async () => {
        const inserted = [];
        for (let product of results) {
          try {
            await Product.create(product);
            inserted.push(product.sku);
          } catch (err) {
            failed.push({ sku: product.sku, errors: [err.message] });
          }
        }

        // Remove temporary uploaded file
        fs.unlinkSync(req.file.path);
        res.json({ stored: inserted.length, failed });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const {
      brand,
      color,
      size,
      price,
      quantity,
      minPrice,
      maxPrice,
      keyword,
    } = req.query;

    const filter = {};

    // Exact filters
    if (brand) filter.brand = brand;
    if (color) filter.color = color;
    if (size) filter.size = isNaN(size) ? size : Number(size);
    if (price) filter.price = Number(price);
    if (quantity) filter.quantity = Number(quantity);

    // Price range filters
    if (minPrice || maxPrice) {
      // merge with existing filter.price if present
      filter.price = filter.price || {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Keyword search (optional fuzzy match)
    if (keyword) {
      const regex = new RegExp(keyword, "i");
      filter.$or = [
        { name: regex },
        { brand: regex },
        { sku: regex },
        { color: regex },
        { size: regex },
      ];
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Search failed" });
  }
};
