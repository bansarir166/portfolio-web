import dotenv from 'dotenv'

function loadEnv() {
  // On Vercel, env vars come from the project settings. Do not let a missing
  // local .env file overwrite them.
  if (process.env.VERCEL) return
  dotenv.config({ override: true })
}

loadEnv()

const MAX_LENGTH = {
  name: 100,
  email: 200,
  subject: 200,
  message: 5000,
}

export class ContactEmailError extends Error {
  /**
   * @param {string} message
   * @param {number} [statusCode]
   */
  constructor(message, statusCode = 500) {
    super(message)
    this.name = 'ContactEmailError'
    this.statusCode = statusCode
  }
}

/**
 * @param {unknown} value
 * @param {number} max
 * @param {string} label
 * @param {boolean} singleLine
 */
function requiredText(value, max, label, singleLine) {
  if (typeof value !== 'string') {
    throw new ContactEmailError(`${label} is required.`, 400)
  }
  const text = (singleLine ? value.replace(/[\r\n]+/g, ' ') : value).trim()
  if (!text) throw new ContactEmailError(`${label} is required.`, 400)
  if (text.length > max) {
    throw new ContactEmailError(`${label} is too long.`, 400)
  }
  return text
}

/**
 * @param {string} value
 */
function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

/**
 * @param {unknown} body
 */
export async function sendContactEmail(body) {
  const input = body && typeof body === 'object' ? body : {}
  const name = requiredText(
    /** @type {{ name?: unknown }} */ (input).name,
    MAX_LENGTH.name,
    'Name',
    true,
  )
  const email = requiredText(
    /** @type {{ email?: unknown }} */ (input).email,
    MAX_LENGTH.email,
    'Email',
    true,
  )
  const subject = requiredText(
    /** @type {{ subject?: unknown }} */ (input).subject,
    MAX_LENGTH.subject,
    'Subject',
    true,
  )
  const message = requiredText(
    /** @type {{ message?: unknown }} */ (input).message,
    MAX_LENGTH.message,
    'Message',
    false,
  )

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new ContactEmailError('Enter a valid email address.', 400)
  }

  loadEnv()
  const apiKey = readApiKey()
  const from = process.env.BREVO_SENDER_EMAIL?.trim()
  const to = process.env.BREVO_RECEIVER_EMAIL?.trim()

  if (!apiKey || !from || !to) {
    throw new ContactEmailError('Email is not configured.', 500)
  }

  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeMessage = escapeHtml(message).replaceAll('\n', '<br />')

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({
      sender: { name: 'Portfolio contact', email: from },
      to: [{ email: to }],
      replyTo: { email, name },
      subject: `${name}: ${subject}`,
      textContent: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      htmlContent: `<p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p>${safeMessage}</p>`,
    }),
  })

  if (!response.ok) {
    const detail = await response.text()
    console.error('Brevo API error:', response.status, detail)
    throw new ContactEmailError(brevoErrorMessage(response.status, detail), 500)
  }
}

function readApiKey() {
  let key = process.env.BREVO_API_KEY?.trim() ?? ''
  const prefix = 'BREVO_API_KEY='
  if (key.startsWith(prefix)) key = key.slice(prefix.length).trim()
  return key
}

/**
 * @param {number} status
 * @param {string} detail
 */
function brevoErrorMessage(status, detail) {
  if (status === 401) return 'Brevo rejected the API key.'
  if (/sender/i.test(detail)) {
    return 'Brevo rejected the sender address. Verify it in the Brevo dashboard.'
  }
  return 'Failed to send email.'
}
