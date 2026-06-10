import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import ProductGallery from '../components/ProductGallery.jsx'
import SEO from '../components/SEO.jsx'
import {
  Badge,
  Breadcrumbs,
  Button,
  EmptyState,
  ErrorState,
  Skeleton,
} from '../components/ui/index.js'
import { getProducts } from '../services/productService.js'
import { fallbackProducts } from '../data/products.js'
import { MOBILE } from '../data/companyContact.js'

const recentlyViewedStorageKey = 'nelna_recent_products'

const whatsappNumber = MOBILE.whatsapp

function ProductDetail() {
  const { slug } = useParams()
  const [products, setProducts] = useState(fallbackProducts)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
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
    } catch (loadError) {
      console.error('Failed to load products', loadError)
      setError('Live product data is temporarily unavailable. Showing fallback details where possible.')
      setProducts(fallbackProducts)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const product = useMemo(() => {
    return products.find((item) => item.slug === slug || item.id === slug)
  }, [products, slug])

  useEffect(() => {
    if (!product) return
    try {
      const raw = localStorage.getItem(recentlyViewedStorageKey)
      const parsed = raw ? JSON.parse(raw) : []
      const normalized = Array.isArray(parsed) ? parsed : []
      const id = product.id || product.slug
      const next = [id, ...normalized.filter((item) => item !== id)].slice(0, 10)
      localStorage.setItem(recentlyViewedStorageKey, JSON.stringify(next))
    } catch (storageError) {
      console.warn('Failed to persist recently viewed products', storageError)
    }
  }, [product])

  const relatedProducts = useMemo(() => {
    if (!product) return []
    return products
      .filter((item) => item.id !== product.id && item.category === product.category)
      .slice(0, 3)
  }, [products, product])

  if (loading) {
    return (
      <div className="page-shell section-spacing space-y-5">
        <Skeleton className="h-8 w-44" />
        <Skeleton className="h-[420px] rounded-2xl" />
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-40 rounded-2xl" />
          <Skeleton className="h-40 rounded-2xl" />
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="page-shell section-spacing">
        <EmptyState
          title="Product not found"
          description="Please check the product link or browse our catalog."
          actionLabel="Back to products"
          onAction={() => {
            window.location.href = '/products'
          }}
        />
      </div>
    )
  }

  const weights = Array.isArray(product.weights) ? product.weights : []
  const certifications = Array.isArray(product.certifications) ? product.certifications : []
  const tags = Array.isArray(product.tags) ? product.tags : []

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.imageUrl,
    brand: { '@type': 'Brand', name: 'Nelna Farm' },
    category: product.category,
    sku: product.id,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'LKR',
      price: '0',
      url: `/products/${product.slug || product.id}`,
    },
  }

  const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin
  const canonical = `${siteUrl}/products/${product.slug || product.id}`
  const whatsappText = encodeURIComponent(
    `Hello Nelna team, I would like to inquire about ${product.name}.`,
  )

  return (
    <div className="page-shell section-spacing space-y-8 pb-28 md:pb-10">
      <SEO
        title={`${product.name} | Nelna Farm`}
        description={product.description}
        image={product.imageUrl}
        canonical={canonical}
        schema={schema}
      />

      <Breadcrumbs
        items={[
          { to: '/', label: 'Home' },
          { to: '/products', label: 'Products' },
          { label: product.name },
        ]}
      />

      {error ? (
        <ErrorState
          title="Using fallback product data"
          description={error}
          retryLabel="Retry"
          onRetry={loadProducts}
        />
      ) : null}

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <ProductGallery product={product} />

        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green-700">
              {product.category || 'Premium Poultry'}
            </p>
            <h1 className="mt-2 font-display text-3xl font-extrabold text-slate-900 md:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
              {product.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} tone="accent" className="normal-case tracking-normal">
                {tag}
              </Badge>
            ))}
            {certifications.map((item) => (
              <Badge key={item} tone="primary" className="normal-case tracking-normal">
                {item}
              </Badge>
            ))}
          </div>

          <div className="surface-card space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">Available Weights</h2>
            {weights.length ? (
              <div className="flex flex-wrap gap-2">
                {weights.map((weight) => (
                  <span
                    key={weight}
                    className="inline-flex rounded-pill bg-brand-green-50 px-3 py-1 text-xs font-semibold text-brand-green-700"
                  >
                    {weight}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">Available on request.</p>
            )}
          </div>

          <div className="surface-card space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">Storage and Handling</h2>
            <p className="text-sm text-slate-600">{product.storage || 'Keep frozen. Storage guidance available per SKU.'}</p>
            <p className="text-sm text-slate-600">Temperature: {product.temperatureRange || '-18°C recommended'}</p>
            <p className="text-sm text-slate-600">Availability: {product.availability || 'Nationwide distribution'}</p>
            <p className="text-sm text-slate-600">Plant/Location: {product.plant || 'Sri Lanka processing facilities'}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <section className="surface-card">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">Nutrition (per 100g)</h2>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-600">
            <p>Calories</p>
            <p className="font-semibold text-slate-800">{product.nutrition?.calories || 'N/A'}</p>
            <p>Protein</p>
            <p className="font-semibold text-slate-800">{product.nutrition?.protein || 'N/A'}</p>
            <p>Fat</p>
            <p className="font-semibold text-slate-800">{product.nutrition?.fat || 'N/A'}</p>
          </div>
        </section>

        <section className="surface-card">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">Ingredients</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {product.ingredients || 'See packaging label for ingredient declaration and allergen notes.'}
          </p>
          <p className="mt-3 text-xs font-medium text-slate-500">
            Batch reference: {product.batchSample || 'Available on request'}
          </p>
        </section>
      </div>

      {relatedProducts.length ? (
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-slate-900">Related Products</h2>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id || item.slug} product={item} />
            ))}
          </div>
        </section>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          Back
        </Button>
        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
          target="_blank"
          rel="noreferrer"
          className="btn-green"
        >
          WhatsApp Inquiry
        </a>
        <Link to="/contact" className="btn-primary">
          Contact Sales
        </Link>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 shadow-popover md:hidden">
        <div className="mx-auto flex max-w-5xl items-center gap-2">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-pill border border-brand-green-200 bg-brand-green-50 px-3 text-sm font-semibold text-brand-green-700"
          >
            WhatsApp
          </a>
          <Link
            to="/contact"
            className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-pill bg-brand-green px-3 text-sm font-semibold text-white transition hover:brightness-95"
          >
            Order Inquiry
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
