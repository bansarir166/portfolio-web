import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { ContactEmailError, sendContactEmail } from './sendContactEmail.js'

const root = path.dirname(fileURLToPath(import.meta.url))
const app = express()

app.use(express.json({ limit: '20kb' }))

app.post('/api/send-email', async (req, res) => {
  try {
    await sendContactEmail(req.body)
    res.json({ ok: true })
  } catch (error) {
    const statusCode = error instanceof ContactEmailError ? error.statusCode : 500
    const message =
      error instanceof ContactEmailError ? error.message : 'Failed to send email.'
    if (statusCode >= 500 && !(error instanceof ContactEmailError)) {
      console.error('Contact email failed:', error)
    }
    res.status(statusCode).json({ message })
  }
})

const dist = path.resolve(root, '../dist')
app.use(express.static(dist))
app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    next()
    return
  }
  res.sendFile(path.join(dist, 'index.html'), (error) => {
    if (error) next()
  })
})

const port = Number(process.env.PORT || 4173)
app.listen(port, () => {
  console.log(`Portfolio server listening on http://localhost:${port}`)
})
