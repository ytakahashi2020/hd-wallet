# HD Wallet — Interactive Demo

An interactive, bilingual (日本語 / English) demo that lets you **touch** an HD
wallet to understand it. One recovery phrase deterministically generates an
unlimited tree of keys — change any value and watch every key downstream change
with it.

Inspired by the style of interactive "learn by touching" demos. Built for
education only.

## What it covers

1. **Mnemonic (BIP-39)** — entropy → 11-bit groups → words, with checksum
2. **Seed** — PBKDF2 stretch + the avalanche effect of a passphrase
3. **Master key (BIP-32)** — HMAC-SHA512 split into private key + chain code
4. **Derivation tree (BIP-32)** — expandable tree, normal vs. hardened
5. **Derivation path (BIP-44)** — `m/44'/coin'/account'/change/index` → live address,
   including Solana on a different curve (ed25519 / SLIP-0010)
6. **Summary** — one phrase recreates every address (BTC / ETH / SOL)

## Cryptography

All values are real, derived in the browser with the audited
[`@scure`](https://github.com/paulmillr/scure-bip32) / `@noble` libraries
(no `Buffer` polyfill needed). Bitcoin and Ethereum use secp256k1 / BIP-32;
Solana uses ed25519 / SLIP-0010 (a hand-rolled derivation verified against the
official SLIP-0010 test vectors). Correctness is checked against known
BIP-39/32/44 and SLIP-0010 test vectors:

```bash
npm run verify
```

> ⚠️ **Demo only.** Never put real funds into any phrase or address shown here.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173/hd-wallet/
npm run build    # → dist/
```

## Deploy

Pushing to `main` builds and deploys to GitHub Pages via
`.github/workflows/deploy.yml` (set Settings → Pages → Source to **GitHub
Actions**). The site is served from `/hd-wallet/` — see `base` in
`vite.config.js`.
