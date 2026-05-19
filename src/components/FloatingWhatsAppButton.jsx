import { MessageCircle } from 'lucide-react'

const fallbackNumber = '94762718923'
const fallbackMessage =
  'Hello Nelna Farm team, I would like information about your products and business services.'

function sanitizeNumber(rawNumber) {
  return String(rawNumber || '')
    .replace(/[^\d]/g, '')
    .trim()
}

function FloatingWhatsAppButton() {
  const number = sanitizeNumber(import.meta.env.VITE_WHATSAPP_NUMBER || fallbackNumber)
  const presetMessage = import.meta.env.VITE_WHATSAPP_MESSAGE || fallbackMessage

  if (!number) {
    return null
  }

  const href = `https://wa.me/${number}?text=${encodeURIComponent(presetMessage)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group fixed bottom-5 right-4 z-40 inline-flex min-h-[52px] items-center gap-2 rounded-full bg-brand-green-600 px-4 py-3 text-sm font-bold text-white shadow-[0_16px_30px_-18px_rgba(39,116,58,0.95)] ring-1 ring-brand-green-300 transition hover:bg-brand-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow-300 sm:bottom-6 sm:right-6"
      aria-label="Chat with Nelna Farm on WhatsApp"
    >
      <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/22">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/30" aria-hidden="true" />
        <MessageCircle className="relative h-4 w-4" aria-hidden="true" />
      </span>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  )
}

export default FloatingWhatsAppButton
