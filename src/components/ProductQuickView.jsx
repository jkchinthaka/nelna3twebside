import { Link } from 'react-router-dom'
import { Badge, Modal } from './ui/index.js'

function ProductQuickView({ product, open, onClose }) {
  if (!product) {
    return null
  }

  const detailPath = `/products/${product.slug || product.id}`
  const weights = Array.isArray(product.weights) ? product.weights : []
  const certs = Array.isArray(product.certifications) ? product.certifications : []

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={product.name || 'Product details'}
      footer={
        <>
          <Link
            to={detailPath}
            onClick={onClose}
            className="inline-flex min-h-[44px] items-center justify-center rounded-pill border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Open Full Details
          </Link>
          <button type="button" onClick={onClose} className="btn-primary px-5 py-2.5 text-sm">
            Close
          </button>
        </>
      }
    >
      <div className="grid gap-5 md:grid-cols-[220px_1fr]">
        <div className="h-52 overflow-hidden rounded-xl bg-slate-100">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name || 'Product image'} className="h-full w-full object-cover" />
          ) : null}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-green-700">
            {product.category || 'Premium Poultry'}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{product.description || 'Product details available on request.'}</p>

          <div className="mt-4 space-y-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Weights</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {weights.length ? (
                  weights.map((weight) => (
                    <Badge key={weight} tone="primary" className="normal-case tracking-normal">
                      {weight}
                    </Badge>
                  ))
                ) : (
                  <span className="text-xs text-slate-500">Available on request</span>
                )}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Certifications</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {certs.length ? (
                  certs.map((item) => (
                    <Badge key={item} tone="accent" className="normal-case tracking-normal">
                      {item}
                    </Badge>
                  ))
                ) : (
                  <span className="text-xs text-slate-500">Certification details available on request</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ProductQuickView
