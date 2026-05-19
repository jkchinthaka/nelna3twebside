import { useCallback, useEffect, useState } from 'react'
import AdminShell from '../../components/AdminShell.jsx'
import { getContactSettings, updateContactSettings } from '../../services/contactSettingsService.js'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  ErrorState,
  Input,
  Skeleton,
  Textarea,
  useToast,
} from '../../components/ui/index.js'

const emptyState = {
  locationTitle: '',
  addressLines: [],
  mapEmbedUrl: '',
  mapLink: '',
  directionsLabel: '',
  phoneTitle: '',
  phoneNumbers: [],
  emailTitle: '',
  emails: [],
  hoursTitle: '',
  workingHours: [],
}

const splitLines = (value) =>
  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

function ContactSettings() {
  const toast = useToast()
  const [settings, setSettings] = useState(emptyState)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const mapServerStateToForm = useCallback((data = {}) => ({
    ...emptyState,
    ...data,
    addressLinesText: (data.addressLines || []).join('\n'),
    phoneNumbersText: (data.phoneNumbers || []).join('\n'),
    emailsText: (data.emails || []).join('\n'),
    workingHoursText: (data.workingHours || []).join('\n'),
  }), [])

  const loadSettings = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getContactSettings()
      setSettings(mapServerStateToForm(data))
    } catch (err) {
      setError(err.message || 'Failed to load contact settings')
    } finally {
      setLoading(false)
    }
  }, [mapServerStateToForm])

  useEffect(() => {
    loadSettings()
  }, [loadSettings])

  const handleTextChange = (field) => (event) => {
    setSettings((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')
    try {
      const {
        addressLinesText,
        phoneNumbersText,
        emailsText,
        workingHoursText,
        ...rest
      } = settings

      const payload = {
        ...rest,
        addressLines: splitLines(addressLinesText || settings.addressLines?.join('\n') || ''),
        phoneNumbers: splitLines(phoneNumbersText || settings.phoneNumbers?.join('\n') || ''),
        emails: splitLines(emailsText || settings.emails?.join('\n') || ''),
        workingHours: splitLines(workingHoursText || settings.workingHours?.join('\n') || ''),
      }

      const updated = await updateContactSettings(payload)
      setSettings(mapServerStateToForm(updated))
      toast.success('Contact settings updated successfully.')
    } catch (err) {
      setError(err.message || 'Failed to update contact settings')
      toast.error('Failed to update contact settings.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminShell
      title="Contact & Location"
      subtitle="Update the Find Us section and all public contact details from one place."
    >
      {error ? (
        <ErrorState
          title="Unable to load settings"
          description={error}
          retryLabel="Retry"
          onRetry={loadSettings}
        />
      ) : null}

      {loading ? (
        <section className="grid gap-4 lg:grid-cols-2">
          <Skeleton className="h-[560px]" />
          <Skeleton className="h-[560px]" />
        </section>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Find Us</CardTitle>
            </CardHeader>
            <CardBody className="space-y-3">
              <Input
                label="Location title"
                value={settings.locationTitle || ''}
                onChange={handleTextChange('locationTitle')}
              />

              <Textarea
                label="Address lines (one per line)"
                rows={4}
                value={settings.addressLinesText || settings.addressLines?.join('\n') || ''}
                onChange={handleTextChange('addressLinesText')}
              />

              <Input
                label="Map embed URL"
                value={settings.mapEmbedUrl || ''}
                onChange={handleTextChange('mapEmbedUrl')}
              />

              <Input
                label="Map link (Open in Maps)"
                value={settings.mapLink || ''}
                onChange={handleTextChange('mapLink')}
              />

              <Input
                label="Directions button label"
                value={settings.directionsLabel || ''}
                onChange={handleTextChange('directionsLabel')}
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Details</CardTitle>
            </CardHeader>
            <CardBody className="space-y-3">
              <Input
                label="Phone title"
                value={settings.phoneTitle || ''}
                onChange={handleTextChange('phoneTitle')}
              />

              <Textarea
                label="Phone numbers (one per line)"
                rows={3}
                value={settings.phoneNumbersText || settings.phoneNumbers?.join('\n') || ''}
                onChange={handleTextChange('phoneNumbersText')}
              />

              <Input
                label="Email title"
                value={settings.emailTitle || ''}
                onChange={handleTextChange('emailTitle')}
              />

              <Textarea
                label="Emails (one per line)"
                rows={3}
                value={settings.emailsText || settings.emails?.join('\n') || ''}
                onChange={handleTextChange('emailsText')}
              />

              <Input
                label="Hours title"
                value={settings.hoursTitle || ''}
                onChange={handleTextChange('hoursTitle')}
              />

              <Textarea
                label="Working hours (one per line)"
                rows={3}
                value={settings.workingHoursText || settings.workingHours?.join('\n') || ''}
                onChange={handleTextChange('workingHoursText')}
              />
            </CardBody>
          </Card>

          <div className="lg:col-span-2 flex justify-end">
            <Button type="submit" loading={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      )}
    </AdminShell>
  )
}

export default ContactSettings
