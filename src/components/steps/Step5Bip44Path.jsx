import { useMemo, useState } from 'react'
import { useI18n } from '../../i18n/I18nContext.jsx'
import { useWallet } from '../../state/WalletContext.jsx'
import { COINS, buildPath, pathSegments, ed25519Segments } from '../../crypto/paths.js'
import { deriveAddress, solAddress } from '../../crypto/address.js'
import { ed25519DerivePath, ed25519PublicKey } from '../../crypto/ed25519.js'
import StepCard from '../common/StepCard.jsx'
import Slider from '../common/Slider.jsx'
import HexValue from '../common/HexValue.jsx'

export default function Step5Bip44Path() {
  const { t } = useI18n()
  const { derive, seed } = useWallet()

  const [coin, setCoin] = useState('BTC')
  const [account, setAccount] = useState(0)
  const [change, setChange] = useState(0)
  const [index, setIndex] = useState(0)

  const meta = COINS[coin]
  const isEd25519 = meta.curve === 'ed25519'
  const coinType = meta.type
  const params = { coinType, account, change, index, curve: meta.curve }
  const path = buildPath(params)
  const segments = pathSegments(params)

  const { address, error } = useMemo(() => {
    try {
      if (isEd25519) {
        // Solana: SLIP-0010 over ed25519, then base58 of the public key.
        const node = ed25519DerivePath(seed, ed25519Segments({ coinType, account, index }))
        return { address: solAddress(ed25519PublicKey(node)), error: null }
      }
      const node = derive(path)
      return { address: deriveAddress(node, meta.addressKind), error: null }
    } catch (e) {
      return { address: '', error: String(e) }
    }
  }, [isEd25519, seed, derive, path, coinType, account, index, meta.addressKind])

  const segLabel = {
    purpose: t('step5.segPurpose'),
    coin: t('step5.segCoin'),
    account: t('step5.segAccount'),
    change: t('step5.segChange'),
    index: t('step5.segIndex'),
  }

  return (
    <StepCard id="step5" num={5} titleKey="step5.title" tagKey="step5.tag" descKey="step5.desc">
      {/* Visual path with each segment coloured by hardened/normal */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 4,
          fontFamily: 'var(--mono)',
          fontSize: '1.05rem',
          marginBottom: 14,
        }}
        key={path}
      >
        <span style={{ color: 'var(--text-faint)' }}>m</span>
        {segments.map((s) => (
          <span key={s.key} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <span style={{ color: 'var(--text-faint)' }}>/</span>
            <span
              className="flash"
              style={{
                padding: '2px 8px',
                borderRadius: 7,
                background: 'var(--bg)',
                border: `1px solid ${s.hardened ? 'var(--violet)' : 'var(--border)'}`,
                color: s.hardened ? 'var(--violet)' : 'var(--text)',
              }}
              title={segLabel[s.key]}
            >
              {s.value}
              {s.hardened ? "'" : ''}
            </span>
          </span>
        ))}
      </div>

      {/* Curve badge — makes the secp256k1 vs ed25519 split explicit */}
      <div className={`curve-badge ${isEd25519 ? 'ed' : 'secp'}`} key={meta.curve}>
        <span className="curve-dot" />
        {isEd25519 ? t('step5.curveEd') : t('step5.curveSecp')}
      </div>

      <div className="row" style={{ margin: '16px 0' }}>
        <div>
          <div className="field-label">{t('step5.coin')}</div>
          <div className="seg">
            {Object.keys(COINS).map((c) => (
              <button key={c} className={coin === c ? 'active' : ''} onClick={() => setCoin(c)}>
                {COINS[c].symbol}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="row" style={{ gap: 22, marginBottom: 16 }}>
        <Slider label={t('step5.account')} value={account} min={0} max={5} onChange={setAccount} />
        <Slider label={t('step5.index')} value={index} min={0} max={9} onChange={setIndex} />
      </div>

      {/* Bitcoin/Ethereum have a non-hardened change level; Solana does not. */}
      {!isEd25519 && (
        <div style={{ marginBottom: 20 }}>
          <div className="field-label">{t('step5.change')}</div>
          <div className="seg">
            <button className={change === 0 ? 'active' : ''} onClick={() => setChange(0)}>
              {t('step5.changeExternal')}
            </button>
            <button className={change === 1 ? 'active' : ''} onClick={() => setChange(1)}>
              {t('step5.changeInternal')}
            </button>
          </div>
        </div>
      )}

      {isEd25519 && (
        <div className="muted" style={{ marginBottom: 18 }}>
          {t('step5.solNote')}
        </div>
      )}

      <HexValue
        label={`${meta.label} · ${t('step5.resultAddress')}`}
        value={error ? '⚠ ' + error : address}
        flashKey={path + coin}
      />
    </StepCard>
  )
}
