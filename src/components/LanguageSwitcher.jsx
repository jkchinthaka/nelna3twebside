import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'si', label: 'සි' },
  { code: 'ta', label: 'த' },
]

function LanguageSwitcher({ className = "" }) {
  const { i18n } = useTranslation()
  const current = i18n.language || 'en'

  return (
    <div className={`flex items-center gap-1 rounded-full border border-current/20 bg-current/5 p-1 text-[10px] md:text-xs backdrop-blur-sm ${className}`}>
      {languages.map((lang) => {
         const isActive = current.startsWith(lang.code);
         return (
            <button
              key={lang.code}
              onClick={() => i18n.changeLanguage(lang.code)}
              type="button"
              className={`relative z-10 rounded-full px-2.5 py-1 font-bold transition-colors duration-300 ${
                isActive
                  ? 'text-brand-900 pointer-events-none'
                  : 'text-current opacity-100'
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="lang-pill"
                  className="absolute inset-0 z-[-1] rounded-full bg-nelna-white shadow-sm"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {lang.label}
            </button>
         )
      })}
    </div>
  )
}

export default LanguageSwitcher
