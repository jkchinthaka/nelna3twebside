import { useEffect, useMemo, useState } from 'react'
import AdminShell from '../../components/AdminShell.jsx'
import { addProduct, deleteProduct, getProducts, updateProduct } from '../../services/productService.js'
import { uploadFile } from '../../services/storageService.js'
import { isFirebaseConfigured } from '../../firebase/firebase.js'
import {
  AlertDialog,
  Button,
  DataTable,
  EmptyState,
  FileUpload,
  Input,
  SearchBar,
  SkeletonTable,
  Textarea,
  useToast,
} from '../../components/ui/index.js'

const initialState = {
  id: '',
  name: '',
  slug: '',
  category: '',
  description: '',
  imageUrl: '',
  pdfUrl: '',
  weightsText: '',
  storage: '',
  certificationsText: '',
  availability: 'In Stock',
  nutritionCalories: '',
  nutritionProtein: '',
  nutritionFat: '',
  temperatureRange: '',
  plant: '',
  batchSample: '',
}

function ManageProducts() {
  const toast = useToast()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [formState, setFormState] = useState(initialState)
  const [editingId, setEditingId] = useState(null)
  const [pendingDelete, setPendingDelete] = useState(null)
  const [status, setStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [pdfFile, setPdfFile] = useState(null)
  const [fileErrors, setFileErrors] = useState({ image: '', pdf: '' })

  const slugify = (value) =>
    String(value || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')

  const loadProducts = async () => {
    setLoading(true)
    const response = await getProducts()
    setProducts(response)
    setLoading(false)
  }

  useEffect(() => {
    let isActive = true

    getProducts()
      .then((response) => {
        if (isActive) {
          setProducts(response)
          setLoading(false)
        }
      })
      .catch((error) => {
        console.error('Failed to load products', error)
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

  const normalizePayload = (payload) => {
    const weights = String(payload.weightsText || '')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)

    const certifications = String(payload.certificationsText || '')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)

    return {
      id: payload.id || undefined,
      name: payload.name,
      slug: payload.slug || slugify(payload.name),
      category: payload.category,
      description: payload.description,
      imageUrl: payload.imageUrl,
      pdfUrl: payload.pdfUrl,
      weights,
      storage: payload.storage,
      certifications,
      availability: payload.availability,
      temperatureRange: payload.temperatureRange,
      plant: payload.plant,
      batchSample: payload.batchSample,
      nutrition: {
        calories: payload.nutritionCalories ? Number(payload.nutritionCalories) : undefined,
        protein: payload.nutritionProtein || undefined,
        fat: payload.nutritionFat || undefined,
      },
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    if (!formState.name || !formState.category || !formState.description) {
      setStatus('error')
      setErrorMessage('Name, category, and description are required.')
      return
    }

    if (fileErrors.image || fileErrors.pdf) {
      setStatus('error')
      setErrorMessage('Resolve file validation errors before saving.')
      return
    }

    try {
      let imageUrl = formState.imageUrl
      let pdfUrl = formState.pdfUrl

      if ((imageFile || pdfFile) && !isFirebaseConfigured) {
        setErrorMessage('File uploads require Firebase. Saving product without uploading files.')
      }

      if (imageFile && isFirebaseConfigured) {
        imageUrl = await uploadFile(`products/${Date.now()}-${imageFile.name}`, imageFile)
      }
      if (pdfFile && isFirebaseConfigured) {
        pdfUrl = await uploadFile(`products/${Date.now()}-${pdfFile.name}`, pdfFile)
      }

      const payload = normalizePayload({
        ...formState,
        imageUrl,
        pdfUrl,
      })

      if (editingId) {
        await updateProduct(editingId, payload)
      } else {
        await addProduct(payload)
      }

      setFormState(initialState)
      setEditingId(null)
      setImageFile(null)
      setPdfFile(null)
      setFileErrors({ image: '', pdf: '' })
      await loadProducts()
      setStatus('success')
      toast.success(editingId ? 'Product updated.' : 'Product created.')
    } catch (error) {
      console.error('Failed to save product', error)
      setStatus('error')
      setErrorMessage(error?.message || 'Save failed.')
      toast.error('Failed to save product.')
    }
  }

  const handleEdit = (product) => {
    setFormState({
      id: product.id || '',
      name: product.name || '',
      slug: product.slug || '',
      category: product.category || '',
      description: product.description || '',
      imageUrl: product.imageUrl || '',
      pdfUrl: product.pdfUrl || '',
      weightsText: (product.weights || []).join(', '),
      storage: product.storage || '',
      certificationsText: (product.certifications || []).join(', '),
      availability: product.availability || 'In Stock',
      nutritionCalories: product.nutrition?.calories || '',
      nutritionProtein: product.nutrition?.protein || '',
      nutritionFat: product.nutrition?.fat || '',
      temperatureRange: product.temperatureRange || '',
      plant: product.plant || '',
      batchSample: product.batchSample || '',
    })
    setEditingId(product.id)
  }

  const handleDelete = async () => {
    if (!pendingDelete) return
    await deleteProduct(pendingDelete.id)
    setPendingDelete(null)
    await loadProducts()
    toast.success('Product deleted.')
  }

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return products

    return products.filter((product) =>
      [product.id, product.name, product.slug, product.category]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(query),
    )
  }, [products, search])

  const columns = [
    { key: 'id', label: 'ID', mobileLabel: 'ID' },
    { key: 'name', label: 'Name', mobileLabel: 'Name' },
    { key: 'slug', label: 'Slug', mobileLabel: 'Slug', render: (product) => product.slug || '-' },
    { key: 'category', label: 'Category', mobileLabel: 'Category', render: (product) => product.category || '-' },
    { key: 'availability', label: 'Availability', mobileLabel: 'Availability', render: (product) => product.availability || '-' },
    {
      key: 'actions',
      label: 'Actions',
      mobileLabel: 'Actions',
      render: (product) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>Edit</Button>
          <Button size="sm" variant="danger" onClick={() => setPendingDelete(product)}>Delete</Button>
        </div>
      ),
      mobileRender: (product) => (
        <div className="grid justify-items-end gap-2">
          <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>Edit</Button>
          <Button size="sm" variant="danger" onClick={() => setPendingDelete(product)}>Delete</Button>
        </div>
      ),
    },
  ]

  return (
    <AdminShell
      title="Manage Products"
      subtitle="Maintain a complete product catalog with structured fields for storage, nutrition, and certifications."
    >
      <section className="surface-card">
        <form className="grid gap-3 lg:grid-cols-2" onSubmit={handleSubmit}>
          <Input name="id" label="Product ID" value={formState.id} onChange={handleChange} hint="Optional. Auto-generated if omitted." />
          <Input name="name" label="Product name" value={formState.name} onChange={handleChange} required />
          <Input name="slug" label="Slug" value={formState.slug} onChange={handleChange} hint="Leave blank to auto-generate from name." />
          <Input name="category" label="Category" value={formState.category} onChange={handleChange} required />

          <div className="lg:col-span-2">
            <Textarea name="description" label="Description" value={formState.description} onChange={handleChange} required />
          </div>

          <Input name="weightsText" label="Weights" value={formState.weightsText} onChange={handleChange} hint="Comma-separated, e.g. 250g, 500g, 1Kg" />
          <Input name="certificationsText" label="Certifications" value={formState.certificationsText} onChange={handleChange} hint="Comma-separated, e.g. HACCP, ISO 22000, Halal" />
          <Input name="availability" label="Availability" value={formState.availability} onChange={handleChange} />
          <Input name="storage" label="Storage instructions" value={formState.storage} onChange={handleChange} />
          <Input name="temperatureRange" label="Temperature range" value={formState.temperatureRange} onChange={handleChange} />
          <Input name="plant" label="Plant/location" value={formState.plant} onChange={handleChange} />
          <Input name="batchSample" label="Batch sample" value={formState.batchSample} onChange={handleChange} />
          <Input name="imageUrl" label="Image URL" value={formState.imageUrl} onChange={handleChange} />
          <Input name="pdfUrl" label="Catalog PDF URL" value={formState.pdfUrl} onChange={handleChange} />

          <Input
            name="nutritionCalories"
            label="Nutrition: Calories"
            value={formState.nutritionCalories}
            onChange={handleChange}
            type="number"
            min="0"
          />
          <Input name="nutritionProtein" label="Nutrition: Protein" value={formState.nutritionProtein} onChange={handleChange} placeholder="e.g. 16g" />
          <Input name="nutritionFat" label="Nutrition: Fat" value={formState.nutritionFat} onChange={handleChange} placeholder="e.g. 6g" />

          <FileUpload
            id="product-image-upload"
            label="Upload product image"
            accept="image/*"
            maxSizeMb={5}
            file={imageFile}
            error={fileErrors.image}
            onChange={({ file, error }) => {
              setImageFile(file)
              setFileErrors((current) => ({ ...current, image: error }))
            }}
          />
          <FileUpload
            id="product-pdf-upload"
            label="Upload product PDF"
            accept="application/pdf"
            maxSizeMb={10}
            file={pdfFile}
            error={fileErrors.pdf}
            onChange={({ file, error }) => {
              setPdfFile(file)
              setFileErrors((current) => ({ ...current, pdf: error }))
            }}
          />

          <div className="lg:col-span-2 flex flex-wrap gap-2">
            <Button type="submit" loading={status === 'loading'}>
              {editingId ? 'Update Product' : 'Add Product'}
            </Button>
            {editingId ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingId(null)
                  setFormState(initialState)
                  setImageFile(null)
                  setPdfFile(null)
                  setErrorMessage('')
                }}
              >
                Cancel edit
              </Button>
            ) : null}
            {status === 'error' ? (
              <p className="self-center text-sm text-brand-red-600">{errorMessage || 'Save failed.'}</p>
            ) : null}
            {status === 'success' && errorMessage ? (
              <p className="self-center text-sm text-amber-700">{errorMessage}</p>
            ) : null}
          </div>
        </form>
      </section>

      <section className="mt-6 surface-card space-y-4">
        <SearchBar
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onClear={() => setSearch('')}
          placeholder="Search by ID, name, slug, or category"
        />

        {loading ? (
          <SkeletonTable rows={6} cols={6} />
        ) : (
          <DataTable
            ariaLabel="Products table"
            columns={columns}
            rows={filteredProducts}
            emptyFallback={
              <EmptyState
                title="No products found"
                description="Create your first product or try a different search term."
              />
            }
          />
        )}
      </section>

      <AlertDialog
        open={Boolean(pendingDelete)}
        title="Delete product"
        description={pendingDelete ? `Are you sure you want to delete ${pendingDelete.name}?` : ''}
        confirmLabel="Delete"
        danger
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </AdminShell>
  )
}

export default ManageProducts




