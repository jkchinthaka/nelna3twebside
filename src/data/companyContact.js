export const COMPANY_NAME = 'Nelna Farm (Pvt) Ltd'

export const COMPANY_ADDRESS_LINES = [
  'Nelna Farm (Pvt) Ltd',
  'No 03A, Hathduwa Estate,',
  'Ranwala, Meethirigala',
]

export const COMPANY_ADDRESS_FULL =
  'Nelna Farm (Pvt) Ltd, No 03A, Hathduwa Estate, Ranwala, Meethirigala'

export const COMPANY_LOCATION_SHORT = 'Meethirigala, Sri Lanka'

export const TELEPHONES = [
  { display: '0112-405091', tel: '+94112405091' },
  { display: '0112-405092', tel: '+94112405092' },
  { display: '0112-405094', tel: '+94112405094' },
]

export const MOBILE = {
  display: '0777774029',
  tel: '+94777774029',
  whatsapp: '94777774029',
}

export const PRIMARY_PHONE = TELEPHONES[0]

export const TELEPHONES_DISPLAY_INLINE = TELEPHONES.map((item) => item.display).join(' / ')

export const MAP_LINK =
  'https://maps.google.com/?q=No+03A,+Hathduwa+Estate,+Ranwala,+Meethirigala'

export const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12666.529853758257!2d80.1234567!3d7.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae300c30985474d%3A0x62957754388373!2sNelna%20Agri%20Development%20(Pvt)%20Ltd!5e0!3m2!1sen!2slk!4v1625637258000!5m2!1sen!2slk'

export const NOTIFICATION_EMAIL = 'info@nelna.lk'

export const PHONE_CONTACT_GROUPS = [
  { prefix: 'Tel', numbers: TELEPHONES },
  { prefix: 'Mobile', numbers: [MOBILE] },
]

export function getWhatsAppHref(message) {
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${MOBILE.whatsapp}${text}`
}

export function getOrganizationSchema(siteUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY_NAME,
    legalName: COMPANY_NAME,
    url: siteUrl,
    description:
      'Premium poultry and frozen food with strict quality, safety, and sustainability standards.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'No 03A, Hathduwa Estate, Ranwala',
      addressLocality: 'Meethirigala',
      addressCountry: 'LK',
    },
    telephone: [...TELEPHONES.map((item) => item.tel), MOBILE.tel],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: MOBILE.tel,
      contactType: 'customer service',
      areaServed: 'LK',
      availableLanguage: ['en', 'si', 'ta'],
    },
  }
}

export function getDefaultContactSettings() {
  return {
    locationTitle: 'Our Location',
    addressLines: [...COMPANY_ADDRESS_LINES],
    mapEmbedUrl: MAP_EMBED_URL,
    mapLink: MAP_LINK,
    directionsLabel: 'Get Directions',
    phoneTitle: 'Phone Support',
    phoneNumbers: [
      `Tel: ${TELEPHONES_DISPLAY_INLINE}`,
      `Mobile: ${MOBILE.display}`,
    ],
    emailTitle: 'Email',
    emails: ['info@nelna.lk', 'sales@nelna.lk'],
    hoursTitle: 'Working Hours',
    workingHours: ['Mon - Fri: 8:00 AM - 5:00 PM', 'Sat: 8:00 AM - 12:00 PM'],
  }
}
