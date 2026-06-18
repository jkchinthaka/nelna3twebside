import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import IconButton from './IconButton.jsx'

function Drawer({ open, side = 'right', title, onClose, children, footer }) {
  useEffect(() => {
    if (!open) return undefined

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose?.()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const placement = side === 'left' ? 'left-0' : 'right-0'

  return createPortal(
    <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-label={title || 'Drawer'}>
      <button type="button" className="absolute inset-0 bg-nelna-dark/50" onClick={onClose} aria-label="Close drawer" />
      <aside className={`absolute ${placement} top-0 h-full w-full max-w-md border-l border-nelna-dark-soft bg-nelna-white p-5 shadow-modal dark:border-nelna-green-dark dark:bg-nelna-dark`}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-nelna-dark dark:text-nelna-white">{title}</h3>
          <IconButton label="Close drawer" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </IconButton>
        </div>
        <div className="h-[calc(100%-112px)] overflow-y-auto pr-1">{children}</div>
        {footer ? <div className="mt-4 border-t border-nelna-dark-soft pt-3 dark:border-nelna-green-dark">{footer}</div> : null}
      </aside>
    </div>,
    document.body,
  )
}

export default Drawer
