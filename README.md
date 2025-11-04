# MERN Blog - Assignment (Week 4)

## Overview
A full-stack MERN blog application demonstrating integration between React (Vite), Express, MongoDB (Mongoose), and Node.js. Features: posts, categories, comments, image uploads, JWT auth, pagination, search, optimistic UI.

## Setup
### Prerequisites
- Node.js v18+
- MongoDB running locally or provide a remote URI

### Server
cd server
cp .env.example .env
# fill MONGO_URI, JWT_SECRET, CLIENT_URL
npm install
npm run dev

### Client
cd client
cp .env.example .env
# set VITE_API_URL
npm install
npm run dev

## API Endpoints
- GET /api/posts
- GET /api/posts/:id
- POST /api/posts (auth + multipart/form-data)
- PUT /api/posts/:id (auth)
- DELETE /api/posts/:id (auth)
- GET /api/categories
- POST /api/categories (auth)
- POST /api/auth/register
- POST /api/auth/login
- GET /api/comments?postId=...
- POST /api/comments

## Features implemented
- JWT authentication
- Image uploads via multer
- Pagination & search
- Comments
- Optimistic UI for post creation
- Input validation and central error handler
- Proxy configured for dev

## Notes
Uploads are saved to `/server/uploads` (for demo). For production use S3/Cloudinary and store links in DB.

## Screenshots
(Add screenshots here)
