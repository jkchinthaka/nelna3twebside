import Badge from './Badge.jsx'

const statusMap = {
  new: { tone: 'primary', label: 'New' },
  confirmed: { tone: 'accent', label: 'Confirmed' },
  processing: { tone: 'accent', label: 'Processing' },
  packed: { tone: 'accent', label: 'Packed' },
  dispatched: { tone: 'accent', label: 'Dispatched' },
  delivered: { tone: 'primary', label: 'Delivered' },
  resolved: { tone: 'primary', label: 'Resolved' },
  closed: { tone: 'neutral', label: 'Closed' },
  cancelled: { tone: 'danger', label: 'Cancelled' },
  returned: { tone: 'danger', label: 'Returned' },
  pending: { tone: 'accent', label: 'Pending' },
  contacted: { tone: 'accent', label: 'Contacted' },
}

function StatusBadge({ status = 'new', className }) {
  const key = String(status || 'new').toLowerCase()
  const config = statusMap[key] || { tone: 'neutral', label: status }
  return <Badge className={className} tone={config.tone}>{config.label}</Badge>
}

export default StatusBadge
