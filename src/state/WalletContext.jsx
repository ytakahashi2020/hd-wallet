import { createContext, useContext, useMemo, useState, useCallback } from 'react'
import { generateMnemonic } from '../crypto/mnemonic.js'
import { mnemonicToSeed } from '../crypto/seed.js'
import { masterFromSeed, derivePath } from '../crypto/hdkey.js'

const WalletContext = createContext(null)

// The "source of truth" is just the mnemonic strength, the mnemonic words, and
// the passphrase. Everything else (seed, master key, every address) is derived
// with useMemo, so changing an upstream value re-flows through the whole tree —
// which is exactly the determinism the demo is teaching.
export function WalletProvider({ children }) {
  const [strengthBits, setStrengthBits] = useState(128) // 128 = 12 words
  const [mnemonic, setMnemonic] = useState(() => generateMnemonic(128))
  const [passphrase, setPassphrase] = useState('')

  const regenerate = useCallback((bits) => {
    const b = bits ?? strengthBits
    setStrengthBits(b)
    setMnemonic(generateMnemonic(b))
  }, [strengthBits])

  const setWordCount = useCallback((bits) => {
    setStrengthBits(bits)
    setMnemonic(generateMnemonic(bits))
  }, [])

  // Derived chain: mnemonic + passphrase → seed → master key.
  const seed = useMemo(() => mnemonicToSeed(mnemonic, passphrase), [mnemonic, passphrase])
  const master = useMemo(() => masterFromSeed(seed), [seed])

  // Stable helper to derive any path from the current master key.
  const derive = useCallback((path) => derivePath(master, path), [master])

  const value = useMemo(
    () => ({
      strengthBits,
      mnemonic,
      passphrase,
      setPassphrase,
      regenerate,
      setWordCount,
      seed,
      master,
      derive,
      // Changes whenever an upstream input (mnemonic or passphrase) changes, so
      // downstream UI can react and visualise the deterministic cascade.
      revision: `${mnemonic}|${passphrase}`,
    }),
    [strengthBits, mnemonic, passphrase, regenerate, setWordCount, seed, master, derive],
  )

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

export function useWallet() {
  const ctx = useContext(WalletContext)
  if (!ctx) throw new Error('useWallet must be used within WalletProvider')
  return ctx
}
