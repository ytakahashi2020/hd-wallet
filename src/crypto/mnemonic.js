// BIP-39 mnemonic generation and the entropy → words mapping, exposed so the
// UI can visualise the 11-bit-per-word structure.
import {
  generateMnemonic as bip39Generate,
  entropyToMnemonic,
  mnemonicToEntropy,
  validateMnemonic,
} from '@scure/bip39'
import { wordlist as englishWordlist } from '@scure/bip39/wordlists/english.js'
import { bytesToBits, chunk } from './format.js'

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
// BIP-39: append a checksum of (strength/32) bits, then split into 11-bit
// groups; each group is an index into the 2048-word list.
export function entropyToWordGroups(mnemonic) {
  const entropy = mnemonicToEntropyBytes(mnemonic)
  const words = mnemonic.trim().split(/\s+/)
  const entropyBits = bytesToBits(entropy)
  const checksumBitLen = entropy.length / 4 // CS = ENT / 32 bits
  const allBits = entropyBits // checksum bits are appended internally; we recompute groups from indices

  // Each word is an 11-bit index into the wordlist.
  const groups = words.map((w) => {
    const index = englishWordlist.indexOf(w)
    return {
      word: w,
      index,
      bits: index >= 0 ? index.toString(2).padStart(11, '0') : '???????????',
    }
  })

  return {
    entropy,
    entropyBits,
    entropyChunks: chunk(entropyBits, 11),
    checksumBitLen,
    groups,
  }
}
