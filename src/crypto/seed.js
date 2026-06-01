// BIP-39 seed derivation: mnemonic + optional passphrase → 64-byte seed via
// PBKDF2-HMAC-SHA512 (2048 iterations, salt = "mnemonic" + passphrase).
import { mnemonicToSeedSync } from '@scure/bip39'

export function mnemonicToSeed(mnemonic, passphrase = '') {
  return mnemonicToSeedSync(mnemonic, passphrase)
}
