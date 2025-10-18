---

```markdown
# 🛠️ Streamoid Backend — CSV Upload & Search API

A Node.js + Express + MongoDB backend application built for the **Streamoid Take-Home Assignment (Backend Intern – Fresher)**.

This app allows users to upload product data via a CSV file, validate it, store it in MongoDB, and search products using multiple filters.

---

## 🚀 Features

- Upload & parse CSV files using **Multer** and **csv-parser**
- Validate product data before insertion
- Skip invalid rows (e.g., missing fields or `price > mrp`)
- Search products by:
  - Brand, Color, Size
  - Price Range (`minPrice`, `maxPrice`)
  - Exact Price or Quantity
  - Fuzzy keyword search across multiple fields
- RESTful API using Express & Mongoose
- Scalable, clean folder structure

---

## 📁 Project Structure

```

streamoid-backend/
├── controllers/
├── models/
├── routes/
├── services/
├── utils/
├── uploads/
├── .env
├── app.js
├── server.js
├── package.json

````

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR-USERNAME/streamoid-backend.git
cd streamoid-backend
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with:

```env
MONGO_URI=mongodb://localhost:27017/streamoid
PORT=8000
```

### 4. Run the Server

```bash
npm run dev
```

The server will start at:
📍 `http://localhost:8000`

---

## 📤 CSV Upload API

### ▶️ Endpoint

```
POST /products/upload
```

### 🔑 Form Data

| Key    | Type | Description                      |
| ------ | ---- | -------------------------------- |
| `file` | File | CSV file containing product data |

### 🧾 CSV Format Example

```csv
sku,name,brand,color,size,mrp,price,quantity
A101,T-Shirt,Nike,Blue,38,999,799,10
A102,Jeans,Levi's,Black,32,2499,1999,5
```

### ✅ Response Example

```json
{
  "stored": 2,
  "failed": []
}
```

---

## 🔍 Product Search API

### ▶️ Endpoint

```
GET /products/search
```

### 🔎 Supported Query Parameters

| Parameter  | Type            | Description                                   |
| ---------- | --------------- | --------------------------------------------- |
| `brand`    | String          | Filter by brand                               |
| `color`    | String          | Filter by color                               |
| `size`     | String / Number | Filter by size                                |
| `price`    | Number          | Filter by exact price                         |
| `quantity` | Number          | Filter by exact quantity                      |
| `minPrice` | Number          | Filter by minimum price                       |
| `maxPrice` | Number          | Filter by maximum price                       |
| `keyword`  | String          | Fuzzy search in name, brand, sku, color, size |

### 📌 Examples

* `/products/search?brand=Nike`
* `/products/search?size=38`
* `/products/search?minPrice=1000&maxPrice=2000`
* `/products/search?price=1699&quantity=9`
* `/products/search?keyword=shirt`

### ✅ Response Example

```json
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
```

---

## 🧪 Testing with Postman

### 🔼 Upload CSV

* **Method**: `POST`
* **URL**: `http://localhost:8000/products/upload`
* **Body → form-data**:

  * **Key**: `file`
  * **Value**: Select your `.csv` file

### 🔍 Search Products

* **Method**: `GET`
* **URL Example**:
  `http://localhost:8000/products/search?brand=Nike`

---

## 🧰 Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB** with Mongoose
* **Multer** — File upload middleware
* **csv-parser** — For parsing and validating CSVs
* **dotenv** — Environment variable support
* **Nodemon** — Development server reloading

---

## 📄 License

This project is part of a take-home assignment and is not licensed for commercial use.

```

---

✅ **To use**:
1. Open Notepad or VS Code.
2. Paste all of the above content.
3. Save the file as `README.md` inside your project root directory.

Let me know if you want me to include badges, author info, or contribution guidelines as well.
```
