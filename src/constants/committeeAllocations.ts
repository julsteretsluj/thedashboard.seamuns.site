/**
 * Possible participants (country/delegation allocations) per committee.
 * Used in Chair Room (add delegate) and Delegate Matrix (delegation dropdown per committee).
 * Real participants (already in the room) are merged in at runtime in Chair.
 * Non-traditional committees (Arab League, EU, IOC, UKPC, Press Corps, HCC) guided by THAIMUN-style allocations.
 */
import { DELEGATION_OPTIONS } from './delegations'
import { COMMITTEE_OPTIONS } from './committees'
import { US_SENATE_ALLOCATION_OPTIONS } from './usSenate'
import {
  ARAB_LEAGUE_ALLOCATION,
  EU_ALLOCATION,
  IOC_ALLOCATION,
  UKPC_ALLOCATION,
  PRESS_CORPS_ALLOCATION,
  HCC_ALLOCATION,
} from './nonTraditionalAllocations'

/** UNSC: 5 permanent + 10 elected (example composition; chairs can add custom via "Other"). */
const UNSC_DELEGATIONS = [
  'China',
  'France',
  'Russian Federation',
  'United Kingdom',
  'United States',
  'Albania',
  'Brazil',
  'Gabon',
  'Ghana',
  'India',
  'Ireland',
  'Kenya',
  'Mexico',
  'Norway',
  'United Arab Emirates',
] as const

/** Historical Security Council: same 15 as typical UNSC. */
const HSC_DELEGATIONS = [...UNSC_DELEGATIONS]

/** Committees that use a limited allocation (e.g. UNSC 15, US Senate 100, Arab League, EU, etc.). Others get full UNGA. */
const LIMITED_ALLOCATION_COMMITTEES: Record<string, readonly string[]> = {
  UNSC: UNSC_DELEGATIONS,
  'SC / UNSC — Security Council': UNSC_DELEGATIONS,
  HSC: HSC_DELEGATIONS,
  'HSC — Historical Security Council': HSC_DELEGATIONS,
  'US-Senate': US_SENATE_ALLOCATION_OPTIONS,
  'US Senate — United States Senate': US_SENATE_ALLOCATION_OPTIONS,
  // Non-traditional (THAIMUN-style)
  AL: ARAB_LEAGUE_ALLOCATION,
  'AL — Arab League': ARAB_LEAGUE_ALLOCATION,
  EU: EU_ALLOCATION,
  'EU — European Union': EU_ALLOCATION,
  IOPC: IOC_ALLOCATION,
  'IOPC — International Olympic and Paralympic Committee': IOC_ALLOCATION,
  UKPC: UKPC_ALLOCATION,
  'UKPC — UK Parliament Committee': UKPC_ALLOCATION,
  PC: PRESS_CORPS_ALLOCATION,
  'PC — Press Corps': PRESS_CORPS_ALLOCATION,
  HCC: HCC_ALLOCATION,
  'HCC — Historical Crisis Committee': HCC_ALLOCATION,
}

const FULL_UNGA = [...DELEGATION_OPTIONS]

/** Resolve committee string (value or label) to canonical option value for lookup. */
function resolveCommitteeKey(committeeValueOrLabel: string): string {
  const key = committeeValueOrLabel?.trim() ?? ''
  if (!key) return ''
  const option = COMMITTEE_OPTIONS.find((o) => o.value === key || o.label === key)
  return option ? option.value : key
}

/**
 * Returns possible delegation (country) options for a committee.
 * Use in Chair when adding delegates and in Delegate Matrix per-committee tab.
 * @param committeeValueOrLabel - Committee value (e.g. UNSC, AL) or display label; custom names get full UNGA.
 */
export function getDelegationsForCommittee(committeeValueOrLabel: string): string[] {
  if (!committeeValueOrLabel || !committeeValueOrLabel.trim()) {
    return FULL_UNGA
  }
  const key = committeeValueOrLabel.trim()
  // Try exact key first (value or label)
  let limited = LIMITED_ALLOCATION_COMMITTEES[key]
  if (limited) return [...limited]
  // Resolve to canonical value and try again
  const canonical = resolveCommitteeKey(key)
  if (canonical) {
    limited = LIMITED_ALLOCATION_COMMITTEES[canonical]
    if (limited) return [...limited]
    const label = COMMITTEE_OPTIONS.find((o) => o.value === canonical)?.label
    if (label) limited = LIMITED_ALLOCATION_COMMITTEES[label]
    if (limited) return [...limited]
  }
  return FULL_UNGA
}

/**
 * Returns allocation options for a committee, merging real participants (already in the room)
 * with possible participants. Real participants appear first so chairs see who's already added.
 * @param committeeValueOrLabel - Current committee
 * @param alreadyInRoom - Country names already added as delegates (real participants)
 */
export function getAllocationOptionsForCommittee(
  committeeValueOrLabel: string,
  alreadyInRoom: string[]
): string[] {
  const possible = getDelegationsForCommittee(committeeValueOrLabel)
  const inRoomSet = new Set(alreadyInRoom)
  const possibleSet = new Set(possible)
  const onlyInRoom = alreadyInRoom.filter((c) => !possibleSet.has(c))
  const inRoomAndPossible = alreadyInRoom.filter((c) => possibleSet.has(c))
  const notYetInRoom = possible.filter((c) => !inRoomSet.has(c))
  return [...inRoomAndPossible, ...notYetInRoom, ...onlyInRoom]
}
