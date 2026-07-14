import { AlertCircle, ArrowLeft, CheckCircle2, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { EASE_OUT } from '../lib/motion'
import type { ContactFormState } from '../types/content'

const emptyContactForm: ContactFormState = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  phone: '',
  message: '',
  consent: false,
  xfield: '',
}

export function ContactForm() {
  const [form, setForm] = useState<ContactFormState>(emptyContactForm)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const successHeadingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (status === 'sent') successHeadingRef.current?.focus()
  }, [status])

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
      setMessage('')
      setForm(emptyContactForm)
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'The inquiry could not be sent.')
    }
  }

  if (status === 'sent') {
    return (
      <motion.div
        className="form-success"
        role="status"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
      >
        <CheckCircle2 aria-hidden="true" />
        <h3 ref={successHeadingRef} tabIndex={-1}>
          Inquiry sent.
        </h3>
        <p>Thank you — the right person at Lamena will follow up.</p>
        <button className="secondary-button secondary-button--surface" type="button" onClick={() => setStatus('idle')}>
          <ArrowLeft aria-hidden="true" />
          Send another inquiry
        </button>
      </motion.div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <span>Website inquiry</span>
        <h3>Tell us about your project.</h3>
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
          <span>
            Company <em>optional</em>
          </span>
          <input name="company" value={form.company} onChange={updateField} autoComplete="organization" />
        </label>
        <label>
          <span>
            Phone <em>optional</em>
          </span>
          <input name="phone" value={form.phone} onChange={updateField} autoComplete="tel" />
        </label>
      </div>

      <label>
        Message
        <textarea name="message" value={form.message} onChange={updateField} rows={4} required />
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
        Leave this field empty
        <input name="xfield" value={form.xfield} onChange={updateField} tabIndex={-1} autoComplete="off" />
      </label>

      <button className="primary-button submit-button" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send inquiry'}
        <Send aria-hidden="true" />
      </button>

      {/* Persistent live region — always in the DOM so screen readers
          reliably announce the error text when it is swapped in */}
      <p className={`form-status ${status}`} aria-live="polite" role="status">
        {message && status === 'error' && <AlertCircle aria-hidden="true" />}
        {message}
      </p>
    </form>
  )
}
