import { useMemo } from 'react'
import { useI18n } from '../../i18n/I18nContext.jsx'
import { useWallet } from '../../state/WalletContext.jsx'
import { deriveAddress, solAddress } from '../../crypto/address.js'
import { ed25519DerivePath, ed25519PublicKey } from '../../crypto/ed25519.js'
import { truncate } from '../../crypto/format.js'
import StepCard from '../common/StepCard.jsx'

// A fixed set of paths to show that many different addresses — across coins AND
// across two different elliptic curves — all descend from the one phrase.
const ROWS = [
  { coin: 'Bitcoin', symbol: '₿', kind: 'BTC', path: "m/44'/0'/0'/0/0" },
  { coin: 'Bitcoin (SegWit)', symbol: '₿', kind: 'BTC-SEGWIT', path: "m/84'/0'/0'/0/0" },
  { coin: 'Ethereum', symbol: 'Ξ', kind: 'ETH', path: "m/44'/60'/0'/0/0" },
  { coin: 'Ethereum #1', symbol: 'Ξ', kind: 'ETH', path: "m/44'/60'/0'/0/1" },
  { coin: 'Solana', symbol: '◎', kind: 'SOL', path: "m/44'/501'/0'/0'", segments: [44, 501, 0, 0] },
  { coin: 'Solana #1', symbol: '◎', kind: 'SOL', path: "m/44'/501'/1'/0'", segments: [44, 501, 1, 0] },
]

export default function Step6Summary() {
  const { t } = useI18n()
  const { derive, seed, mnemonic } = useWallet()

  const rows = useMemo(
    () =>
      ROWS.map((r) => {
        try {
          if (r.kind === 'SOL') {
            const node = ed25519DerivePath(seed, r.segments)
            return { ...r, address: solAddress(ed25519PublicKey(node)) }
          }
          return { ...r, address: deriveAddress(derive(r.path), r.kind) }
        } catch {
          return { ...r, address: '—' }
        }
      }),
    [derive, seed],
  )

  return (
    <StepCard id="step6" num={6} titleKey="step6.title" tagKey="step6.tag" descKey="step6.desc">
      <div className="summary-phrase" key={mnemonic}>
        <div className="field-label">{t('step6.fromPhrase')}</div>
        <div className="mono phrase-text">{mnemonic}</div>
      </div>

      <div className="label-line">{t('step6.derivesAll')}</div>

      <div className="summary-rows">
        {rows.map((r, i) => (
          <div className="summary-row fade-up" style={{ animationDelay: `${i * 40}ms` }} key={i}>
            <span className="sym">{r.symbol}</span>
            <div className="srow-main">
              <span className="srow-coin">{r.coin}</span>
              <span className="mono srow-path">{r.path}</span>
            </div>
            <span className="mono srow-addr" title={r.address}>
              {truncate(r.address, 10, 8)}
            </span>
          </div>
        ))}
      </div>

      <p className="closing">{t('step6.closing')}</p>
    </StepCard>
  )
}
