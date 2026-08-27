import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vercel runs everything in /api as serverless functions in production, but the
// Vite dev server knows nothing about them — so /api/chat would 404 locally.
// This mounts the same handler as dev middleware, giving it the small slice of
// the Node req/res API the handler actually uses.
function apiRoutes() {
  return {
    name: 'dev-api-routes',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res, next) => {
        if (!req.url.startsWith('/')) return next()
        try {
          const { default: handler } = await server.ssrLoadModule('/api/chat.js')

          const chunks = []
          for await (const chunk of req) chunks.push(chunk)
          req.body = chunks.length ? Buffer.concat(chunks).toString('utf8') : ''

          res.status = (code) => {
            res.statusCode = code
            return res
          }
          res.json = (payload) => {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(payload))
            return res
          }

          await handler(req, res)
        } catch (err) {
          server.config.logger.error(`[dev-api] ${err.stack || err}`)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'server_error' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiRoutes()],
  server: {
    port: 3000,
    strictPort: true,
  },
})
