import { useMemo } from 'react'
import { Upload, FileText } from 'lucide-react'
import { cn } from '../../lib/cn.js'

function formatSize(bytes) {
  if (!bytes && bytes !== 0) return ''
  if (bytes < 1024) return `${bytes} B`
  const kb = bytes / 1024
  if (kb < 1024) return `${kb.toFixed(1)} KB`
  const mb = kb / 1024
  return `${mb.toFixed(1)} MB`
}

function FileUpload({
  id,
  label,
  hint,
  error,
  file,
  maxSizeMb = 10,
  accept,
  onChange,
  className,
}) {
  const maxBytes = useMemo(() => maxSizeMb * 1024 * 1024, [maxSizeMb])

  const handleChange = (event) => {
    const nextFile = event.target.files?.[0] || null
    if (nextFile && nextFile.size > maxBytes) {
      onChange?.({ file: null, error: `File exceeds ${maxSizeMb} MB limit.` })
      return
    }
    onChange?.({ file: nextFile, error: '' })
  }

  return (
    <div className={cn('space-y-1.5', className)}>
      {label ? <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-200">{label}</label> : null}
      <label
        htmlFor={id}
        className={cn(
          'flex min-h-[44px] cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 transition hover:border-brand-green-400 hover:bg-brand-green-50/30 dark:bg-slate-900 dark:text-slate-200',
          error ? 'border-brand-red-500' : '',
        )}
      >
        <Upload className="h-4 w-4 text-brand-green-600" aria-hidden="true" />
        <span>{file ? 'Replace file' : 'Choose file'}</span>
        <input id={id} type="file" className="sr-only" accept={accept} onChange={handleChange} />
      </label>
      {file ? (
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          <FileText className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{file.name}</span>
          <span className="text-slate-500">{formatSize(file.size)}</span>
        </div>
      ) : null}
      {hint ? <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p> : null}
      {error ? <p className="text-xs font-medium text-brand-red-600">{error}</p> : null}
    </div>
  )
}

export default FileUpload
