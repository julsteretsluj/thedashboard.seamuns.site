import { useState, useEffect } from 'react'
import { COMMITTEE_OPTIONS } from '../constants/committees'

export interface CommitteeOption {
  value: string
  label: string
}

/**
 * Committee list for dropdowns. Fetches /committees.json at runtime so the live
 * server's file is used (avoids stale cached bundle). Falls back to built-in list.
 */
export function useCommitteeOptions(): CommitteeOption[] {
  const [options, setOptions] = useState<CommitteeOption[]>(() =>
    COMMITTEE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))
  )

  useEffect(() => {
    fetch('/committees.json')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('Not ok'))))
      .then((data: unknown) => {
        if (Array.isArray(data) && data.length > 0 && data.every((x) => x && typeof x.value === 'string' && typeof x.label === 'string')) {
          setOptions(data as CommitteeOption[])
        }
      })
      .catch(() => {})
  }, [])

  return options
}
