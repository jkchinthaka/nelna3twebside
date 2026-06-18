import { Search, X } from 'lucide-react'
import IconButton from './IconButton.jsx'
import { cn } from '../../lib/cn.js'

function SearchBar({ value, onChange, placeholder = 'Search...', onClear, className, inputClassName }) {
  return (
    <div className={cn('relative', className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-nelna-dark/60" aria-hidden="true" />
      <input
        type="search"
        autoComplete="off"
        enterKeyHint="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn('field-base pl-9 pr-10', inputClassName)}
        aria-label={placeholder}
      />
      {value ? (
        <IconButton
          className="absolute right-1.5 top-1/2 h-8 w-8 -translate-y-1/2 border-none bg-transparent shadow-none"
          label="Clear search"
          onClick={onClear}
          size="sm"
        >
          <X className="h-4 w-4" />
        </IconButton>
      ) : null}
    </div>
  )
}

export default SearchBar
