import { useEffect, useState } from 'react'
import AdminShell from '../../components/AdminShell.jsx'
import {
  createSite,
  getLatestAudit,
  getSites,
  runAudit,
} from '../../services/siteHealthService.js'
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  EmptyState,
  ErrorState,
  Input,
  Skeleton,
  StatCard,
  useToast,
} from '../../components/ui/index.js'

const initialForm = {
  name: 'Nelna Farm',
  baseUrl: 'https://nelna.lk',
  country: 'Sri Lanka',
  industry: 'Food & FMCG',
}

function SiteHealthDashboard() {
  const toast = useToast()
  const [sites, setSites] = useState([])
  const [audits, setAudits] = useState({})
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')
  const [formState, setFormState] = useState(initialForm)
  const [running, setRunning] = useState({})

  const loadSites = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getSites()
      setSites(data)
      const auditResponses = await Promise.all(
        data.map((site) => getLatestAudit(site._id).catch(() => ({ audit: null })))
      )
      const auditMap = data.reduce((acc, site, index) => {
        acc[site._id] = auditResponses[index]
        return acc
      }, {})
      setAudits(auditMap)
    } catch (err) {
      setError(err.message || 'Failed to load sites')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSites()
  }, [])

  const handleCreate = async (event) => {
    event.preventDefault()
    setCreating(true)
    setError('')
    try {
      await createSite(formState)
      setFormState(initialForm)
      await loadSites()
      toast.success('Site registered successfully.')
    } catch (err) {
      setError(err.message || 'Failed to create site')
      toast.error('Failed to create site.')
    } finally {
      setCreating(false)
    }
  }

  const handleRunAudit = async (siteId) => {
    setRunning((prev) => ({ ...prev, [siteId]: true }))
    setError('')
    try {
      await runAudit(siteId, { maxPages: 50, maxDepth: 2 })
      const latest = await getLatestAudit(siteId)
      setAudits((prev) => ({ ...prev, [siteId]: latest }))
      toast.success('Audit completed.')
    } catch (err) {
      setError(err.message || 'Audit failed')
      toast.error('Audit failed.')
    } finally {
      setRunning((prev) => ({ ...prev, [siteId]: false }))
    }
  }

  const getSeverityTone = (severity) => {
    const key = String(severity || '').toLowerCase()
    if (key === 'red' || key === 'critical' || key === 'high') return 'danger'
    if (key === 'yellow' || key === 'warning' || key === 'medium') return 'accent'
    return 'neutral'
  }

  return (
    <AdminShell
      title="SEO & Site Health"
      subtitle="Run automated audits, monitor Core Web Vitals, and prioritize SEO fixes."
    >
      {error ? (
        <ErrorState
          title="Unable to complete operation"
          description={error}
          retryLabel="Retry"
          onRetry={loadSites}
        />
      ) : null}

      <section className="surface-card">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Register a site</h2>
        <form onSubmit={handleCreate} className="mt-4 grid gap-3 md:grid-cols-2">
          <Input
            label="Site name"
            value={formState.name}
            onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
            required
          />
          <Input
            label="Base URL"
            value={formState.baseUrl}
            onChange={(event) => setFormState((prev) => ({ ...prev, baseUrl: event.target.value }))}
            required
          />
          <Input
            label="Country"
            value={formState.country}
            onChange={(event) => setFormState((prev) => ({ ...prev, country: event.target.value }))}
          />
          <Input
            label="Industry"
            value={formState.industry}
            onChange={(event) => setFormState((prev) => ({ ...prev, industry: event.target.value }))}
          />
          <div className="md:col-span-2">
            <Button type="submit" loading={creating}>Save Site</Button>
          </div>
        </form>
      </section>

      <section className="mt-6 space-y-4">
        {loading ? (
          <div className="grid gap-4">
            <Skeleton className="h-44" />
            <Skeleton className="h-44" />
          </div>
        ) : sites.length === 0 ? (
          <EmptyState
            title="No sites registered"
            description="Register your first site to begin automated SEO and performance audits."
          />
        ) : (
          <div className="grid gap-4">
            {sites.map((site) => {
              const auditData = audits[site._id]
              const audit = auditData?.audit
              const stats = auditData?.stats
              const issues = auditData?.latestIssues || []
              const finishedAt = audit?.finishedAt ? new Date(audit.finishedAt).toLocaleString() : 'N/A'

              return (
                <Card key={site._id}>
                  <CardHeader>
                    <div>
                      <CardTitle>{site.name}</CardTitle>
                      <p className="text-sm text-slate-500 dark:text-slate-300">{site.baseUrl}</p>
                    </div>
                    <Button onClick={() => handleRunAudit(site._id)} loading={Boolean(running[site._id])}>
                      {running[site._id] ? 'Running audit...' : 'Run Audit'}
                    </Button>
                  </CardHeader>

                  {audit ? (
                    <CardBody className="space-y-4">
                      <div className="grid gap-3 lg:grid-cols-3">
                        <StatCard title="Overall score" value={audit.overallScore ?? 0} hint={`Last run ${finishedAt}`} />
                        <StatCard
                          title="Issues"
                          value={`${stats?.issues?.red || 0} critical`}
                          hint={`${stats?.issues?.yellow || 0} warnings · ${stats?.pagesAudited || 0} pages audited`}
                          tone="accent"
                        />
                        <StatCard
                          title="Performance"
                          value={`${audit.performanceScore ?? 0} / 100`}
                          hint={`Technical: ${audit.technicalScore ?? 0} · Content: ${audit.contentScore ?? 0}`}
                        />
                      </div>

                      {issues.length > 0 ? (
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Latest issues</p>
                          <div className="grid gap-2">
                            {issues.slice(0, 6).map((issue, index) => (
                              <div
                                key={issue._id || `${site._id}-issue-${index}`}
                                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                              >
                                <Badge tone={getSeverityTone(issue.severity)} className="mr-2">{issue.severity || 'issue'}</Badge>
                                {issue.message}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </CardBody>
                  ) : (
                    <CardBody>
                      <EmptyState
                        title="No audits yet"
                        description="Run your first scan to see scores and issue breakdowns for this site."
                      />
                    </CardBody>
                  )}
                </Card>
              )
            })}
          </div>
        )}
      </section>
    </AdminShell>
  )
}

export default SiteHealthDashboard
