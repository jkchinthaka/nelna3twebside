import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import {
  Download,
  Filter,
  LayoutGrid,
  List,
  MessageCircle,
  RefreshCcw,
  Send,
} from 'lucide-react'
import ProductCard from '../components/ProductCard.jsx'
import ProductQuickView from '../components/ProductQuickView.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import {
  Button,
  Drawer,
  EmptyState,
  ErrorState,
  FilterPanel,
  Input,
  Pagination,
  SearchBar,
  Select,
  Skeleton,
  Textarea,
} from '../components/ui/index.js'
import { getProducts } from '../services/productService.js'
import { addOrder } from '../services/orderService.js'
import { hasNotificationBackend, notifyEmail, notifyWhatsApp } from '../services/notificationService.js'
import { fallbackProducts } from '../data/products.js'
import { MOBILE } from '../data/companyContact.js'

const catalogUrl = '/catalogs/nelna-catalog.pdf'

const whatsappNumber = MOBILE.whatsapp
const notificationEmail = 'info@nelna.lk'
const recentlyViewedStorageKey = 'nelna_recent_products'

const requiredCategories = [
  'Frozen Chicken Products',
  'Value-Added Chicken Products',
  'Ready-to-Eat Food Products',
  'Poultry Feed',
  'Day-Old Broiler Chicks',
  'Compost Fertilizer',
  'Agricultural Products',
]

const tagOptions = ['All', 'New', 'Popular', 'Frozen', 'Value-Added', 'Halal']

function matchesTag(product, tag) {
  const normalizedTag = String(tag || '').toLowerCase()
  const tags = Array.isArray(product.tags) ? product.tags.map((item) => String(item).toLowerCase()) : []
  const category = String(product.category || '').toLowerCase()
  const certs = Array.isArray(product.certifications)
    ? product.certifications.map((item) => String(item).toLowerCase())
    : []

  if (normalizedTag === 'new') return Boolean(product.isNew)
  if (normalizedTag === 'popular') return tags.includes('popular') || tags.includes('best-seller')
  if (normalizedTag === 'frozen') return category.includes('frozen')
  if (normalizedTag === 'value-added') return category.includes('value') || tags.includes('value-added')
  if (normalizedTag === 'halal') return certs.some((value) => value.includes('halal'))

  return true
}

function normalizeCategoryFilters(products) {
  const live = products
    .map((product) => String(product.category || '').trim())
    .filter(Boolean)
  return ['All', ...Array.from(new Set([...requiredCategories, ...live]))]
}

function Products() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()

  const [products, setProducts] = useState(fallbackProducts)
  const [loading, setLoading] = useState(true)
  const [productsError, setProductsError] = useState('')

  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [tagFilter, setTagFilter] = useState('All')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState('grid')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [page, setPage] = useState(1)

  const [formState, setFormState] = useState({
    name: '',
    company: '',
    phone: '',
    product: '',
    quantity: '',
    message: '',
  })
  const [status, setStatus] = useState(null)

  const [recentIds, setRecentIds] = useState([])

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true)
      setProductsError('')
      const response = await getProducts()
      if (Array.isArray(response) && response.length) {
        const merged = response.map((item) => {
          const fallback = fallbackProducts.find(
            (entry) => entry.id === item.id || entry.slug === item.slug,
          )
          return {
            ...fallback,
            ...item,
            slug: item.slug || fallback?.slug || item.id,
          }
        })
        setProducts(merged)
      } else {
        setProducts(fallbackProducts)
      }
    } catch (error) {
      console.error('Failed to load products', error)
      setProductsError('Live catalog could not be loaded. Showing fallback product data.')
      setProducts(fallbackProducts)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  useEffect(() => {
    const category = (searchParams.get('cat') || '').trim()
    if (category) {
      setSearch(category)
    }
  }, [searchParams])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(recentlyViewedStorageKey)
      if (!raw) return
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        setRecentIds(parsed)
      }
    } catch (error) {
      console.warn('Failed to parse recently viewed products', error)
    }
  }, [])

  useEffect(() => {
    setPage(1)
  }, [search, categoryFilter, tagFilter, sortBy])

  const categories = useMemo(() => normalizeCategoryFilters(products), [products])

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    let result = [...products]

    if (categoryFilter !== 'All') {
      result = result.filter((product) => String(product.category || '').toLowerCase() === categoryFilter.toLowerCase())
    }

    if (tagFilter !== 'All') {
      result = result.filter((product) => matchesTag(product, tagFilter))
    }

    if (normalizedSearch) {
      result = result.filter((product) => {
        const haystack = [product.name, product.description, product.category, ...(product.tags || [])]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        return haystack.includes(normalizedSearch)
      })
    }

    if (sortBy === 'name') {
      result.sort((a, b) => String(a.name || '').localeCompare(String(b.name || '')))
    }

    if (sortBy === 'category') {
      result.sort((a, b) => String(a.category || '').localeCompare(String(b.category || '')))
    }

    if (sortBy === 'newest') {
      result.sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)))
    }

    if (sortBy === 'popular') {
      result.sort((a, b) => {
        const aPopular = matchesTag(a, 'popular') ? 1 : 0
        const bPopular = matchesTag(b, 'popular') ? 1 : 0
        return bPopular - aPopular
      })
    }

    return result
  }, [products, search, categoryFilter, tagFilter, sortBy])

  const pageSize = viewMode === 'list' ? 6 : 9
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize))
  const pagedProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize)

  const recentlyViewedProducts = useMemo(() => {
    const ordered = recentIds
      .map((id) => products.find((item) => item.id === id || item.slug === id))
      .filter(Boolean)
    return ordered.slice(0, 3)
  }, [products, recentIds])

  const isFormValid = formState.name.trim().length > 1 && formState.phone.trim().length > 6

  const handleChange = (event) => {
    setFormState((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const resetFilters = () => {
    setSearch('')
    setCategoryFilter('All')
    setTagFilter('All')
    setSortBy('name')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!isFormValid) {
      setStatus('error')
      return
    }

    setStatus('loading')

    try {
      const messageLines = [
        `Name: ${formState.name}`,
        formState.company ? `Company: ${formState.company}` : null,
        `Phone: ${formState.phone}`,
        formState.product ? `Product: ${formState.product}` : null,
        formState.quantity ? `Expected quantity: ${formState.quantity}` : null,
        formState.message ? `Message: ${formState.message}` : null,
      ].filter(Boolean)

      const text = encodeURIComponent(messageLines.join('\n'))

      try {
        await addOrder(formState)
      } catch (error) {
        console.error('Failed to save order', error)
      }

      if (hasNotificationBackend) {
        const notificationPayload = {
          ...formState,
          recipients: [notificationEmail],
          whatsappNumber,
        }

        try {
          await Promise.all([
            notifyEmail('order', notificationPayload),
            notifyWhatsApp('order', notificationPayload),
          ])
        } catch (error) {
          console.error('Failed to notify order', error)
        }
      }

      setStatus('success')
      setFormState({ name: '', company: '', phone: '', product: '', quantity: '', message: '' })
      window.location.href = `https://wa.me/${whatsappNumber}?text=${text}`
    } catch (error) {
      console.error('Failed to submit order', error)
      setStatus('error')
    }
  }

  const filterControls = (
    <div className="space-y-4">
      <SearchBar
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        onClear={() => setSearch('')}
        placeholder="Search products, categories, or use-cases"
      />
      <Select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} aria-label="Filter by category">
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Select>
      <Select value={tagFilter} onChange={(event) => setTagFilter(event.target.value)} aria-label="Filter by product badge">
        {tagOptions.map((tag) => (
          <option key={tag} value={tag}>{tag}</option>
        ))}
      </Select>
      <Button type="button" variant="outline" className="w-full justify-center" onClick={resetFilters}>
        <RefreshCcw className="h-4 w-4" aria-hidden="true" />
        Reset Filters
      </Button>
    </div>
  )

  return (
    <div className="page-shell section-spacing space-y-8">
      <header className="space-y-4">
        <SectionHeading
          eyebrow="Product Catalog"
          title={t('title', { ns: 'products' })}
          subtitle="Browse frozen chicken products, value-added cuts, and certified poultry solutions for Sri Lankan households and businesses."
          align="left"
          eyebrowClassName="text-brand-green-800"
          titleClassName="text-nelna-dark"
          subtitleClassName="text-nelna-dark md:text-[1.03rem] leading-relaxed font-medium"
        />
        <div className="flex flex-wrap items-center gap-3">
          <a href={catalogUrl} className="btn-yellow inline-flex items-center gap-2 px-5 py-2.5 text-sm" download>
            <Download className="h-4 w-4" aria-hidden="true" />
            {t('downloadCatalog', { ns: 'products' })}
          </a>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello Nelna team, I need help choosing products.')}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-pill border border-brand-green-200 bg-brand-green-50 px-4 py-2 text-sm font-semibold text-brand-green-700"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp Inquiry
          </a>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <div className="hidden lg:block">
          <FilterPanel className="sticky top-24">{filterControls}</FilterPanel>
        </div>

        <div className="space-y-5">
          <div className="surface-card flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-sm font-medium text-nelna-dark/80">
              Showing <span className="font-bold text-brand-green-700">{filteredProducts.length}</span> matching products
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button type="button" variant="outline" className="lg:hidden" onClick={() => setMobileFiltersOpen(true)}>
                <Filter className="h-4 w-4" aria-hidden="true" />
                Filters
              </Button>

              <div className="inline-flex rounded-pill border border-nelna-dark/25 p-1" role="group" aria-label="View toggle">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`inline-flex min-h-[36px] min-w-[40px] items-center justify-center rounded-pill px-3 ${
                    viewMode === 'grid' ? 'bg-brand-green text-nelna-white' : 'text-nelna-dark/80'
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`inline-flex min-h-[36px] min-w-[40px] items-center justify-center rounded-pill px-3 ${
                    viewMode === 'list' ? 'bg-brand-green text-nelna-white' : 'text-nelna-dark/80'
                  }`}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <Select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort products">
                <option value="name">Sort: Name</option>
                <option value="category">Sort: Category</option>
                <option value="newest">Sort: New</option>
                <option value="popular">Sort: Popular</option>
              </Select>
            </div>
          </div>

          {productsError ? (
            <ErrorState
              title="Catalog sync issue"
              description={productsError}
              retryLabel="Retry catalog"
              onRetry={loadProducts}
            />
          ) : null}

          {loading ? (
            <div className={viewMode === 'list' ? 'space-y-4' : 'grid gap-5 md:grid-cols-2 xl:grid-cols-3'}>
              {Array.from({ length: viewMode === 'list' ? 4 : 9 }).map((_, index) => (
                <Skeleton key={`product-skeleton-${index}`} className={`rounded-2xl ${viewMode === 'list' ? 'h-[240px]' : 'h-[440px]'}`} />
              ))}
            </div>
          ) : pagedProducts.length ? (
            <>
              <div className={viewMode === 'list' ? 'space-y-4' : 'grid gap-5 md:grid-cols-2 xl:grid-cols-3'}>
                {pagedProducts.map((product) => (
                  <ProductCard
                    key={product.id || product.slug}
                    product={product}
                    view={viewMode}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>
              <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </>
          ) : (
            <EmptyState
              title="No matching products found"
              description="Try adjusting filters, resetting search, or browsing all categories."
              actionLabel="Reset Filters"
              onAction={resetFilters}
            />
          )}
        </div>
      </section>

      {recentlyViewedProducts.length ? (
        <section className="space-y-4">
          <SectionHeading
            eyebrow="Recognition over recall"
            title="Recently Viewed"
            subtitle="Quickly continue from products you viewed recently."
            align="left"
            eyebrowClassName="text-brand-green-800"
            titleClassName="text-nelna-dark"
            subtitleClassName="text-nelna-dark md:text-[1.02rem] leading-relaxed font-medium"
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {recentlyViewedProducts.map((product) => (
              <ProductCard key={`recent-${product.id || product.slug}`} product={product} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        </section>
      ) : null}

      <section id="bulk-order" className="surface-card">
        <SectionHeading
          eyebrow="Bulk Orders"
          title={t('bulkOrder', { ns: 'products' })}
          subtitle={t('formNote', { ns: 'products' })}
          align="left"
          eyebrowClassName="text-brand-green-800"
          titleClassName="text-nelna-dark"
          subtitleClassName="text-nelna-dark md:text-[1.02rem] leading-relaxed font-medium"
        />
        <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <Input
            name="name"
            label={t('forms.name')}
            placeholder={t('forms.name')}
            value={formState.name}
            onChange={handleChange}
            required
            hint="Required"
          />
          <Input
            name="company"
            label={t('forms.company')}
            placeholder={t('forms.company')}
            value={formState.company}
            onChange={handleChange}
          />
          <Input
            name="phone"
            label={t('forms.phone')}
            placeholder="+94 7X XXX XXXX"
            value={formState.phone}
            onChange={handleChange}
            required
            hint="Use Sri Lanka format for faster response."
          />
          <Input
            name="product"
            label="Product"
            placeholder="Preferred product"
            value={formState.product}
            onChange={handleChange}
          />
          <Input
            name="quantity"
            label={t('forms.quantity')}
            placeholder="e.g. 250kg/week"
            value={formState.quantity}
            onChange={handleChange}
          />
          <Textarea
            className="md:col-span-2"
            name="message"
            label={t('forms.message')}
            placeholder="Tell us your requirement and delivery location"
            value={formState.message}
            onChange={handleChange}
            rows={4}
          />
          <div className="md:col-span-2 flex flex-wrap items-center gap-3">
            <Button type="submit" loading={status === 'loading'} disabled={!isFormValid}>
              {status === 'loading' ? 'Submitting...' : t('forms.submit')}
              <Send className="h-4 w-4" aria-hidden="true" />
            </Button>
            {status === 'success' ? <span className="text-xs font-semibold text-brand-green-700">Submitted successfully.</span> : null}
            {status === 'error' ? <span className="text-xs font-semibold text-nelna-green-dark-700">Please review required fields and retry.</span> : null}
          </div>
        </form>
      </section>

      <Drawer
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        title="Filter Products"
        footer={
          <Button type="button" className="w-full" onClick={() => setMobileFiltersOpen(false)}>
            Apply Filters
          </Button>
        }
      >
        {filterControls}
      </Drawer>

      <ProductQuickView
        product={quickViewProduct}
        open={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  )
}

export default Products
