// Address derivation for the coins shown in the demo. Each function takes an
// HDKey node (or its key material) and returns a display-ready address string.
import { sha256 } from '@noble/hashes/sha2.js'
import { keccak_256 } from '@noble/hashes/sha3.js'
import { ripemd160 } from '@noble/hashes/legacy.js'
import { secp256k1 } from '@noble/curves/secp256k1.js'
import { bech32, base58check } from '@scure/base'
import { bytesToHex } from './format.js'

const b58check = base58check(sha256)

// hash160 = RIPEMD160(SHA256(pubkey)) — the standard Bitcoin pubkey hash.
function hash160(compressedPubKey) {
  return ripemd160(sha256(compressedPubKey))
}

// Bitcoin legacy P2PKH ("1..."). version byte 0x00 for mainnet.
export function btcP2pkh(node, version = 0x00) {
  const h160 = hash160(node.publicKey)
  const payload = new Uint8Array(1 + h160.length)
  payload[0] = version
  payload.set(h160, 1)
  return b58check.encode(payload)
}

// Bitcoin native SegWit P2WPKH ("bc1q..."). witness v0 + hash160.
export function btcP2wpkh(node, hrp = 'bc') {
  const h160 = hash160(node.publicKey)
  const words = bech32.toWords(h160)
  return bech32.encode(hrp, [0x00, ...words])
}

// Ethereum: keccak256 of the uncompressed public key (drop the 0x04 prefix),
// take the last 20 bytes, apply EIP-55 checksum casing.
export function ethAddress(node) {
  const uncompressed = secp256k1.getPublicKey(node.privateKey, false)
  const hash = keccak_256(uncompressed.slice(1))
  const addr = bytesToHex(hash.slice(-20))
  return '0x' + toChecksumAddress(addr)
}

const utf8 = new TextEncoder()

// EIP-55: uppercase a hex nibble if the corresponding nibble of keccak256(addr)
// is >= 8. The hash is taken over the lowercase ASCII hex string.
function toChecksumAddress(addrLowerNoPrefix) {
  const hash = bytesToHex(keccak_256(utf8.encode(addrLowerNoPrefix)))
  let out = ''
  for (let i = 0; i < addrLowerNoPrefix.length; i++) {
    const c = addrLowerNoPrefix[i]
    out += parseInt(hash[i], 16) >= 8 ? c.toUpperCase() : c
  }
  return out
}

// Dispatch by coin type used in Step 5 / Step 6.
export function deriveAddress(node, coin) {
  switch (coin) {
    case 'ETH':
      return ethAddress(node)
    case 'BTC':
      return btcP2pkh(node)
    case 'BTC-SEGWIT':
      return btcP2wpkh(node)
    default:
      return ''
  }
}
