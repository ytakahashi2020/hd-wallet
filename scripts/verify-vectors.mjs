// Verifies the crypto layer against well-known BIP-39/32/44 test vectors.
// Run with: npm run verify
import { mnemonicToSeed } from '../src/crypto/seed.js'
import { masterFromSeed, derivePath } from '../src/crypto/hdkey.js'
import { isValidMnemonic } from '../src/crypto/mnemonic.js'
import { btcP2pkh, btcP2wpkh, ethAddress } from '../src/crypto/address.js'
import { bytesToHex } from '../src/crypto/format.js'

let pass = 0
let fail = 0
function check(name, actual, expected) {
  const ok = actual === expected
  if (ok) {
    pass++
    console.log(`  ok   ${name}`)
  } else {
    fail++
    console.log(`  FAIL ${name}\n        expected: ${expected}\n        actual:   ${actual}`)
  }
}

const MN = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'

console.log('Vector: "abandon abandon … about" (passphrase = "")')
check('validateMnemonic', isValidMnemonic(MN), true)

const seed = mnemonicToSeed(MN, '')
check(
  'seed',
  bytesToHex(seed),
  '5eb00bbddcf069084889a8ab9155568165f5c453ccb85e70811aaed6f6da5fc19a5ac40b389cd370d086206dec8aa6c43daea6690f20ad3d8d48b2d2ce9e38e4',
)

const master = masterFromSeed(seed)

// ETH m/44'/60'/0'/0/0 — canonical MetaMask vector
check(
  'ETH m/44\'/60\'/0\'/0/0',
  ethAddress(derivePath(master, "m/44'/60'/0'/0/0")).toLowerCase(),
  '0x9858effd232b4033e47d90003d41ec34ecaeda94',
)

// BTC P2PKH m/44'/0'/0'/0/0
check(
  'BTC P2PKH m/44\'/0\'/0\'/0/0',
  btcP2pkh(derivePath(master, "m/44'/0'/0'/0/0")),
  '1LqBGSKuX5yYUonjxT5qGfpUsXKYYWeabA',
)

// BTC P2WPKH (bech32) m/84'/0'/0'/0/0 — native segwit standard path
check(
  'BTC P2WPKH m/84\'/0\'/0\'/0/0',
  btcP2wpkh(derivePath(master, "m/84'/0'/0'/0/0")),
  'bc1qcr8te4kr609gcawutmrza0j4xv80jy8z306fyu',
)

// Passphrase changes the seed entirely
const seedPass = mnemonicToSeed(MN, 'TREZOR')
check(
  'seed with passphrase "TREZOR"',
  bytesToHex(seedPass),
  'c55257c360c07c72029aebc1b53c05ed0362ada38ead3e3e9efa3708e53495531f09a6987599d18264c1e1c92f2cf141630c7a3c4ab7c81b2f001698e7463b04',
)

console.log(`\n${pass} passed, ${fail} failed`)
process.exit(fail === 0 ? 0 : 1)
