import { useMemo, useState } from 'react'
import SectionHeading from '../components/SectionHeading.jsx'
import { batchRecords } from '../data/batches.js'

function Traceability() {
  const [batchId, setBatchId] = useState('')

  const result = useMemo(() => {
    if (!batchId.trim()) return null
    return batchRecords.find((record) => record.batchId.toLowerCase() === batchId.trim().toLowerCase())
  }, [batchId])

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 py-12">
      <SectionHeading
        eyebrow="Traceability"
        title="Batch Lookup"
        subtitle="Verify product batches, processing plants, and cold-chain details."
      />

      <div className="rounded-3xl border border-nelna-green-soft bg-nelna-white p-8">
        <label className="text-xs font-semibold uppercase tracking-widest text-nelna-dark/70">Batch ID</label>
        <input
          value={batchId}
          onChange={(event) => setBatchId(event.target.value)}
          placeholder="Enter batch ID (e.g., NLN-CH-2409-01)"
          className="mt-3 w-full rounded-xl border border-nelna-dark-soft px-4 py-3 text-sm"
        />
        <p className="mt-2 text-xs text-nelna-dark/70">This demo uses internal sample batch data until live system integration.</p>
      </div>

      {batchId && !result && (
        <div className="rounded-3xl border border-nelna-green-soft bg-nelna-green-soft p-8 text-center">
          <p className="text-sm font-semibold text-nelna-dark/80">No batch found.</p>
          <p className="mt-2 text-xs text-nelna-dark/70">Please check the batch ID printed on the pack label.</p>
        </div>
      )}

      {result && (
        <div className="rounded-3xl border border-nelna-green-soft bg-nelna-white p-8">
          <h3 className="text-lg font-semibold text-nelna-dark">Batch {result.batchId}</h3>
          <div className="mt-4 grid gap-2 text-sm text-nelna-dark/80">
            <span>Product: {result.product}</span>
            <span>Plant: {result.plant}</span>
            <span>Packed On: {result.packedOn}</span>
            <span>Best Before: {result.expiresOn}</span>
            <span>Status: {result.status}</span>
            <span>Cold-Chain Range: {result.temperatureRange}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Traceability
