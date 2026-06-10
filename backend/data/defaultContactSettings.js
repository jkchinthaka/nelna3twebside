const DEFAULT_ADDRESS_LINES = [
  'Nelna Farm (Pvt) Ltd',
  'No 03A, Hathduwa Estate,',
  'Ranwala, Meethirigala',
];

const DEFAULT_PHONE_NUMBERS = [
  'Tel: 0112-405091 / 0112-405092 / 0112-405094',
  'Mobile: 0777774029',
];

export function getDefaultContactSettings() {
  return {
    companyName: 'Nelna Farm (Pvt) Ltd',
    address: 'No 03A, Hathduwa Estate, Ranwala, Meethirigala',
    phones: ['0112-405091', '0112-405092', '0112-405094'],
    mobile: '0777774029',
    whatsapp: 'https://wa.me/94777774029',
    locationTitle: 'Our Location',
    addressLines: DEFAULT_ADDRESS_LINES,
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12666.529853758257!2d80.1234567!3d7.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae300c30985474d%3A0x62957754388373!2sNelna%20Agri%20Development%20(Pvt)%20Ltd!5e0!3m2!1sen!2slk!4v1625637258000!5m2!1sen!2slk',
    mapLink: 'https://maps.google.com/?q=No+03A,+Hathduwa+Estate,+Ranwala,+Meethirigala',
    directionsLabel: 'Get Directions',
    phoneTitle: 'Phone Support',
    phoneNumbers: DEFAULT_PHONE_NUMBERS,
    emailTitle: 'Email',
    emails: ['info@nelna.lk', 'sales@nelna.lk'],
    hoursTitle: 'Working Hours',
    workingHours: ['Mon - Fri: 8:00 AM - 5:00 PM', 'Sat: 8:00 AM - 12:00 PM'],
  };
}

export function mapContactSettingsDoc(doc) {
  const defaults = getDefaultContactSettings();
  if (!doc) {
    return defaults;
  }

  const plain = typeof doc.toObject === 'function' ? doc.toObject() : doc;

  return {
    ...defaults,
    locationTitle: plain.locationTitle || defaults.locationTitle,
    addressLines: Array.isArray(plain.addressLines) && plain.addressLines.length
      ? plain.addressLines
      : defaults.addressLines,
    mapEmbedUrl: plain.mapEmbedUrl || defaults.mapEmbedUrl,
    mapLink: plain.mapLink || defaults.mapLink,
    directionsLabel: plain.directionsLabel || defaults.directionsLabel,
    phoneTitle: plain.phoneTitle || defaults.phoneTitle,
    phoneNumbers: Array.isArray(plain.phoneNumbers) && plain.phoneNumbers.length
      ? plain.phoneNumbers
      : defaults.phoneNumbers,
    emailTitle: plain.emailTitle || defaults.emailTitle,
    emails: Array.isArray(plain.emails) && plain.emails.length ? plain.emails : defaults.emails,
    hoursTitle: plain.hoursTitle || defaults.hoursTitle,
    workingHours: Array.isArray(plain.workingHours) && plain.workingHours.length
      ? plain.workingHours
      : defaults.workingHours,
  };
}
