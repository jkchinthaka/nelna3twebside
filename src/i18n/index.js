import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'

const supportedLngs = ['en']
const namespaces = ['common', 'home', 'products', 'contact', 'faq', 'admin']

i18n
  .use(
    resourcesToBackend((language, namespace) =>
      import(`./locales/${language}/${namespace}.json`)
    )
  )
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs,
    ns: namespaces,
    defaultNS: 'common',
    fallbackNS: 'common',
    returnNull: false,
    react: { useSuspense: false },
    interpolation: { escapeValue: false },
  })

i18n.on('languageChanged', (language) => {
  if (typeof document === 'undefined') return
  const normalized = String(language || 'en').split('-')[0]
  if (normalized === 'en') {
    document.documentElement.lang = normalized
  }
})

if (typeof document !== 'undefined') {
  document.documentElement.lang = 'en'
}

export default i18n
