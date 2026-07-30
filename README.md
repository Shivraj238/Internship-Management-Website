# InternPulse — MERN Stack

## Project Structure
```
├── server/          # Express + MongoDB backend
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── .env
└── client/          # React + Vite frontend
    └── src/
        ├── api/
        ├── components/
        └── pages/
```

## Setup & Run

### 1. Prerequisites
- Node.js installed
- MongoDB running locally (`mongod`) or use a MongoDB Atlas URI

### 2. Backend
```bash
cd server
npm install
# Edit .env and set your MONGO_URI if using Atlas
npm start
```

### 3. Frontend
```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173 — Register an account, then login.
