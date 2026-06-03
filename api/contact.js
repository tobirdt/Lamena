import { Resend } from 'resend'

const toEmail = process.env.CONTACT_TO_EMAIL || 'holger@rumscheidt.de'
const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Lamena Website <website@lamena.ae>'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function clean(value, limit = 1000) {
  return String(value || '').trim().slice(0, limit)
}

function escapeHtml(value) {
  return clean(value, 5000)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function formatRow(label, value) {
  if (!value) return ''
  return `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #ece7f4;color:#6f4d92;font-weight:700;width:170px;">${label}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #ece7f4;color:#17151d;">${escapeHtml(value)}</td>
    </tr>
  `
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method not allowed.' })
  }

  let body = {}
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
  } catch {
    return res.status(400).json({ message: 'Invalid request body.' })
  }

  if (clean(body.website)) {
    return res.status(200).json({ ok: true })
  }

  const firstName = clean(body.firstName, 80)
  const lastName = clean(body.lastName, 80)
  const email = clean(body.email, 160)
  const company = clean(body.company, 160)
  const phone = clean(body.phone, 80)
  const message = clean(body.message, 3000)
  const consent = Boolean(body.consent)

  if (!firstName || !lastName || !email || !message || !consent) {
    return res.status(400).json({ message: 'Please complete all required fields.' })
  }

  if (!emailPattern.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' })
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ message: 'Email service is not configured yet.' })
  }

  const fullName = `${firstName} ${lastName}`.trim()
  const resend = new Resend(process.env.RESEND_API_KEY)
  const submittedAt = new Date().toISOString()

  try {
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `New Lamena website inquiry from ${fullName}`,
      text: [
        'New Lamena website inquiry',
        '',
        `Name: ${fullName}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : '',
        phone ? `Phone: ${phone}` : '',
        `Submitted at: ${submittedAt}`,
        '',
        'Message:',
        message,
      ]
        .filter(Boolean)
        .join('\n'),
      html: `
        <div style="margin:0;padding:28px;background:#fbfaff;font-family:Inter,Arial,sans-serif;color:#17151d;">
          <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e5deef;border-radius:10px;overflow:hidden;">
            <div style="padding:28px 30px;background:#17151d;color:#ffffff;">
              <div style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#bda7d6;">Lamena website</div>
              <h1 style="margin:10px 0 0;font-size:24px;line-height:1.25;">New inquiry received</h1>
            </div>
            <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
              ${formatRow('Name', fullName)}
              ${formatRow('Email', email)}
              ${formatRow('Company', company)}
              ${formatRow('Phone', phone)}
              ${formatRow('Submitted at', submittedAt)}
            </table>
            <div style="padding:26px 30px;">
              <div style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#6f4d92;font-weight:700;">Message</div>
              <p style="white-space:pre-wrap;margin:12px 0 0;line-height:1.65;">${escapeHtml(message)}</p>
            </div>
          </div>
        </div>
      `,
    })

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Lamena contact email failed', error)
    return res.status(500).json({ message: 'The inquiry could not be sent. Please try again later.' })
  }
}
