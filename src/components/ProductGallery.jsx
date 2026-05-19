import { useMemo, useState } from 'react'

function ProductGallery({ product }) {
  const images = useMemo(() => {
    const gallery = Array.isArray(product?.gallery) ? product.gallery.filter(Boolean) : []
    const main = product?.imageUrl ? [product.imageUrl] : []
    const unique = Array.from(new Set([...main, ...gallery]))
    return unique
  }, [product])

  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
        {images.length ? (
          <img
            src={images[Math.min(activeIndex, images.length - 1)]}
            alt={product?.name || 'Product image'}
            className="h-[340px] w-full object-cover md:h-[460px]"
            loading="eager"
          />
        ) : (
          <div className="flex h-[340px] items-center justify-center text-sm text-slate-500 md:h-[460px]">
            Product image will be available soon.
          </div>
        )}
      </div>

      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-2">
          {images.slice(0, 8).map((image, index) => (
            <button
              type="button"
              key={`${image}-${index}`}
              onClick={() => setActiveIndex(index)}
              className={`overflow-hidden rounded-lg border ${
                index === activeIndex ? 'border-brand-green-500 ring-2 ring-brand-green-200' : 'border-slate-200'
              }`}
              aria-label={`View product image ${index + 1}`}
            >
              <img
                src={image}
                alt={`${product?.name || 'Product'} thumbnail ${index + 1}`}
                className="h-16 w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default ProductGallery
