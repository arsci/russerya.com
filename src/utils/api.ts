import { NextRequest, NextResponse } from 'next/server'

/** Cap on request bodies for the form endpoints. They carry a few short fields. */
const MAX_BODY_BYTES = 10_000

export function jsonResponse(data: unknown, status: number) {
  return new NextResponse(JSON.stringify({ data }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

/**
 * Reads and parses a JSON body, rejecting oversized or malformed input.
 * Returns null when the body is unusable so callers can respond with a 400.
 */
export async function readJsonBody(
  req: NextRequest
): Promise<Record<string, unknown> | null> {
  const declared = req.headers.get('content-length')
  if (declared && Number(declared) > MAX_BODY_BYTES) return null

  let raw: string
  try {
    raw = await req.text()
  } catch {
    return null
  }
  if (raw.length > MAX_BODY_BYTES) return null

  try {
    const parsed = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return null
    }
    return parsed as Record<string, unknown>
  } catch {
    return null
  }
}

/** Trimmed string value, or "" when the field is missing or the wrong type. */
export function field(body: Record<string, unknown>, key: string): string {
  const v = body[key]
  return typeof v === 'string' ? v.trim() : ''
}

/**
 * Pragmatic email check: one @, no whitespace, a dot in the domain, and a
 * sane length. Deliberately not RFC 5322 — the point is to reject obvious
 * junk before it reaches a third-party API, not to be exhaustive.
 */
export function isValidEmail(value: string): boolean {
  if (value.length < 3 || value.length > 254) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}
