import { UN_SOURCES_BY_CATEGORY } from '../constants/unOfficialLinks'

interface Props {
  /** Optional compact layout (e.g. for sidebars) */
  compact?: boolean
  /** Optional heading level override */
  showHeading?: boolean
}

export default function OfficialUnLinks({ compact = false, showHeading = true }: Props) {
  return (
    <div className="space-y-4">
      {showHeading && (
        <div>
          <h2 className="section-heading text-[var(--text)] mb-0.5">🔗 Official UN links</h2>
          <p className="text-[var(--text-muted)] text-xs sm:text-sm">
            Documents, treaties, main bodies, programmes, missions, and member info. Open in new tab.
          </p>
        </div>
      )}
      <div className={compact ? 'space-y-3' : 'space-y-5'}>
        {UN_SOURCES_BY_CATEGORY.map(({ category, sources }) => (
          <div key={category}>
            <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1.5 sm:mb-2">
              {category}
            </h3>
            <ul className={compact ? 'flex flex-wrap gap-1.5' : 'flex flex-wrap gap-2'}>
              {sources.map(({ name, url }) => (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block rounded-md border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--accent)] hover:bg-[var(--accent-soft)] transition-colors ${
                      compact ? 'px-2 py-1 text-xs' : 'px-2.5 py-1.5 text-sm'
                    }`}
                  >
                    {name} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
