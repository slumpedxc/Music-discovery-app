# 🚀 Deployment Guide

This guide helps you deploy both the frontend and backend of the Music Discovery App using modern free-tier tools.

---

## 🖼️ Frontend (React) — Deploy with Vercel

1. Go to [https://vercel.com/import](https://vercel.com/import)
2. Connect your GitHub repo and select the `frontend/` folder
3. Set build command: `yarn build`
4. Set output directory: `dist` or `build`
5. Deploy!

📌 Optional: Set environment variable for Last.fm API key

---

## ⚙️ Backend (FastAPI) — Deploy with Render or Railway

### Option 1: Render
1. Go to [https://render.com](https://render.com)
2. Create a new Web Service
3. Select your repo and `backend/` as root
4. Set build command:  
   `pip install -r requirements.txt`
5. Set start command:  
   `uvicorn server:app --host 0.0.0.0 --port 10000`
6. Add Environment Variables:
   - `LASTFM_API_KEY=your-key-here`
   - `MONGO_URI=your-mongodb-uri`

### Option 2: Railway
1. Go to [https://railway.app](https://railway.app)
2. New project → Deploy from GitHub
3. Set up same environment variables

---

## 🌐 After Deployment

- Frontend will be on: `https://your-vercel-app.vercel.app`
- Backend will be on: `https://your-backend.onrender.com/api`
