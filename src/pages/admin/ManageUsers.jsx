import { useEffect, useMemo, useState } from 'react'
import AdminShell from '../../components/AdminShell.jsx'
import { getUsers, upsertUser } from '../../services/userService.js'
import {
  AlertDialog,
  Badge,
  Button,
  DataTable,
  EmptyState,
  Input,
  SearchBar,
  Select,
  SkeletonTable,
  useToast,
} from '../../components/ui/index.js'

const roleOptions = [
  'super-admin',
  'admin',
  'content-editor',
  'sales-manager',
  'distributor',
  'driver',
  'viewer',
]

function ManageUsers() {
  const toast = useToast()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [formState, setFormState] = useState({ uid: '', name: '', role: 'distributor' })
  const [pendingRoleChange, setPendingRoleChange] = useState(null)
  const [status, setStatus] = useState(null)

  const loadUsers = async () => {
    setLoading(true)
    const response = await getUsers()
    setUsers(response)
    setLoading(false)
  }

  useEffect(() => {
    let isActive = true

    getUsers()
      .then((response) => {
        if (isActive) {
          setUsers(response)
          setLoading(false)
        }
      })
      .catch((error) => {
        console.error('Failed to load users', error)
        if (isActive) {
          setLoading(false)
        }
      })

    return () => {
      isActive = false
    }
  }, [])

  const handleChange = (event) => {
    setFormState((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('loading')
    try {
      await upsertUser(formState.uid, {
        name: formState.name,
        role: formState.role,
      })
      await loadUsers()
      setStatus('success')
      setFormState({ uid: '', name: '', role: 'distributor' })
      toast.success('User saved successfully.')
    } catch (error) {
      console.error('Failed to update user', error)
      setStatus('error')
      toast.error('Failed to save user.')
    }
  }

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase()
    return users.filter((user) => {
      const matchesRole = roleFilter === 'all' || String(user.role || '').toLowerCase() === roleFilter
      const haystack = [user.id, user.name, user.role].filter(Boolean).join(' ').toLowerCase()
      const matchesSearch = !query || haystack.includes(query)
      return matchesRole && matchesSearch
    })
  }, [users, search, roleFilter])

  const applyRoleChange = async () => {
    if (!pendingRoleChange) return
    await upsertUser(pendingRoleChange.id, {
      name: pendingRoleChange.name,
      role: pendingRoleChange.nextRole,
    })
    setPendingRoleChange(null)
    await loadUsers()
    toast.success('Role updated successfully.')
  }

  const roleTone = (role) => {
    const key = String(role || '').toLowerCase()
    if (key.includes('admin')) return 'danger'
    if (key === 'distributor') return 'primary'
    if (key === 'sales-manager' || key === 'content-editor') return 'accent'
    return 'neutral'
  }

  const columns = [
    { key: 'id', label: 'UID', mobileLabel: 'UID' },
    { key: 'name', label: 'Name', mobileLabel: 'Name', render: (user) => user.name || '-' },
    {
      key: 'role',
      label: 'Role',
      mobileLabel: 'Current role',
      render: (user) => <Badge tone={roleTone(user.role)}>{user.role || 'viewer'}</Badge>,
    },
    {
      key: 'assign',
      label: 'Assign Role',
      mobileLabel: 'Change role',
      render: (user) => (
        <div className="flex items-center gap-2">
          <select
            aria-label={`Assign role for user ${user.id}`}
            defaultValue={user.role || 'viewer'}
            className="field-base h-9 py-1 text-xs"
            onChange={(event) => {
              setPendingRoleChange({
                id: user.id,
                name: user.name,
                currentRole: user.role,
                nextRole: event.target.value,
              })
            }}
          >
            {roleOptions.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
      ),
    },
  ]

  return (
    <AdminShell
      title="Manage Users"
      subtitle="Control platform access roles while preserving secure admin and distributor permissions."
    >
      <section className="surface-card">
        <form className="grid gap-3 lg:grid-cols-4" onSubmit={handleSubmit}>
          <Input
            name="uid"
            label="User UID"
            value={formState.uid}
            onChange={handleChange}
            required
          />
          <Input
            name="name"
            label="Full name"
            value={formState.name}
            onChange={handleChange}
            required
          />
          <Select name="role" label="Role" value={formState.role} onChange={handleChange}>
            {roleOptions.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </Select>
          <div className="flex items-end gap-2">
            <Button type="submit" loading={status === 'loading'} className="w-full">Save User</Button>
          </div>
        </form>
      </section>

      <section className="mt-6 surface-card space-y-4">
        <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
          <SearchBar
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onClear={() => setSearch('')}
            placeholder="Search by UID, name, or role"
          />
          <Select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
            <option value="all">All roles</option>
            {roleOptions.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </Select>
        </div>

        {loading ? (
          <SkeletonTable rows={6} cols={4} />
        ) : (
          <DataTable
            ariaLabel="Users table"
            columns={columns}
            rows={filteredUsers}
            emptyFallback={
              <EmptyState
                title="No users found"
                description="Try another search term or role filter."
              />
            }
          />
        )}
      </section>

      <AlertDialog
        open={Boolean(pendingRoleChange)}
        title="Confirm role change"
        description={
          pendingRoleChange
            ? `Change ${pendingRoleChange.name || pendingRoleChange.id} from ${pendingRoleChange.currentRole || 'viewer'} to ${pendingRoleChange.nextRole}?`
            : ''
        }
        confirmLabel="Apply role"
        onConfirm={applyRoleChange}
        onCancel={() => setPendingRoleChange(null)}
      />
    </AdminShell>
  )
}

export default ManageUsers
