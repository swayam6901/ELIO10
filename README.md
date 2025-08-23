# ELI10 Advanced Frontend


## Prereqs
- Node 18+


## Setup
npm install
npm run dev


Configure `.env.local` with `BACKEND_URL` pointing to your Express/Render/Railway backend providing `/api/explain`.


## Features
- Debounced search
- All Levels mode (parallel requests)
- Interactive Mindmap (2D force graph)
- Copy & Download actions
- Dark mode toggle (persist via browser theme if you want)


## Notes
- This app assumes the backend returns the **exact JSON** per your contract. For All Levels, frontend fan-outs 3 calls.
