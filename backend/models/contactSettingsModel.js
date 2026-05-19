import mongoose from 'mongoose';

const contactSettingsSchema = new mongoose.Schema(
  {
    locationTitle: { type: String, default: 'Our Location' },
    addressLines: { type: [String], default: ['No. 45, Nelna Mawatha,', 'Wansawila, Meethirigala,', 'Sri Lanka.'] },
    mapEmbedUrl: {
      type: String,
      default:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12666.529853758257!2d80.1234567!3d7.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae300c30985474d%3A0x62957754388373!2sNelna%20Agri%20Development%20(Pvt)%20Ltd!5e0!3m2!1sen!2slk!4v1625637258000!5m2!1sen!2slk',
    },
    mapLink: {
      type: String,
      default: 'https://maps.google.com/?q=Nelna+Farm,+Meethirigala',
    },
    phoneTitle: { type: String, default: 'Phone Support' },
    phoneNumbers: { type: [String], default: ['+94 37 222 4567', '+94 77 123 4567'] },
    emailTitle: { type: String, default: 'Email' },
    emails: { type: [String], default: ['info@nelna.lk', 'sales@nelna.lk'] },
    hoursTitle: { type: String, default: 'Working Hours' },
    workingHours: { type: [String], default: ['Mon - Fri: 8:00 AM - 5:00 PM', 'Sat: 8:00 AM - 12:00 PM'] },
    directionsLabel: { type: String, default: 'Get Directions' },
  },
  { timestamps: true }
);

const ContactSettings = mongoose.model('ContactSettings', contactSettingsSchema);

export default ContactSettings;
