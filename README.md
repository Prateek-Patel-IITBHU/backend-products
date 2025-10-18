```markdown
# 🛠️ Streamoid Backend — CSV Upload & Search API

A Node.js + Express + MongoDB backend built for the **Streamoid Take-Home Assignment (Backend Intern – Fresher)**.

This application allows uploading product data via a CSV file, validating and storing it in MongoDB, and provides powerful search capabilities with filters like brand, color, price range, keyword search, and more.

---

## 🚀 Features

- Upload & parse CSV files using **Multer** and **csv-parser**
- Validate product data before inserting into MongoDB
- Skip invalid rows (e.g., missing fields or `price > mrp`)
- Search products by:
  - Brand, Color, Size
  - Price Range (`minPrice`, `maxPrice`)
  - Exact Price or Quantity
  - Fuzzy keyword search across multiple fields
- RESTful API using **Express** and **Mongoose**
- Clean, modular project structure (ES Modules)
- Easy to test via Postman

---

##  Project Structure

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

Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb://localhost:27017/streamoid
PORT=8000
```
Also make sure to create a mongodb connection link with mongodb://localhost:27017/ or 
paste the link whatever you have in MONGO_URI = 'your link'

### 4. Run the Development Server

```bash
npm run dev
```

The server will start at:
📍 `http://localhost:8000`

---

## 📤 CSV Upload API

### Endpoint

```
POST /upload
```

### Form Data

| Key    | Type | Description                      |
| ------ | ---- | -------------------------------- |
| `file` | File | CSV file containing product data |

CSV File is uploaded using `multer` and parsed via `csv-parser`.

### CSV Format Example

```csv
sku,name,brand,color,size,mrp,price,quantity
A101,T-Shirt,Nike,Blue,38,999,799,10
A102,Jeans,Levi's,Black,32,2499,1999,5
```

### Sample Response

```json
{
  "stored": 2,
  "failed": []
}
```

---

## 🔍 Product Search API

### Endpoint

```
GET /products/search
```

### Query Parameters

| Parameter  | Type            | Description                                                 |
| ---------- | --------------- | ----------------------------------------------------------- |
| `brand`    | String          | Filter by brand                                             |
| `color`    | String          | Filter by color                                             |
| `size`     | String / Number | Filter by size                                              |
| `price`    | Number          | Filter by exact price                                       |
| `quantity` | Number          | Filter by exact quantity                                    |
| `minPrice` | Number          | Minimum price for range filter                              |
| `maxPrice` | Number          | Maximum price for range filter                              |
| `keyword`  | String          | Fuzzy search across `name`, `brand`, `sku`, `color`, `size` |

### Example URLs

* `/products/search?brand=Nike`
* `/products/search?size=38`
* `/products/search?minPrice=1000&maxPrice=2000`
* `/products/search?price=1699&quantity=9`
* `/products/search?keyword=shirt`

### Sample Response

```json
[
  {
    "_id": "652e13abf4f4e5...",
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

## Testing with Postman

###  Upload CSV

* **Method**: `POST`
* **URL**: `http://localhost:8000/upload`
* **Body** → form-data:

  * Key: `file`
  * Value: Your `.csv` file

###  Search Products

* **Method**: `GET`
* **URL**: `http://localhost:8000/products/search?brand=Nike`

---

## Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB** using **Mongoose**
* **Multer** — File upload handling
* **csv-parser** — CSV parsing and validation
* **dotenv** — Environment variable management
* **Nodemon** — Live-reload dev server

---

## License

This project is built for a technical assessment and is not licensed for production/commercial use.

---
