# Streamoid Backend — CSV Upload & Search API

A Node.js + Express + MongoDB backend application built for the Streamoid Take-Home Assignment (Backend Intern – Fresher).  
It allows uploading product data via a CSV file, validating and storing it in MongoDB, and searching products with multiple filters.

---

##Features

- Upload and parse CSV files using **Multer** and **csv-parser**
- Validate product data before inserting into MongoDB
- Prevent invalid rows (e.g. missing fields or price > MRP)
- Search products by:
  - Brand, Color, Size
  - Price Range (`minPrice`, `maxPrice`)
  - Exact Price or Quantity
  - Keyword (fuzzy search across multiple fields)
- RESTful API built using Express and Mongoose
- Clean folder structure for scalability

---

## Project Structure

