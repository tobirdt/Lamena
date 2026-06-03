import { AlertCircle, CheckCircle2, Mail, Send } from 'lucide-react'
import { type ChangeEvent, type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import type { ContactFormState } from '../types/content'

const emptyContactForm: ContactFormState = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  phone: '',
  message: '',
  consent: false,
  website: '',
}

export function ContactForm() {
  const [form, setForm] = useState<ContactFormState>(emptyContactForm)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [message, setMessage] = useState('')

  function updateField(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, type, value } = event.target
    const nextValue = type === 'checkbox' ? (event.target as HTMLInputElement).checked : value
    setForm((current) => ({ ...current, [name]: nextValue }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const payload = (await response.json().catch(() => ({}))) as { message?: string }
      if (!response.ok) {
        throw new Error(payload.message || 'The inquiry could not be sent.')
      }

      setStatus('sent')
      setMessage('Thank you. Your inquiry has been sent to Lamena.')
      setForm(emptyContactForm)
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'The inquiry could not be sent.')
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <Mail aria-hidden="true" />
        <div>
          <span>Website inquiry</span>
          <h3>Tell us about your project.</h3>
        </div>
      </div>

      <div className="form-grid">
        <label>
          First name
          <input name="firstName" value={form.firstName} onChange={updateField} autoComplete="given-name" required />
        </label>
        <label>
          Last name
          <input name="lastName" value={form.lastName} onChange={updateField} autoComplete="family-name" required />
        </label>
      </div>

      <label>
        Email
        <input name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" required />
      </label>

      <div className="form-grid">
        <label>
          Company
          <input name="company" value={form.company} onChange={updateField} autoComplete="organization" />
        </label>
        <label>
          Phone
          <input name="phone" value={form.phone} onChange={updateField} autoComplete="tel" />
        </label>
      </div>

      <label>
        Message
        <textarea name="message" value={form.message} onChange={updateField} rows={5} required />
      </label>

      <label className="consent-row">
        <input name="consent" type="checkbox" checked={form.consent} onChange={updateField} required />
        <span>
          I agree that Lamena may process this inquiry to respond to my request, in accordance with the{' '}
          <Link to="/privacy" className="consent-link" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      <label className="screen-reader-field" aria-hidden="true">
        Website
        <input name="website" value={form.website} onChange={updateField} tabIndex={-1} autoComplete="off" />
      </label>

      <button className="primary-button submit-button" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send inquiry'}
        <Send aria-hidden="true" />
      </button>

      <p className={`form-status ${status}`} aria-live="polite">
        {status === 'sent' && <CheckCircle2 aria-hidden="true" />}
        {status === 'error' && <AlertCircle aria-hidden="true" />}
        {message}
      </p>
    </form>
  )
}
