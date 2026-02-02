import { useState } from 'react'
import { useChair } from '../../context/ChairContext'
import { Plus, Trash2, User } from 'lucide-react'

const TRADITIONAL = [
  'USA', 'UK', 'France', 'China', 'Russia', 'Germany', 'Japan', 'India', 'Brazil', 'Canada',
  'Australia', 'Italy', 'South Korea', 'Mexico', 'Indonesia', 'South Africa', 'Egypt', 'Nigeria', 'Kenya', 'Saudi Arabia',
]

export default function ChairDelegates() {
  const { delegates, addDelegate, removeDelegate, committee } = useChair()
  const [country, setCountry] = useState('')
  const [name, setName] = useState('')
  const [useTraditional, setUseTraditional] = useState(true)
  const [addingBulk, setAddingBulk] = useState(false)

  const addOne = () => {
    if (!country.trim()) return
    addDelegate({
      country: country.trim(),
      name: name.trim() || undefined,
      committee: committee || undefined,
      present: false,
    })
    setCountry('')
    setName('')
  }

  const addTraditional = () => {
    TRADITIONAL.forEach((c) => {
      if (!delegates.some((d) => d.country === c)) {
        addDelegate({ country: c, committee: committee || undefined, present: false })
      }
    })
    setAddingBulk(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl text-[var(--text)] mb-1">Delegates</h2>
        <p className="text-[var(--text-muted)] text-sm">Add or remove delegates. Use traditional allocation or custom.</p>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 space-y-4">
        <h3 className="text-sm font-medium text-[var(--text)]">Add delegate</h3>
        <div className="flex flex-wrap gap-3 items-end">
          <label className="flex flex-col gap-1">
            <span className="text-xs text-[var(--text-muted)]">Country</span>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="e.g. France"
              className="w-40 px-3 py-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--text-muted)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-[var(--text-muted)]">Name (optional)</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Delegate name"
              className="w-40 px-3 py-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--text-muted)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
          </label>
          <button
            onClick={addOne}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        <div className="pt-2 border-t border-[var(--border)]">
          <button
            onClick={() => setUseTraditional(!useTraditional)}
            className="text-sm text-[var(--accent)] hover:underline"
          >
            {useTraditional ? 'Hide' : 'Show'} traditional allocation
          </button>
          {useTraditional && (
            <div className="mt-3 flex flex-wrap gap-2">
              {TRADITIONAL.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setCountry(c)
                    setName('')
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text)] text-sm hover:border-[var(--accent)] transition-colors"
                >
                  {c}
                </button>
              ))}
              <button
                onClick={() => setAddingBulk(true)}
                className="px-3 py-1.5 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] text-sm font-medium"
              >
                Add all missing
              </button>
            </div>
          )}
        </div>
      </div>

      {addingBulk && (
        <div className="rounded-xl border border-[var(--gold)] bg-[var(--gold-soft)] p-4 flex items-center justify-between">
          <p className="text-sm text-[var(--text)]">Add all traditional countries not yet in the list?</p>
          <div className="flex gap-2">
            <button onClick={() => setAddingBulk(false)} className="px-3 py-1.5 rounded-lg bg-[var(--bg-card)] text-sm">Cancel</button>
            <button onClick={addTraditional} className="px-3 py-1.5 rounded-lg bg-[var(--gold)] text-[var(--bg-base)] text-sm font-medium">Add all</button>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--border)] flex items-center gap-2">
          <User className="w-4 h-4 text-[var(--text-muted)]" />
          <span className="text-sm font-medium text-[var(--text)]">Current delegates ({delegates.length})</span>
        </div>
        <ul className="divide-y divide-[var(--border)] max-h-80 overflow-auto">
          {delegates.map((d) => (
            <li key={d.id} className="px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-[var(--text)]">
                <strong className="text-[var(--accent)]">{d.country}</strong>
                {d.name && <span className="text-[var(--text-muted)] ml-2">— {d.name}</span>}
              </span>
              <button
                onClick={() => removeDelegate(d.id)}
                className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--danger)] hover:bg-[var(--bg-elevated)] transition-colors"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
