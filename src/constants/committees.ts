/**
 * Committee options derived from MUN simulation (SEAMUNs / munsimulation.seamuns.site style).
 * Used for "Set committee" in Chair Room and Committee Matrix.
 */
export const COMMITTEE_OPTIONS = [
  { value: 'UNSC', label: 'UNSC — Security Council' },
  { value: 'GA', label: 'GA — General Assembly' },
  { value: 'DISEC', label: 'DISEC — Disarmament & International Security (GA1)' },
  { value: 'ECOFIN', label: 'ECOFIN — Economic & Financial (GA2)' },
  { value: 'SOCHUM', label: 'SOCHUM — Social, Cultural & Humanitarian (GA3)' },
  { value: 'SPECPOL', label: 'SPECPOL — Special Political & Decolonization (GA4)' },
  { value: 'ECOSOC', label: 'ECOSOC — Economic and Social Council' },
  { value: 'UNHRC', label: 'UNHRC — Human Rights Council' },
  { value: 'WHO', label: 'WHO — World Health Organization' },
  { value: 'UNICEF', label: 'UNICEF — Children\'s Fund' },
  { value: 'UNEP', label: 'UNEP — Environment Programme' },
  { value: 'ICJ', label: 'ICJ — International Court of Justice' },
  { value: 'Crisis', label: 'Crisis Committee' },
] as const

export const COMMITTEE_VALUES = COMMITTEE_OPTIONS.map((c) => c.value)
export type CommitteeValue = (typeof COMMITTEE_OPTIONS)[number]['value']

export const OTHER_COMMITTEE_VALUE = '__OTHER__'
export const isOtherCommittee = (v: string) => v === OTHER_COMMITTEE_VALUE
