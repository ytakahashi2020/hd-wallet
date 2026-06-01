import { useMemo, useState } from 'react'
import { useI18n } from '../../i18n/I18nContext.jsx'
import { useWallet } from '../../state/WalletContext.jsx'
import { COINS, buildPath, pathSegments, PURPOSE } from '../../crypto/paths.js'
import { deriveAddress } from '../../crypto/address.js'
import StepCard from '../common/StepCard.jsx'
import Slider from '../common/Slider.jsx'
import HexValue from '../common/HexValue.jsx'

export default function Step5Bip44Path() {
  const { t } = useI18n()
  const { derive } = useWallet()

  const [coin, setCoin] = useState('BTC')
  const [account, setAccount] = useState(0)
  const [change, setChange] = useState(0)
  const [index, setIndex] = useState(0)

  const coinType = COINS[coin].type
  const params = { coinType, account, change, index }
  const path = buildPath(params)
  const segments = pathSegments(params)

  const { address, error } = useMemo(() => {
    try {
      const node = derive(path)
      const kind = coin === 'BTC' ? 'BTC' : 'ETH'
      return { address: deriveAddress(node, kind), error: null }
    } catch (e) {
      return { address: '', error: String(e) }
    }
  }, [derive, path, coin])

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
          marginBottom: 20,
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

      <div className="row" style={{ marginBottom: 16 }}>
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

      <HexValue
        label={`${COINS[coin].label} · ${t('step5.resultAddress')}`}
        value={error ? '⚠ ' + error : address}
        flashKey={path + coin}
      />
    </StepCard>
  )
}
