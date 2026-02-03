import { useState, useRef, useEffect } from 'react'
import { Palette, Sun, Moon, ChevronDown } from 'lucide-react'
import { useTheme, DEFAULT_COLOR_THEME_ID } from '../context/ThemeContext'

/** Theme selector aligned with seamuns.site: Appearance (Light/Dark) + theme colors (Blue, Teal, etc.) */
export default function ThemeSelector() {
  const { colorThemeId, setColorThemeId, colorThemes, colorMode, setColorMode, setThemeId } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [open])

  const current = colorThemes.find((c) => c.id === colorThemeId) ?? colorThemes[0]

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[var(--text)] hover:bg-[var(--bg-card)] border border-[var(--border)] bg-[var(--bg-elevated)] transition-colors"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Theme"
      >
        <Palette className="w-4 h-4 flex-shrink-0 text-[var(--text-muted)]" />
        <span className="hidden sm:inline">Theme</span>
        <span className="text-[var(--brand)]" title={current.label} aria-hidden>
          {current.emoji}
        </span>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 text-[var(--text-muted)] transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>
      {open && (
        <div
          className="absolute right-0 top-full mt-1.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] shadow-[var(--shadow-card)] shadow-lg z-50 min-w-[200px]"
          role="dialog"
          aria-label="Theme options"
        >
          <div className="px-3 py-1.5 text-xs font-medium text-[var(--text-muted)] border-b border-[var(--border)] mb-2">
            Appearance
          </div>
          <div className="flex gap-1 px-2 pb-2">
            <button
              type="button"
              onClick={() => setColorMode('light')}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                colorMode === 'light'
                  ? 'bg-[var(--brand)] text-white shadow-sm'
                  : 'text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text)]'
              }`}
              aria-pressed={colorMode === 'light'}
            >
              <Sun className="w-4 h-4" />
              Light
            </button>
            <button
              type="button"
              onClick={() => setColorMode('dark')}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                colorMode === 'dark'
                  ? 'bg-[var(--brand)] text-white shadow-sm'
                  : 'text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text)]'
              }`}
              aria-pressed={colorMode === 'dark'}
            >
              <Moon className="w-4 h-4" />
              Dark
            </button>
          </div>
          <div className="px-3 py-1.5 text-xs font-medium text-[var(--text-muted)] border-b border-[var(--border)] mb-2">
            Theme color <span className="font-normal">(default: Gold &amp; Blue)</span>
          </div>
          <div className="max-h-[260px] overflow-y-auto" role="listbox" aria-label="Theme color">
            {colorThemes.map((c) => {
              const isDefault = c.id === DEFAULT_COLOR_THEME_ID
              const isSelected = colorThemeId === c.id
              return (
                <button
                  key={c.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    setColorThemeId(c.id)
                    setThemeId('default')
                    setOpen(false)
                  }}
                  className={`flex items-center gap-2 w-full px-3 py-2 text-left text-sm transition-colors whitespace-nowrap min-w-0 ${
                    isSelected
                      ? 'bg-[var(--brand)] text-white'
                      : 'text-[var(--text)] hover:bg-[var(--bg-elevated)]'
                  }`}
                >
                  <span className="text-base flex-shrink-0" aria-hidden>
                    {c.emoji}
                  </span>
                  <span className="truncate">{c.label}</span>
                  {isDefault && (
                    <span
                      className={`ml-1 px-1.5 py-0.5 rounded text-[10px] font-medium flex-shrink-0 ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-[var(--accent-soft)] text-[var(--accent)]'
                      }`}
                    >
                      Default
                    </span>
                  )}
                  {isSelected && (
                    <span className="ml-auto text-white" aria-hidden>
                      ✓
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
