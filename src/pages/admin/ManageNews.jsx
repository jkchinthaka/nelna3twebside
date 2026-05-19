import { useEffect, useMemo, useState } from 'react'
import AdminShell from '../../components/AdminShell.jsx'
import { addNews, deleteNews, getNews, updateNews } from '../../services/newsService.js'
import {
  AlertDialog,
  Button,
  DataTable,
  EmptyState,
  Input,
  SearchBar,
  SkeletonTable,
  Textarea,
  useToast,
} from '../../components/ui/index.js'

const initialState = {
  title: '',
  summary: '',
  body: '',
  imageUrl: '',
}

function ManageNews() {
  const toast = useToast()
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [formState, setFormState] = useState(initialState)
  const [editingId, setEditingId] = useState(null)
  const [pendingDelete, setPendingDelete] = useState(null)
  const [status, setStatus] = useState(null)

  const loadNews = async () => {
    setLoading(true)
    const response = await getNews()
    setNews(response)
    setLoading(false)
  }

  useEffect(() => {
    let isActive = true

    getNews()
      .then((response) => {
        if (isActive) {
          setNews(response)
          setLoading(false)
        }
      })
      .catch((error) => {
        console.error('Failed to load news', error)
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
      if (editingId) {
        await updateNews(editingId, formState)
      } else {
        await addNews(formState)
      }
      setFormState(initialState)
      setEditingId(null)
      await loadNews()
      setStatus('success')
      toast.success(editingId ? 'Article updated.' : 'Article created.')
    } catch (error) {
      console.error('Failed to save news', error)
      setStatus('error')
      toast.error('Failed to save article.')
    }
  }

  const handleEdit = (article) => {
    setFormState({
      title: article.title || '',
      summary: article.summary || '',
      body: article.body || '',
      imageUrl: article.imageUrl || '',
    })
    setEditingId(article.id)
  }

  const handleDelete = async () => {
    if (!pendingDelete) return
    await deleteNews(pendingDelete.id)
    setPendingDelete(null)
    await loadNews()
    toast.success('Article deleted.')
  }

  const filteredNews = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return news
    return news.filter((item) =>
      [item.title, item.summary, item.category].filter(Boolean).join(' ').toLowerCase().includes(query),
    )
  }, [news, search])

  const columns = [
    { key: 'title', label: 'Title', mobileLabel: 'Title' },
    { key: 'summary', label: 'Summary', mobileLabel: 'Summary', render: (item) => <span className="line-clamp-2">{item.summary}</span> },
    { key: 'category', label: 'Category', mobileLabel: 'Category', render: (item) => item.category || 'Update' },
    { key: 'date', label: 'Date', mobileLabel: 'Date', render: (item) => item.date || '-' },
    {
      key: 'actions',
      label: 'Actions',
      mobileLabel: 'Actions',
      render: (item) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>Edit</Button>
          <Button size="sm" variant="danger" onClick={() => setPendingDelete(item)}>Delete</Button>
        </div>
      ),
      mobileRender: (item) => (
        <div className="grid justify-items-end gap-2">
          <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>Edit</Button>
          <Button size="sm" variant="danger" onClick={() => setPendingDelete(item)}>Delete</Button>
        </div>
      ),
    },
  ]

  return (
    <AdminShell
      title="Manage News"
      subtitle="Publish and maintain website articles with clear editorial controls."
    >
      <section className="surface-card">
        <form className="grid gap-3 lg:grid-cols-2" onSubmit={handleSubmit}>
          <Input
            name="title"
            label="Headline"
            value={formState.title}
            onChange={handleChange}
            required
          />
          <Input
            name="summary"
            label="Summary"
            value={formState.summary}
            onChange={handleChange}
            required
          />
          <div className="lg:col-span-2">
            <Textarea
              name="body"
              label="Article body"
              value={formState.body}
              onChange={handleChange}
              required
            />
          </div>
          <Input
            name="imageUrl"
            label="Image URL"
            value={formState.imageUrl}
            onChange={handleChange}
          />
          <div className="flex items-end gap-2">
            <Button type="submit" loading={status === 'loading'}>
              {editingId ? 'Update Article' : 'Add Article'}
            </Button>
            {editingId ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingId(null)
                  setFormState(initialState)
                }}
              >
                Cancel
              </Button>
            ) : null}
          </div>
        </form>
      </section>

      <section className="mt-6 surface-card space-y-4">
        <SearchBar
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onClear={() => setSearch('')}
          placeholder="Search by title, summary, or category"
        />

        {loading ? (
          <SkeletonTable rows={6} cols={5} />
        ) : (
          <DataTable
            ariaLabel="News table"
            columns={columns}
            rows={filteredNews}
            emptyFallback={
              <EmptyState
                title="No news items found"
                description="Create a new article or adjust your search term."
              />
            }
          />
        )}
      </section>

      <AlertDialog
        open={Boolean(pendingDelete)}
        title="Delete article"
        description={pendingDelete ? `Are you sure you want to delete "${pendingDelete.title}"?` : ''}
        confirmLabel="Delete"
        danger
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </AdminShell>
  )
}

export default ManageNews
