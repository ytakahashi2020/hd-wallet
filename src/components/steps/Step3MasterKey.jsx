import { useI18n } from '../../i18n/I18nContext.jsx'
import { useWallet } from '../../state/WalletContext.jsx'
import StepCard from '../common/StepCard.jsx'
import HexValue from '../common/HexValue.jsx'

export default function Step3MasterKey() {
  const { t } = useI18n()
  const { master, seed, passphrase, mnemonic } = useWallet()
  const flashKey = `${mnemonic}|${passphrase}`

  return (
    <StepCard id="step3" num={3} titleKey="step3.title" tagKey="step3.tag" descKey="step3.desc">
      <div className="label-line" style={{ fontFamily: 'var(--mono)' }}>
        {t('step3.split')}
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        <HexValue
          label={t('step3.leftHalf')}
          bytes={master.privateKey}
          flashKey={flashKey}
        />
        <HexValue
          label={t('step3.rightHalf')}
          bytes={master.chainCode}
          flashKey={flashKey}
        />
        <HexValue label={t('common.publicKey')} bytes={master.publicKey} dim flashKey={flashKey} />
      </div>
    </StepCard>
  )
}
