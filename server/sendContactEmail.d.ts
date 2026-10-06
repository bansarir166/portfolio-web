export class ContactEmailError extends Error {
  statusCode: number
  constructor(message: string, statusCode?: number)
}

export function sendContactEmail(body: unknown): Promise<void>
