import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT ?? 3001

app.use(cors({ origin: process.env.FRONTEND_URL ?? 'http://localhost:5173' }))
app.use(express.json())

// The Privy App Secret is loaded from the server-side environment variables.
// It is NEVER exposed to the frontend.
const PRIVY_APP_SECRET = process.env.PRIVY_APP_SECRET

if (!PRIVY_APP_SECRET) {
  console.error('PRIVY_APP_SECRET is not set. See server/.env.example.')
  process.exit(1)
}

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

// Server-side wallet operations using the app secret
// These endpoints should only be called by your backend logic,
// never directly from the frontend with sensitive data.

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
