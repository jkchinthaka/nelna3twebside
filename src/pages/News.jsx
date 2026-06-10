import { useEffect, useMemo, useState } from 'react'
import NewsCard from '../components/NewsCard.jsx'
import {
  EmptyState,
  ErrorState,
  Input,
  Pagination,
  Skeleton,
} from '../components/ui/index.js'
import { getNews } from '../services/newsService.js'
import { fallbackNews } from '../data/news.js'

function News() {
  const [news, setNews] = useState(fallbackNews)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true)
      setError('')
      try {
        const response = await getNews()
        if (Array.isArray(response) && response.length) {
          const merged = [...fallbackNews, ...response].reduce((acc, item) => {
            if (!item?.id) return acc
            acc[item.id] = { ...acc[item.id], ...item }
            return acc
          }, {})
          setNews(Object.values(merged))
        } else {
          setNews(fallbackNews)
        }
      } catch {
        setError('News feed is temporarily unavailable. Showing fallback highlights.')
        setNews(fallbackNews)
      } finally {
        setLoading(false)
      }
    }

    loadNews()
  }, [])

  useEffect(() => {
    setPage(1)
  }, [category, search])

  const categories = useMemo(() => {
    const set = new Set(news.map((item) => item.category || 'Community'))
    return ['All', ...Array.from(set)]
  }, [news])

  const filteredNews = useMemo(() => {
    const query = search.trim().toLowerCase()

    return news.filter((item) => {
      const matchesCategory = category === 'All' || (item.category || 'Community') === category
      const haystack = `${item.title || ''} ${item.summary || ''} ${item.body || ''}`.toLowerCase()
      const matchesQuery = !query || haystack.includes(query)
      return matchesCategory && matchesQuery
    })
  }, [news, category, search])

  const pageSize = 6
  const totalPages = Math.max(1, Math.ceil(filteredNews.length / pageSize))
  const pageItems = filteredNews.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="bg-slate-50">
      <section className="surface-brand-green py-16">
        <div className="page-shell">
          <p className="inline-flex rounded-pill border border-brand-yellow-300/60 bg-brand-yellow-500/28 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-yellow-50">
            Newsroom
          </p>
          <h1 className="mt-5 font-display text-4xl font-extrabold tracking-[0.01em] text-white md:text-5xl">Latest News and Updates</h1>
          <p className="mt-4 max-w-3xl text-base font-medium leading-relaxed text-white md:text-lg">
            Follow product launches, quality milestones, sustainability updates, and corporate announcements from Nelna Farm.
          </p>
        </div>
      </section>

      <section className="page-shell section-spacing space-y-6">
        <div className="surface-card space-y-4">
          <Input
            label="Search news"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title, category, or topic"
          />
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`inline-flex min-h-[40px] items-center rounded-pill border px-4 text-sm font-semibold transition ${
                  category === item
                    ? 'border-brand-green bg-brand-green text-white'
                    : 'border-slate-400 text-slate-800 hover:border-brand-green-400 hover:text-brand-green-800'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <p className="text-sm text-slate-700">
            Showing <span className="font-semibold text-brand-green-700">{filteredNews.length}</span> article(s)
          </p>
        </div>

        {error ? <ErrorState title="News fallback mode" description={error} /> : null}

        {loading ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={`news-skeleton-${index}`} className="h-[360px] rounded-2xl" />
            ))}
          </div>
        ) : pageItems.length ? (
          <>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {pageItems.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        ) : (
          <EmptyState
            title="No news articles found"
            description="Try a different category or search keyword."
            actionLabel="Reset"
            onAction={() => {
              setSearch('')
              setCategory('All')
            }}
          />
        )}
      </section>
    </div>
  )
}

export default News
