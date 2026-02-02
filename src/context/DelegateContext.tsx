import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface DelegateConferenceState {
  id: string
  name: string
  country: string
  stanceOverview: string
  committeeMatrix: Record<string, string>
  countdownDate: string
  checklist: {
    positionPaper: boolean
    researchTopic: boolean
    researchCountryStance: boolean
    openingSpeech: boolean
    modSpeeches: boolean
  }
  trustedSources: string[]
  nationSources: string[]
  uploadedResources: { name: string; url?: string }[]
}

const defaultConference: DelegateConferenceState = {
  id: 'default',
  name: 'My Conference',
  country: '',
  stanceOverview: '',
  committeeMatrix: {},
  countdownDate: '',
  checklist: {
    positionPaper: false,
    researchTopic: false,
    researchCountryStance: false,
    openingSpeech: false,
    modSpeeches: false,
  },
  trustedSources: [],
  nationSources: [],
  uploadedResources: [],
}

type DelegateContextValue = DelegateConferenceState & {
  setName: (n: string) => void
  setCountry: (c: string) => void
  setStanceOverview: (s: string) => void
  setCommitteeMatrix: (committee: string, firstName: string) => void
  setCountdownDate: (d: string) => void
  toggleChecklist: (key: keyof DelegateConferenceState['checklist']) => void
  addTrustedSource: (s: string) => void
  removeTrustedSource: (i: number) => void
  addNationSource: (s: string) => void
  removeNationSource: (i: number) => void
  addUploadedResource: (name: string, url?: string) => void
  removeUploadedResource: (i: number) => void
}

const DelegateContext = createContext<DelegateContextValue | null>(null)

export function DelegateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DelegateConferenceState>(defaultConference)

  const setName = useCallback((name: string) => setState((s) => ({ ...s, name })), [])
  const setCountry = useCallback((country: string) => setState((s) => ({ ...s, country })), [])
  const setStanceOverview = useCallback((stanceOverview: string) => setState((s) => ({ ...s, stanceOverview })), [])
  const setCommitteeMatrix = useCallback((committee: string, firstName: string) => {
    setState((s) => ({ ...s, committeeMatrix: { ...s.committeeMatrix, [committee]: firstName } }))
  }, [])
  const setCountdownDate = useCallback((countdownDate: string) => setState((s) => ({ ...s, countdownDate })), [])
  const toggleChecklist = useCallback((key: keyof DelegateConferenceState['checklist']) => {
    setState((s) => ({
      ...s,
      checklist: { ...s.checklist, [key]: !s.checklist[key] },
    }))
  }, [])
  const addTrustedSource = useCallback((source: string) => {
    setState((s) => ({ ...s, trustedSources: [...s.trustedSources, source] }))
  }, [])
  const removeTrustedSource = useCallback((i: number) => {
    setState((s) => ({ ...s, trustedSources: s.trustedSources.filter((_, idx) => idx !== i) }))
  }, [])
  const addNationSource = useCallback((source: string) => {
    setState((s) => ({ ...s, nationSources: [...s.nationSources, source] }))
  }, [])
  const removeNationSource = useCallback((i: number) => {
    setState((s) => ({ ...s, nationSources: s.nationSources.filter((_, idx) => idx !== i) }))
  }, [])
  const addUploadedResource = useCallback((name: string, url?: string) => {
    setState((s) => ({ ...s, uploadedResources: [...s.uploadedResources, { name, url }] }))
  }, [])
  const removeUploadedResource = useCallback((i: number) => {
    setState((s) => ({ ...s, uploadedResources: s.uploadedResources.filter((_, idx) => idx !== i) }))
  }, [])

  const value: DelegateContextValue = {
    ...state,
    setName,
    setCountry,
    setStanceOverview,
    setCommitteeMatrix,
    setCountdownDate,
    toggleChecklist,
    addTrustedSource,
    removeTrustedSource,
    addNationSource,
    removeNationSource,
    addUploadedResource,
    removeUploadedResource,
  }

  return <DelegateContext.Provider value={value}>{children}</DelegateContext.Provider>
}

export function useDelegate() {
  const ctx = useContext(DelegateContext)
  if (!ctx) throw new Error('useDelegate must be used within DelegateProvider')
  return ctx
}
