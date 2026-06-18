import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SEO from '../components/SEO.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { EmptyState, ErrorState, Skeleton } from '../components/ui/index.js'
import { getNews, getNewsById } from '../services/newsService.js'
import { fallbackNews } from '../data/news.js'

function NewsDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [allNews, setAllNews] = useState(fallbackNews)

  useEffect(() => {
    let mounted = true

    const load = async () => {
      setLoading(true)
      setError('')

      try {
        const [articleResponse, listResponse] = await Promise.all([
          getNewsById(id),
          getNews(),
        ])

        if (!mounted) return

        if (articleResponse) {
          setArticle(articleResponse)
        } else {
          const fallback = fallbackNews.find((item) => item.id === id)
          setArticle(fallback || null)
        }

        if (Array.isArray(listResponse) && listResponse.length) {
          setAllNews(listResponse)
        }
      } catch (requestError) {
        console.error('Failed to load news article', requestError)
        if (!mounted) return
        setError('Unable to load full article details. Displaying fallback content when available.')
        setArticle(fallbackNews.find((item) => item.id === id) || null)
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [id])

  const relatedNews = useMemo(() => {
    if (!article) return []
    return allNews
      .filter((item) => item.id !== article.id && item.category === article.category)
      .slice(0, 3)
  }, [allNews, article])

  if (loading) {
    return (
      <div className="page-shell section-spacing space-y-4">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    )
  }

  if (!article) {
    return (
      <div className="page-shell section-spacing">
        <EmptyState
          title="Article not found"
          description="This news item is unavailable."
          actionLabel="Back to news"
          onAction={() => navigate('/news')}
        />
      </div>
    )
  }

  return (
    <div className="page-shell section-spacing space-y-7">
      <SEO
        title={`${article.title} | Nelna Farm News`}
        description={article.summary}
        image={article.imageUrl}
        canonical={`${window.location.origin}/news/${article.id}`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: article.title,
          description: article.summary,
          image: article.imageUrl,
          datePublished: article.date,
          author: { '@type': 'Organization', name: 'Nelna Farm' },
          publisher: { '@type': 'Organization', name: 'Nelna Farm' },
        }}
      />

      <Link to="/news" className="text-sm font-semibold text-brand-green-700">Back to news</Link>

      {error ? <ErrorState title="Fallback article mode" description={error} /> : null}

      <SectionHeading eyebrow={article.category || 'News'} title={article.title} subtitle={article.summary} align="left" />

      <p className="text-xs font-semibold uppercase tracking-wide text-nelna-dark/70">
        Published {article.date || 'Date unavailable'}
      </p>

      {article.imageUrl ? (
        <div className="overflow-hidden rounded-2xl border border-nelna-dark-soft">
          <img src={article.imageUrl} alt={article.title || 'Nelna news image'} className="h-[380px] w-full object-cover" loading="lazy" />
        </div>
      ) : null}

      <article className="surface-card">
        <div className="prose max-w-none text-sm leading-relaxed text-nelna-dark/90">
          {article.body}
        </div>
      </article>

      {relatedNews.length ? (
        <section className="space-y-3">
          <h2 className="font-display text-2xl font-bold text-nelna-dark">Related News</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {relatedNews.map((item) => (
              <Link
                key={item.id}
                to={`/news/${item.id}`}
                className="rounded-xl border border-nelna-dark-soft bg-nelna-white p-4 text-sm font-semibold text-nelna-dark/90 transition hover:border-brand-green-300 hover:text-brand-green-700"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}

export default NewsDetail
