const FORMAT_MIME = {
  webp: 'image/webp',
  avif: 'image/avif',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
}

function normalizePictureSources(sources) {
  if (!sources) return []

  if (Array.isArray(sources)) {
    return sources.filter((source) => source?.src)
  }

  if (typeof sources === 'object') {
    return Object.entries(sources)
      .filter(([, srcSet]) => Boolean(srcSet))
      .map(([format, srcSet]) => ({
        src: srcSet,
        type: FORMAT_MIME[format] ?? `image/${format}`,
      }))
  }

  return []
}

function OptimizedPicture({
  picture,
  alt,
  className = '',
  imgClassName = 'h-full w-full object-cover',
  loading = 'lazy',
  fetchPriority,
  width,
  height,
}) {
  if (!picture?.img?.src) {
    return null
  }

  const sources = normalizePictureSources(picture.sources)

  return (
    <picture className={className}>
      {sources.map((source) => (
        <source key={`${source.type}-${source.src}`} srcSet={source.src} type={source.type} />
      ))}
      <img
        src={picture.img.src}
        alt={alt}
        width={width ?? picture.img.w}
        height={height ?? picture.img.h}
        className={imgClassName}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
      />
    </picture>
  )
}

export default OptimizedPicture
