import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`https://your-backend-url/api/recommend?q=${query}`);
      setTracks(res.data.recommendations || []);
    } catch (err) {
      setError('Could not fetch recommendations.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 text-white p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">🎵 Music Discovery</h1>
        <input
          className="w-full p-2 text-black rounded mb-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a song or artist"
        />
        <button
          className="bg-white text-blue-600 font-bold py-2 px-4 rounded"
          onClick={handleSearch}
        >
          Search
        </button>

        {loading && <p className="mt-4">Loading...</p>}
        {error && <p className="mt-4 text-red-300">{error}</p>}

        <ul className="mt-4 space-y-2">
          {tracks.map((track, i) => (
            <li key={i} className="bg-white text-black p-2 rounded">
              <strong>{track.name}</strong> by {track.artist}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
