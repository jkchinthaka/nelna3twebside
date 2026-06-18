import { useEffect } from 'react'

function upsertMeta(name, content) {
  if (!content) return
  let tag = document.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function upsertProperty(property, content) {
  if (!content) return
  let tag = document.querySelector(`meta[property="${property}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('property', property)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (!href) return
  let tag = document.querySelector(`link[rel="${rel}"]`)
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    document.head.appendChild(tag)
  }
  tag.setAttribute('href', href)
}

function upsertAlternateLink(hreflang, href) {
  if (!hreflang || !href) return
  let tag = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`)
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', 'alternate')
    tag.setAttribute('hreflang', hreflang)
    document.head.appendChild(tag)
  }
  tag.setAttribute('href', href)
}

function upsertJsonLd(schema) {
  if (!schema) return
  let tag = document.querySelector('script[data-jsonld="true"]')
  if (!tag) {
    tag = document.createElement('script')
    tag.type = 'application/ld+json'
    tag.setAttribute('data-jsonld', 'true')
    document.head.appendChild(tag)
  }
  tag.textContent = JSON.stringify(schema)
}

function withLanguageParam(urlString, language) {
  try {
    const url = new URL(urlString)
    url.searchParams.set('lang', language)
    return url.toString()
  } catch {
    return urlString
  }
}

function SEO({ title, description, keywords, image, canonical, schema, siteName, locale, hreflangs }) {
  useEffect(() => {
    if (title) document.title = title
    upsertMeta('description', description)
    upsertMeta('keywords', keywords)
    upsertProperty('og:title', title)
    upsertProperty('og:description', description)
    upsertProperty('og:image', image)
    upsertProperty('og:url', canonical)
    upsertProperty('og:site_name', siteName)
    upsertProperty('og:locale', locale)
    upsertMeta('twitter:card', image ? 'summary_large_image' : 'summary')
    upsertMeta('twitter:title', title)
    upsertMeta('twitter:description', description)
    upsertMeta('twitter:image', image)
    upsertProperty('og:type', 'website')
    upsertLink('canonical', canonical)

    const alternates = hreflangs || {
      en: withLanguageParam(canonical, 'en'),
      si: withLanguageParam(canonical, 'si'),
      ta: withLanguageParam(canonical, 'ta'),
    }

    Object.entries(alternates).forEach(([language, href]) => {
      upsertAlternateLink(language, href)
    })
    upsertAlternateLink('x-default', canonical)

    upsertJsonLd(schema)
  }, [title, description, keywords, image, canonical, schema, siteName, locale, hreflangs])

  return null
}

export default SEO
