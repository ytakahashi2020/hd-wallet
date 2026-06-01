// BIP-32 hierarchical deterministic key derivation, wrapped to expose the
// normal vs. hardened distinction the demo wants to teach.
import { HDKey } from '@scure/bip32'

// BIP-32 hardened keys use indices >= 2^31. (HDKey.HARDENED_OFFSET is not
// exported as a static in this version, so we define the constant explicitly.)
export const HARDENED_OFFSET = 0x80000000

export function masterFromSeed(seed) {
  return HDKey.fromMasterSeed(seed)
}

// Derive one level down. `hardened` toggles between index i and i + 2^31.
export function deriveChild(parent, index, hardened) {
  const i = hardened ? index + HARDENED_OFFSET : index
  return parent.deriveChild(i)
}

// Derive a full BIP-32 path string like "m/44'/0'/0'/0/0".
export function derivePath(master, path) {
  return master.derive(path)
}

// Format a child index for display: 3 → "3", hardened 3 → "3'".
export function formatIndex(index, hardened) {
  return hardened ? `${index}'` : `${index}`
}

// Expose the key material we want to show. publicKey is the 33-byte compressed
// point; privateKey/chainCode are 32 bytes each. xpub/xprv are the serialized
// extended keys.
export function keyMaterial(node) {
  return {
    privateKey: node.privateKey, // Uint8Array(32) or null for pub-only keys
    publicKey: node.publicKey, // Uint8Array(33)
    chainCode: node.chainCode, // Uint8Array(32)
    xpub: node.publicExtendedKey,
    xprv: node.privateKey ? node.privateExtendedKey : null,
    index: node.index,
    depth: node.depth,
  }
}
