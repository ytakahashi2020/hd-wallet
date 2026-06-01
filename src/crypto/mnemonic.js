// BIP-39 mnemonic generation and the entropy → words mapping, exposed so the
// UI can visualise the 11-bit-per-word structure.
import {
  generateMnemonic as bip39Generate,
  entropyToMnemonic,
  mnemonicToEntropy,
  validateMnemonic,
} from '@scure/bip39'
import { wordlist as englishWordlist } from '@scure/bip39/wordlists/english.js'
import { sha256 } from '@noble/hashes/sha2.js'
import { bytesToBits } from './format.js'

export { englishWordlist }

// strengthBits: 128 → 12 words, 256 → 24 words.
export function wordCountForStrength(strengthBits) {
  return (strengthBits / 32) * 3
}

// Generate fresh entropy ourselves (so we can show it), then derive the words
// from it. Returns both the raw entropy and the resulting mnemonic.
export function generateFromEntropy(strengthBits = 128) {
  const entropy = new Uint8Array(strengthBits / 8)
  crypto.getRandomValues(entropy)
  const mnemonic = entropyToMnemonic(entropy, englishWordlist)
  return { entropy, mnemonic }
}

export function generateMnemonic(strengthBits = 128) {
  return bip39Generate(englishWordlist, strengthBits)
}

export function isValidMnemonic(mnemonic) {
  return validateMnemonic(mnemonic, englishWordlist)
}

export function mnemonicToEntropyBytes(mnemonic) {
  return mnemonicToEntropy(mnemonic, englishWordlist)
}

// Build the data needed to visualise how entropy + checksum become words.
// BIP-39: take ENT bits of entropy, append a checksum of CS = ENT/32 bits
// (the first CS bits of SHA256(entropy)), then split the combined ENT+CS bits
// into 11-bit groups; each group is an index into the 2048-word list.
//
// Because the words ARE that bit string re-chunked, we reconstruct the exact
// entropy+checksum bit sequence and tag, within each 11-bit group, which bits
// are entropy and which are checksum. This keeps the picture faithful to the
// spec instead of just showing each word's index in isolation.
export function entropyToWordGroups(mnemonic) {
  const entropy = mnemonicToEntropyBytes(mnemonic)
  const words = mnemonic.trim().split(/\s+/)

  const entropyBits = bytesToBits(entropy) // ENT bits
  const checksumBitLen = entropy.length / 4 // CS = ENT / 32 bits
  const checksumBits = bytesToBits(sha256(entropy)).slice(0, checksumBitLen)
  const allBits = entropyBits + checksumBits // ENT + CS, the source of the words
  const entropyBitLen = entropyBits.length

  // Each word is an 11-bit slice of allBits. Tag each bit as entropy/checksum
  // by its absolute position so the UI can colour the checksum tail.
  const groups = words.map((w, i) => {
    const start = i * 11
    const slice = allBits.slice(start, start + 11)
    const bits = slice.split('').map((bit, j) => ({
      bit,
      checksum: start + j >= entropyBitLen,
    }))
    return {
      word: w,
      index: englishWordlist.indexOf(w),
      bits, // array of { bit, checksum }
    }
  })

  return {
    entropy,
    entropyBits,
    checksumBits,
    checksumBitLen,
    groups,
  }
}
