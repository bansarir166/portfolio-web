import { defineConfig, type Connect, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ContactEmailError, sendContactEmail } from './server/sendContactEmail.js'

const root = path.dirname(fileURLToPath(import.meta.url))

function readJson(req: Connect.IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    let size = 0
    req.on('data', (chunk: Buffer) => {
      size += chunk.length
      if (size > 20_000) {
        reject(new ContactEmailError('Message is too large.', 413))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8')
      if (!raw) {
        resolve({})
        return
      }
      try {
        resolve(JSON.parse(raw))
      } catch {
        reject(new ContactEmailError('Invalid request.', 400))
      }
    })
    req.on('error', reject)
  })
}

function contactApi(): Plugin {
  const middleware: Connect.NextHandleFunction = async (req, res, next) => {
    const url = req.url?.split('?')[0]
    if (url !== '/api/send-email') {
      next()
      return
    }
    if (req.method !== 'POST') {
      res.statusCode = 405
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ message: 'Method not allowed' }))
      return
    }

    try {
      await sendContactEmail(await readJson(req))
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ ok: true }))
    } catch (error) {
      const statusCode = error instanceof ContactEmailError ? error.statusCode : 500
      const message =
        error instanceof ContactEmailError ? error.message : 'Failed to send email.'
      if (!(error instanceof ContactEmailError)) console.error(error)
      res.statusCode = statusCode
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ message }))
    }
  }

  return {
    name: 'contact-api',
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), contactApi()],
  resolve: {
    alias: {
      '@': path.resolve(root, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/framer-motion')) return 'motion'
          if (id.includes('node_modules/react-icons')) return 'icons'
        },
      },
    },
  },
})
