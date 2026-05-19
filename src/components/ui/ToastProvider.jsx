import { useCallback, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { CheckCircle2, AlertTriangle, Info, XCircle } from 'lucide-react'
import ToastContext from './toastContext.js'

const icons = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

const toneClasses = {
  success: 'border-brand-green-300 bg-brand-green-50 text-brand-green-800',
  error: 'border-brand-red-300 bg-brand-red-50 text-brand-red-800',
  warning: 'border-brand-yellow-300 bg-brand-yellow-50 text-brand-yellow-900',
  info: 'border-sky-300 bg-sky-50 text-sky-900',
}

function ToastContainer({ toasts, dismiss }) {
  if (typeof document === 'undefined') return null

  return createPortal(
    <div aria-live="polite" aria-atomic="true" className="fixed right-4 top-4 z-[95] flex w-full max-w-sm flex-col gap-2">
      {toasts.map((toast) => {
        const Icon = icons[toast.type] || Info
        return (
          <div
            key={toast.id}
            className={`rounded-xl border p-3 shadow-popover ${toneClasses[toast.type] || toneClasses.info}`}
            role="status"
          >
            <div className="flex items-start gap-2">
              <Icon className="mt-0.5 h-4 w-4" aria-hidden="true" />
              <div className="flex-1">
                {toast.title ? <p className="text-sm font-semibold">{toast.title}</p> : null}
                {toast.message ? <p className="text-xs">{toast.message}</p> : null}
              </div>
              <button
                type="button"
                className="text-xs font-semibold underline"
                onClick={() => dismiss(toast.id)}
              >
                Close
              </button>
            </div>
          </div>
        )
      })}
    </div>,
    document.body,
  )
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const push = useCallback((toast) => {
    const id = Math.random().toString(36).slice(2, 10)
    const next = { id, type: 'info', ...toast }

    setToasts((current) => [next, ...current].slice(0, 4))

    window.setTimeout(() => {
      dismiss(id)
    }, toast?.duration ?? 3500)

    return id
  }, [dismiss])

  const value = useMemo(() => ({
    push,
    success: (message, options = {}) => push({ type: 'success', message, ...options }),
    error: (message, options = {}) => push({ type: 'error', message, ...options }),
    warning: (message, options = {}) => push({ type: 'warning', message, ...options }),
    info: (message, options = {}) => push({ type: 'info', message, ...options }),
    dismiss,
  }), [push, dismiss])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  )
}
