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

---

## ⚙️ Installation & Setup

### 1️. Clone the Repository
```bash
git clone https://github.com/YOUR-USERNAME/streamoid-backend.git
cd streamoid-backend
2. Install Dependencies
npm install
3. Configure Environment Variables
Create a .env file in the root directory:
MONGO_URI=mongodb://localhost:27017/streamoid
PORT=8000
4. Run the Server
npm run dev
Server will start on:
http://localhost:8000
5. CSV Upload API
Endpoint:
POST /upload
| Key    | Type | Description                      |
| ------ | ---- | -------------------------------- |
| `file` | File | CSV file containing product data |
6. CSV Format:
sku,name,brand,color,size,mrp,price,quantity
A101,T-Shirt,Nike,Blue,38,999,799,10
A102,Jeans,Levi's,Black,32,2499,1999,5
7. Response:
{
  "stored": 2,
  "failed": []
}
8. Product Search API
Endpoint:
GET /products/search
Supported Query Parameters:
| Parameter  | Type            | Description                                   |
| ---------- | --------------- | --------------------------------------------- |
| `brand`    | String          | Filter by brand                               |
| `color`    | String          | Filter by color                               |
| `size`     | String / Number | Filter by size                                |
| `price`    | Number          | Exact price                                   |
| `quantity` | Number          | Exact quantity                                |
| `minPrice` | Number          | Minimum price                                 |
| `maxPrice` | Number          | Maximum price                                 |
| `keyword`  | String          | Fuzzy search in name, brand, sku, color, size |
Examples:
/products/search?brand=Nike
/products/search?size=38
/products/search?minPrice=1000&maxPrice=2000
/products/search?price=1699&quantity=9
/products/search?keyword=shirt
Response Example:
[
  {
    "_id": "6710376bcf8b...",
    "sku": "A101",
    "name": "T-Shirt",
    "brand": "Nike",
    "color": "Blue",
    "size": "38",
    "mrp": 999,
    "price": 799,
    "quantity": 10
  }
]
9. Testing with Postman

Upload CSV

Method: POST

URL: http://localhost:8000/products/upload

Body → form-data

Key: file

Value: select your .csv file

Search Products

Method: GET

URL: http://localhost:8000/products/search?brand=Nike
10. Tech Stack

Node.js

Express.js

MongoDB (Mongoose)

Multer — for file uploads

csv-parser — for CSV reading and validation

dotenv — for environment variables

Nodemon — for live reload

