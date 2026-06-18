import { useEffect, useMemo, useState } from 'react'
import AdminShell from '../../components/AdminShell.jsx'
import { getOrders, updateOrder } from '../../services/orderService.js'
import {
  Button,
  DataTable,
  Drawer,
  EmptyState,
  SearchBar,
  Select,
  SkeletonTable,
  StatusBadge,
  useToast,
} from '../../components/ui/index.js'

const workflow = ['new', 'confirmed', 'packed', 'dispatched', 'delivered', 'closed', 'cancelled', 'returned']

function ManageOrders() {
  const toast = useToast()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [bulkStatus, setBulkStatus] = useState('confirmed')
  const [selectedIds, setSelectedIds] = useState([])
  const [activeOrder, setActiveOrder] = useState(null)

  const loadOrders = async () => {
    setLoading(true)
    const response = await getOrders()
    setOrders(response)
    setLoading(false)
  }

  useEffect(() => {
    let isActive = true

    getOrders()
      .then((response) => {
        if (isActive) {
          setOrders(response)
          setLoading(false)
        }
      })
      .catch((error) => {
        console.error('Failed to load orders', error)
        if (isActive) {
          setLoading(false)
        }
      })

    return () => {
      isActive = false
    }
  }, [])

  const handleStatusChange = async (id, status) => {
    await updateOrder(id, { status })
    await loadOrders()
    toast.success('Order status updated.')
  }

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase()
    return orders.filter((order) => {
      const matchesStatus =
        statusFilter === 'all' || String(order.status || '').toLowerCase() === statusFilter

      const haystack = [order.name, order.company, order.product, order.phone]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      const matchesSearch = !query || haystack.includes(query)
      return matchesStatus && matchesSearch
    })
  }, [orders, search, statusFilter])

  const allVisibleSelected =
    filteredOrders.length > 0 && filteredOrders.every((order) => selectedIds.includes(order.id))

  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      setSelectedIds((current) => current.filter((id) => !filteredOrders.some((order) => order.id === id)))
      return
    }
    setSelectedIds((current) => Array.from(new Set([...current, ...filteredOrders.map((order) => order.id)])))
  }

  const toggleSelection = (id) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
    )
  }

  const applyBulkStatus = async () => {
    if (!selectedIds.length) {
      toast.warning('Select at least one order first.')
      return
    }

    await Promise.all(selectedIds.map((id) => updateOrder(id, { status: bulkStatus })))
    setSelectedIds([])
    await loadOrders()
    toast.success('Bulk status update complete.')
  }

  const columns = [
    {
      key: 'selection',
      mobileHidden: true,
      label: (
        <input
          type="checkbox"
          aria-label="Select all orders"
          checked={allVisibleSelected}
          onChange={toggleSelectAll}
        />
      ),
      render: (order) => (
        <input
          type="checkbox"
          aria-label={`Select order ${order.id}`}
          className="h-4 w-4 rounded border-nelna-dark/25 text-brand-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2"
          checked={selectedIds.includes(order.id)}
          onChange={() => toggleSelection(order.id)}
        />
      ),
    },
    { key: 'name', label: 'Customer', mobileLabel: 'Customer' },
    { key: 'company', label: 'Company', mobileLabel: 'Company', render: (order) => order.company || '-' },
    { key: 'product', label: 'Product', mobileLabel: 'Product', render: (order) => order.product || '-' },
    { key: 'quantity', label: 'Quantity', mobileLabel: 'Quantity', render: (order) => order.quantity || '-' },
    {
      key: 'status',
      label: 'Status',
      mobileLabel: 'Status',
      render: (order) => (
        <div className="space-y-2">
          <StatusBadge status={order.status || 'new'} />
          <select
            aria-label={`Update status for order ${order.id}`}
            value={order.status || 'new'}
            onChange={(event) => handleStatusChange(order.id, event.target.value)}
            className="field-base h-9 py-1 text-xs"
          >
            {workflow.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      mobileLabel: 'Details',
      render: (order) => (
        <Button variant="outline" size="sm" onClick={() => setActiveOrder(order)}>
          View
        </Button>
      ),
    },
  ]

  return (
    <AdminShell
      title="Manage Orders"
      subtitle="Search, filter, and track order fulfillment with clear status transitions."
    >
      <section className="surface-card space-y-4">
        <div className="grid gap-3 lg:grid-cols-[2fr_1fr_1fr_auto]">
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
            {workflow.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </Select>
          <Select
            value={bulkStatus}
            onChange={(event) => setBulkStatus(event.target.value)}
            aria-label="Bulk status"
          >
            {workflow.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </Select>
          <Button onClick={applyBulkStatus} disabled={!selectedIds.length}>Apply Bulk</Button>
        </div>

        {loading ? (
          <SkeletonTable rows={6} cols={7} />
        ) : (
          <DataTable
            ariaLabel="Orders table"
            columns={columns}
            rows={filteredOrders}
            emptyFallback={
              <EmptyState
                title="No orders found"
                description="Try adjusting your search or filters."
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
            <p><strong>Customer:</strong> {activeOrder.name}</p>
            <p><strong>Company:</strong> {activeOrder.company || '-'}</p>
            <p><strong>Phone:</strong> {activeOrder.phone || '-'}</p>
            <p><strong>Product:</strong> {activeOrder.product || '-'}</p>
            <p><strong>Quantity:</strong> {activeOrder.quantity || '-'}</p>
            <p><strong>Status:</strong> <StatusBadge status={activeOrder.status || 'new'} /></p>
            <p><strong>Message:</strong> {activeOrder.message || '-'}</p>
          </div>
        ) : null}
      </Drawer>
    </AdminShell>
  )
}

export default ManageOrders
