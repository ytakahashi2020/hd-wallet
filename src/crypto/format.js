// Small formatting helpers shared across the crypto layer and UI.
// All inputs are Uint8Array unless noted.

const HEX = '0123456789abcdef'

export function bytesToHex(bytes) {
  let out = ''
  for (let i = 0; i < bytes.length; i++) {
    out += HEX[bytes[i] >> 4] + HEX[bytes[i] & 15]
  }
  return out
}

// Convert bytes into a flat string of bits, e.g. "01101001...".
export function bytesToBits(bytes) {
  let out = ''
  for (let i = 0; i < bytes.length; i++) {
    out += bytes[i].toString(2).padStart(8, '0')
  }
  return out
}

// Split a string into fixed-size chunks (used for the 11-bit entropy view).
export function chunk(str, size) {
  const out = []
  for (let i = 0; i < str.length; i += size) {
    out.push(str.slice(i, i + size))
  }
  return out
}

// Shorten a long hex/address string for display: "abcd…wxyz".
export function truncate(str, head = 8, tail = 6) {
  if (str.length <= head + tail + 1) return str
  return `${str.slice(0, head)}…${str.slice(-tail)}`
}

// Fraction of differing bits between two equal-length byte arrays (0..1).
// Used for the Step 2 "avalanche effect" meter.
export function bitDiffRatio(a, b) {
  const len = Math.min(a.length, b.length)
  if (len === 0) return 0
  let diff = 0
  for (let i = 0; i < len; i++) {
    let x = a[i] ^ b[i]
    while (x) {
      diff += x & 1
      x >>= 1
    }
  }
  return diff / (len * 8)
}
