import { useChair } from '../../context/ChairContext'

export default function ChairRoomView() {
  const { delegates, committee, topic } = useChair()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl text-[var(--text)] mb-1">Digital Room View</h2>
        <p className="text-[var(--text-muted)] text-sm">
          {committee} — {topic}
        </p>
      </div>
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 min-h-[320px]">
        {delegates.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-[var(--text-muted)]">
            <p className="text-sm">No delegates in the room yet.</p>
            <p className="text-xs mt-1">Add delegates from the Delegates section.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {delegates.map((d) => (
              <div
                key={d.id}
                className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-3 text-center"
              >
                <div className="text-xs font-medium text-[var(--accent)] uppercase tracking-wide">
                  {d.country}
                </div>
                <div className="text-sm text-[var(--text)] mt-1 font-medium">
                  {d.name || '—'}
                </div>
                {d.committee && (
                  <div className="text-xs text-[var(--text-muted)] mt-0.5">{d.committee}</div>
                )}
                {d.present !== undefined && (
                  <span
                    className={`inline-block mt-2 w-2 h-2 rounded-full ${
                      d.present ? 'bg-[var(--success)]' : 'bg-[var(--text-muted)]'
                    }`}
                    title={d.present ? 'Present' : 'Absent'}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
