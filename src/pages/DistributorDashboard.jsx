import { useEffect, useMemo, useState } from 'react'
import { getOrders } from '../services/orderService.js'
import {
  Button,
  DataTable,
  Drawer,
  EmptyState,
  ErrorState,
  PageHeader,
  SearchBar,
  Select,
  SkeletonTable,
  StatusBadge,
} from '../components/ui/index.js'

function DistributorDashboard() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [activeOrder, setActiveOrder] = useState(null)

  const loadOrders = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await getOrders()
      setOrders(response)
    } catch (loadError) {
      console.error('Failed to load orders', loadError)
      setError(loadError?.message || 'Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const statusOptions = useMemo(() => {
    const values = new Set(['new'])
    orders.forEach((order) => values.add(String(order.status || 'new').toLowerCase()))
    return Array.from(values)
  }, [orders])

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase()
    return orders.filter((order) => {
      const status = String(order.status || 'new').toLowerCase()
      const matchesStatus = statusFilter === 'all' || status === statusFilter
      const haystack = [order.name, order.company, order.product, order.phone]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      const matchesSearch = !query || haystack.includes(query)
      return matchesStatus && matchesSearch
    })
  }, [orders, search, statusFilter])

  const columns = [
    { key: 'name', label: 'Customer', render: (order) => order.name || '-' },
    { key: 'company', label: 'Company', render: (order) => order.company || '-' },
    { key: 'product', label: 'Product', render: (order) => order.product || 'Bulk order' },
    { key: 'quantity', label: 'Quantity', render: (order) => order.quantity || '-' },
    {
      key: 'status',
      label: 'Status',
      render: (order) => <StatusBadge status={order.status || 'new'} />,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (order) => (
        <Button variant="outline" size="sm" onClick={() => setActiveOrder(order)}>
          View
        </Button>
      ),
    },
  ]

  return (
    <div className="page-shell section-spacing">
      <PageHeader
        eyebrow="Distributor"
        title="Distributor Dashboard"
        subtitle="Track assigned orders, review fulfillment details, and monitor delivery status updates."
      />

      <section className="surface-card space-y-4">
        <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
          <SearchBar
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onClear={() => setSearch('')}
            placeholder="Search by customer, product, company, or phone"
          />
          <Select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter orders by status"
          >
            <option value="all">All statuses</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </Select>
        </div>

        {loading ? (
          <SkeletonTable rows={6} cols={6} />
        ) : error ? (
          <ErrorState
            title="Unable to load orders"
            description={error}
            retryLabel="Retry"
            onRetry={loadOrders}
          />
        ) : (
          <DataTable
            columns={columns}
            rows={filteredOrders}
            emptyFallback={
              <EmptyState
                title="No orders found"
                description="Try changing filters or wait for new orders to be assigned."
              />
            }
          />
        )}
      </section>

      <Drawer
        open={Boolean(activeOrder)}
        onClose={() => setActiveOrder(null)}
        title="Order Details"
      >
        {activeOrder ? (
          <div className="space-y-3 text-sm text-nelna-dark/90 dark:text-nelna-white/90">
            <p><strong>Customer:</strong> {activeOrder.name || '-'}</p>
            <p><strong>Company:</strong> {activeOrder.company || '-'}</p>
            <p><strong>Phone:</strong> {activeOrder.phone || '-'}</p>
            <p><strong>Product:</strong> {activeOrder.product || 'Bulk order'}</p>
            <p><strong>Quantity:</strong> {activeOrder.quantity || '-'}</p>
            <p><strong>Status:</strong> <StatusBadge status={activeOrder.status || 'new'} /></p>
            <p><strong>Message:</strong> {activeOrder.message || '-'}</p>
          </div>
        ) : null}
      </Drawer>
    </div>
  )
}

export default DistributorDashboard
