// BIP-44 path construction: m / purpose' / coin_type' / account' / change / index
import { HARDENED_OFFSET } from './hdkey.js'

// SLIP-44 coin types used in the demo.
export const COINS = {
  BTC: { type: 0, label: 'Bitcoin', symbol: 'BTC', addressKind: 'BTC' },
  ETH: { type: 60, label: 'Ethereum', symbol: 'ETH', addressKind: 'ETH' },
}

export const PURPOSE = 44

// Build a path string from BIP-44 components.
export function buildPath({ coinType, account, change, index }) {
  return `m/${PURPOSE}'/${coinType}'/${account}'/${change}/${index}`
}

// Describe each segment for the UI (label, value, whether it is hardened).
// `change` is 0 = external (receiving), 1 = internal (change).
export function pathSegments({ coinType, account, change, index }) {
  return [
    { key: 'purpose', value: PURPOSE, hardened: true },
    { key: 'coin', value: coinType, hardened: true },
    { key: 'account', value: account, hardened: true },
    { key: 'change', value: change, hardened: false },
    { key: 'index', value: index, hardened: false },
  ]
}

// True if a raw BIP-32 index is hardened.
export function isHardenedIndex(index) {
  return index >= HARDENED_OFFSET
}
