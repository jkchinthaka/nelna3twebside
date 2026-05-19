# AI-Powered Nelna Product Finder

MVP implementation based on the provided SRS. Includes a React + Vite frontend and an Express backend with mock data and ranking logic.

## Structure

- frontend: React + TypeScript + Tailwind UI
- backend: Node.js + Express API

## Quick start

1. Backend

   - Copy backend/.env.example to backend/.env
   - Install dependencies and start the API:
     - npm install
     - npm run dev

2. Frontend

   - Install dependencies and start the UI:
     - npm install
     - npm run dev

The frontend expects the backend at [http://localhost:4000](http://localhost:4000). You can override with VITE_API_BASE.
To enable Google Maps embed, add VITE_GOOGLE_MAPS_KEY to a frontend .env file.

## API

POST /api/ai-search

```json
{
  "query": "Chicken sausages near Colombo",
  "userLocation": { "lat": 6.9271, "lng": 79.8612 }
}
```

## Notes

- This MVP uses mock data instead of MongoDB and OpenAI embeddings.
- Add MongoDB Atlas + OpenAI to activate real semantic search and geospatial ranking.
