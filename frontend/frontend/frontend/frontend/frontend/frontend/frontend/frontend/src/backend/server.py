from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import os

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

LASTFM_API_KEY = os.getenv("LASTFM_API_KEY")

class Query(BaseModel):
    q: str

@app.get("/api/recommend")
async def recommend(q: str):
    async with httpx.AsyncClient() as client:
        # Last.fm API: Get similar tracks
        url = f"https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&track={q}&api_key={LASTFM_API_KEY}&format=json"
        r = await client.get(url)
        try:
            data = r.json()
            if "similartracks" in data:
                recommendations = data["similartracks"]["track"]
                return {
                    "status": "success",
                    "recommendations": [
                        {"name": t["name"], "artist": t["artist"]["name"]}
                        for t in recommendations[:10]
                    ],
                }
            else:
                return {"status": "empty", "recommendations": []}
        except:
            return {"status": "error", "recommendations": []}
