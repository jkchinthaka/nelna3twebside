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

  return (
    <picture className={className}>
      {picture.sources?.map((source) => (
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
