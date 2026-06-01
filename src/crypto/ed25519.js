// SLIP-0010 hierarchical key derivation over the ed25519 curve, used by Solana
// (and other ed25519 chains). This is NOT BIP-32: ed25519 has no point
// addition usable for public derivation, so SLIP-0010 only allows *hardened*
// derivation. Every path segment is therefore hardened.
//
// Verified against the official SLIP-0010 ed25519 test vectors.
import { hmac } from '@noble/hashes/hmac.js'
import { sha512 } from '@noble/hashes/sha2.js'
import { ed25519 } from '@noble/curves/ed25519.js'

const ED25519_SEED_KEY = new TextEncoder().encode('ed25519 seed')

// Master node from the BIP-39 seed: HMAC-SHA512(key="ed25519 seed", seed).
export function ed25519MasterFromSeed(seed) {
  const I = hmac(sha512, ED25519_SEED_KEY, seed)
  return { key: I.slice(0, 32), chainCode: I.slice(32) }
}

// One hardened child. `index` is the *unhardened* number; the hardened bit is
// added here. data = 0x00 || parentKey(32) || (index + 2^31) as BE uint32.
export function ed25519DeriveChild(parent, index) {
  const data = new Uint8Array(37)
  data[0] = 0x00
  data.set(parent.key, 1)
  const hardened = (index + 0x80000000) >>> 0
  data[33] = (hardened >>> 24) & 0xff
  data[34] = (hardened >>> 16) & 0xff
  data[35] = (hardened >>> 8) & 0xff
  data[36] = hardened & 0xff
  const I = hmac(sha512, parent.chainCode, data)
  return { key: I.slice(0, 32), chainCode: I.slice(32) }
}

// Derive a full path given as an array of unhardened segment numbers, e.g.
// [44, 501, 0, 0] for m/44'/501'/0'/0'. All segments are hardened by SLIP-0010.
export function ed25519DerivePath(seed, segments) {
  let node = ed25519MasterFromSeed(seed)
  for (const s of segments) node = ed25519DeriveChild(node, s)
  return node
}

// The 32-byte ed25519 public key for a node's private key.
export function ed25519PublicKey(node) {
  return ed25519.getPublicKey(node.key)
}
