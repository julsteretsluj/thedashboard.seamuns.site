import { useState } from 'react'
import { useDelegate } from '../../context/DelegateContext'
import { Plus } from 'lucide-react'
import { COMMITTEE_OPTIONS, OTHER_COMMITTEE_VALUE } from '../../constants/committees'

export default function DelegateMatrix() {
  const { committeeMatrix, setCommitteeMatrix } = useDelegate()
  const [committeeSelect, setCommitteeSelect] = useState('')
  const [committeeCustom, setCommitteeCustom] = useState('')
  const [firstName, setFirstName] = useState('')

  const add = () => {
    const comm = committeeSelect === OTHER_COMMITTEE_VALUE ? committeeCustom.trim() : committeeSelect
    if (!comm || !firstName.trim()) return
    setCommitteeMatrix(comm, firstName.trim())
    setCommitteeSelect('')
    setCommitteeCustom('')
    setFirstName('')
  }

  const entries = Object.entries(committeeMatrix)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold text-2xl text-[var(--text)] mb-1">📊 Committee Matrix</h2>
        <p className="text-[var(--text-muted)] text-sm">First names only — who is in which committee.</p>
      </div>
      <div className="card-block p-4 space-y-3">
        <h3 className="text-sm font-medium text-[var(--text)]">➕ Add entry</h3>
        <div className="flex flex-wrap gap-2 items-end">
          <label className="flex flex-col gap-1">
            <span className="text-xs text-[var(--text-muted)]">Committee</span>
            <select
              value={committeeSelect}
              onChange={(e) => setCommitteeSelect(e.target.value)}
              className="min-w-[10rem] px-3 py-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              aria-label="Committee"
            >
              <option value="">Select committee…</option>
              {COMMITTEE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
              <option value={OTHER_COMMITTEE_VALUE}>Other (custom)</option>
            </select>
            {committeeSelect === OTHER_COMMITTEE_VALUE && (
              <input
                type="text"
                value={committeeCustom}
                onChange={(e) => setCommitteeCustom(e.target.value)}
                placeholder="Committee name"
                className="mt-1 min-w-[10rem] px-3 py-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--text-muted)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                aria-label="Custom committee name"
              />
            )}
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-[var(--text-muted)]">First name only</span>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="e.g. Alex"
              className="w-28 px-3 py-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--text-muted)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
          </label>
          <button
            onClick={add}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm font-medium hover:opacity-90"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>
      <div className="card-block overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--border)]">
          <h3 className="text-sm font-medium text-[var(--text)]">▸ Matrix</h3>
        </div>
        <ul className="divide-y divide-[var(--border)] max-h-80 overflow-auto">
          {entries.length === 0 ? (
            <li className="px-4 py-8 text-center text-[var(--text-muted)] text-sm">No entries yet.</li>
          ) : (
            entries.map(([comm, name]) => (
              <li key={comm} className="px-4 py-3 flex items-center justify-between">
                <span className="text-sm text-[var(--accent)] font-medium">{comm}</span>
                <span className="text-sm text-[var(--text)]">{name}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}
