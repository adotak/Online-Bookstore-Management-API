# Online-Bookstore-Management-API

RESTful API for managing an online bookstore — built with Node.js, Express, and MongoDB. Supports full CRUD on books, search/filtering, pagination, request logging, and centralized error handling.

## Features

- **CRUD Operations**: Manage books (Create, Read, Update, Delete).
- **Search**: Find books by author or genre.
- **Pagination**: Navigate through large lists of books easily.
- **Validation**: Ensures required fields are provided.
- **Logging & Error Handling**: Comprehensive request logging and robust error responses.

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB & Mongoose**

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd "Online Bookstore Management API"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory (or use the existing one) with the following content:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/bookstore
   ```
   *Note: Update the `MONGO_URI` if you are using MongoDB Atlas.*

4. **Run the server:**
   - **Development mode** (uses nodemon):
     ```bash
     npm run dev
     ```
   - **Production mode**:
     ```bash
     npm start
     ```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/books` | Get all books (Supports `?author=xyz`, `?genre=abc`, `?page=1&limit=10`) |
| `GET` | `/api/books/:id` | Get a single book by its ID |
| `POST` | `/api/books` | Add a new book |
| `PUT` | `/api/books/:id` | Update an existing book by ID |
| `DELETE`| `/api/books/:id` | Delete a book by ID |

## Book Schema

When adding or updating a book, use the following JSON structure:

```json
{
  "title": "Book Title",       // String, Required
  "author": "Author Name",     // String, Required
  "genre": "Fiction",          // String, Optional
  "price": 19.99,              // Number, Required
  "publishedDate": "2023-01-01",// Date, Optional
  "inStock": true              // Boolean, Optional (Default: true)
}
```
