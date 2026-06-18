import { useEffect, useMemo, useState } from 'react'
import AdminShell from '../../components/AdminShell.jsx'
import { getInquiries, updateInquiry } from '../../services/inquiryService.js'
import {
  DataTable,
  Drawer,
  EmptyState,
  SearchBar,
  Select,
  SkeletonTable,
  StatusBadge,
  useToast,
} from '../../components/ui/index.js'

const statuses = ['new', 'pending', 'contacted', 'resolved', 'closed']

function ManageInquiries() {
  const toast = useToast()
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [activeInquiry, setActiveInquiry] = useState(null)

  const loadInquiries = async () => {
    setLoading(true)
    const response = await getInquiries()
    setInquiries(response)
    setLoading(false)
  }

  useEffect(() => {
    let isActive = true

    getInquiries()
      .then((response) => {
        if (isActive) {
          setInquiries(response)
          setLoading(false)
        }
      })
      .catch((error) => {
        console.error('Failed to load inquiries', error)
        if (isActive) {
          setLoading(false)
        }
      })

    return () => {
      isActive = false
    }
  }, [])

  const handleStatusChange = async (id, status) => {
    await updateInquiry(id, { status })
    await loadInquiries()
    toast.success('Inquiry status updated.')
  }

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return inquiries.filter((inquiry) => {
      const matchesStatus =
        statusFilter === 'all' || String(inquiry.status || '').toLowerCase() === statusFilter
      const haystack = [inquiry.name, inquiry.company, inquiry.phone, inquiry.message]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      const matchesQuery = !query || haystack.includes(query)
      return matchesStatus && matchesQuery
    })
  }, [inquiries, search, statusFilter])

  const columns = [
    { key: 'name', label: 'Name', mobileLabel: 'Name' },
    { key: 'company', label: 'Company', mobileLabel: 'Company', render: (inquiry) => inquiry.company || '-' },
    { key: 'phone', label: 'Phone', mobileLabel: 'Phone', render: (inquiry) => inquiry.phone || '-' },
    {
      key: 'message',
      label: 'Message',
      mobileLabel: 'Message',
      render: (inquiry) => (
        <button
          type="button"
          onClick={() => setActiveInquiry(inquiry)}
          className="line-clamp-2 text-left text-sm text-nelna-dark/90 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2 dark:text-nelna-white/90"
        >
          {inquiry.message}
        </button>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      mobileLabel: 'Status',
      render: (inquiry) => (
        <div className="space-y-2">
          <StatusBadge status={inquiry.status || 'new'} />
          <select
            aria-label={`Update status for inquiry ${inquiry.id}`}
            value={inquiry.status || 'new'}
            onChange={(event) => handleStatusChange(inquiry.id, event.target.value)}
            className="field-base h-9 py-1 text-xs"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      ),
    },
  ]

  return (
    <AdminShell
      title="Manage Inquiries"
      subtitle="Review customer messages, update response status, and follow up quickly."
    >
      <section className="surface-card space-y-4">
        <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
          <SearchBar
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onClear={() => setSearch('')}
            placeholder="Search by name, company, phone, or message"
          />
          <Select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter inquiries by status"
          >
            <option value="all">All statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </Select>
        </div>

        {loading ? (
          <SkeletonTable rows={6} cols={5} />
        ) : (
          <DataTable
            ariaLabel="Inquiries table"
            columns={columns}
            rows={filtered}
            emptyFallback={
              <EmptyState
                title="No inquiries found"
                description="Try adjusting your filters or search term."
              />
            }
          />
        )}
      </section>

      <Drawer
        open={Boolean(activeInquiry)}
        onClose={() => setActiveInquiry(null)}
        title="Inquiry Details"
      >
        {activeInquiry ? (
          <div className="space-y-3 text-sm text-nelna-dark/90 dark:text-nelna-white/90">
            <p><strong>Name:</strong> {activeInquiry.name}</p>
            <p><strong>Company:</strong> {activeInquiry.company || '-'}</p>
            <p><strong>Phone:</strong> {activeInquiry.phone || '-'}</p>
            <p><strong>Email:</strong> {activeInquiry.email || '-'}</p>
            <p><strong>Status:</strong> <StatusBadge status={activeInquiry.status || 'new'} /></p>
            <p><strong>Message:</strong> {activeInquiry.message || '-'}</p>
          </div>
        ) : null}
      </Drawer>
    </AdminShell>
  )
}

export default ManageInquiries
