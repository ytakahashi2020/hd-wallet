// BIP-44 path construction: m / purpose' / coin_type' / account' / change / index
import { HARDENED_OFFSET } from './hdkey.js'

// SLIP-44 coin types used in the demo. `curve` distinguishes the secp256k1
// chains (BIP-32 derivation) from Solana (ed25519 / SLIP-0010 derivation).
export const COINS = {
  BTC: { type: 0, label: 'Bitcoin', symbol: 'BTC', addressKind: 'BTC', curve: 'secp256k1' },
  ETH: { type: 60, label: 'Ethereum', symbol: 'ETH', addressKind: 'ETH', curve: 'secp256k1' },
  SOL: { type: 501, label: 'Solana', symbol: 'SOL', addressKind: 'SOL', curve: 'ed25519' },
}

export const PURPOSE = 44

// Build a path string from BIP-44 components. Solana (ed25519/SLIP-0010) uses a
// 4-level, fully-hardened path `m/44'/501'/account'/index'` — there is no
// non-hardened change/index, because ed25519 only supports hardened derivation.
export function buildPath({ coinType, account, change, index, curve }) {
  if (curve === 'ed25519') {
    return `m/${PURPOSE}'/${coinType}'/${account}'/${index}'`
  }
  return `m/${PURPOSE}'/${coinType}'/${account}'/${change}/${index}`
}

// Describe each segment for the UI (label, value, whether it is hardened).
// `change` is 0 = external (receiving), 1 = internal (change).
export function pathSegments({ coinType, account, change, index, curve }) {
  if (curve === 'ed25519') {
    return [
      { key: 'purpose', value: PURPOSE, hardened: true },
      { key: 'coin', value: coinType, hardened: true },
      { key: 'account', value: account, hardened: true },
      { key: 'index', value: index, hardened: true },
    ]
  }
  return [
    { key: 'purpose', value: PURPOSE, hardened: true },
    { key: 'coin', value: coinType, hardened: true },
    { key: 'account', value: account, hardened: true },
    { key: 'change', value: change, hardened: false },
    { key: 'index', value: index, hardened: false },
  ]
}

// The unhardened segment numbers for ed25519 path derivation, e.g.
// m/44'/501'/account'/index' → [44, 501, account, index].
export function ed25519Segments({ coinType, account, index }) {
  return [PURPOSE, coinType, account, index]
}

// True if a raw BIP-32 index is hardened.
export function isHardenedIndex(index) {
  return index >= HARDENED_OFFSET
}
