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
      className="group fixed bottom-[4.5rem] right-3 z-fab inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-full bg-brand-green-600 px-3 py-2.5 text-sm font-bold text-white shadow-card transition hover:bg-brand-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow-400 focus-visible:ring-offset-2 sm:bottom-6 sm:right-5 sm:min-h-[48px] sm:px-4 motion-reduce:transition-none"
      aria-label="Chat with Nelna Farm on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  )
}

export default FloatingWhatsAppButton
