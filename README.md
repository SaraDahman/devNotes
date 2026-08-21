# devNotes

A full-stack note-taking application with folders, rich text editing, and favorites.

## Tech Stack

**Client:** React 19, Vite, Tailwind CSS v4, shadcn/ui, TanStack Query, React Router v7, React Quill (rich text)

**Server:** Express 5, PostgreSQL, pg

**DevOps:** Docker (PostgreSQL), Render (deployment)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Docker (for local PostgreSQL)

### Setup

1. Start the database:

```bash
docker compose up -d
```

2. Install dependencies and run migrations:

```bash
cd server && pnpm install && pnpm migrate
cd ../client && pnpm install
```

3. Create a `.env` file in `server/`:

```
NODE_ENV=development
PORT=5001
DB_HOST=localhost
DB_PORT=5433
DB_NAME=devnotes
DB_USER=sara
DB_PASSWORD=postgres
```

4. Create a `.env` file in `client/`:

```
VITE_API_URL=http://localhost:5001/api
```

5. Start development servers:

```bash
# Terminal 1 - server
cd server && pnpm dev

# Terminal 2 - client
cd client && pnpm dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server (with hot reload) |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm migrate` | Run database migrations |
| `pnpm lint` | Lint client code |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/folders` | List all folders |
| POST | `/api/folders` | Create a folder |
| DELETE | `/api/folders/:id` | Delete a folder |
| GET | `/api/notes` | List notes (query: `folderId`, `favorite`) |
| GET | `/api/notes/other` | List notes with no folder |
| GET | `/api/notes/:id` | Get a note |
| POST | `/api/notes` | Create a note |
| PATCH | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |

## Project Structure

```
devNotes/
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/            # Axios API functions
│   │   ├── components/     # UI components
│   │   ├── context/        # React contexts
│   │   ├── hooks/          # TanStack Query hooks
│   │   ├── layouts/        # App layout
│   │   ├── lib/            # Utilities
│   │   ├── pages/          # Route pages
│   │   └── index.css       # Tailwind + global styles
│   └── public/
├── server/                 # Express backend
│   ├── src/
│   │   ├── config/         # Environment config
│   │   ├── controllers/    # Route handlers
│   │   ├── db/             # PostgreSQL pool
│   │   ├── middleware/      # Error handling
│   │   ├── migrations/     # SQL migrations
│   │   ├── repositories/   # Database queries
│   │   ├── routes/         # Express routes
│   │   ├── scripts/        # Migration runner
│   │   └── services/       # Business logic
│   └── .env
└── docker-compose.yaml     # PostgreSQL container
```

## Deployment

Deployed on [Render](https://render.com):

- **Client:** Static Site
- **Server:** Web Service
- **Database:** Render PostgreSQL
