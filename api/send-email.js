import { ContactEmailError, sendContactEmail } from '../server/sendContactEmail.js'

function isConfigured() {
  return Boolean(
    process.env.BREVO_API_KEY?.trim() &&
      process.env.BREVO_SENDER_EMAIL?.trim() &&
      process.env.BREVO_RECEIVER_EMAIL?.trim(),
  )
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ ok: true, configured: isConfigured() })
    return
  }

  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' })
    return
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    await sendContactEmail(body ?? {})
    res.status(200).json({ ok: true })
  } catch (error) {
    if (error instanceof SyntaxError) {
      res.status(400).json({ message: 'Invalid request.' })
      return
    }
    const statusCode = error instanceof ContactEmailError ? error.statusCode : 500
    const message =
      error instanceof ContactEmailError ? error.message : 'Failed to send email.'
    if (!(error instanceof ContactEmailError)) {
      console.error('Contact email failed:', error)
    }
    res.status(statusCode).json({ message })
  }
}
