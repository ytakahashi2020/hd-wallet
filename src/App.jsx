import { useI18n } from './i18n/I18nContext.jsx'
import LanguageToggle from './components/common/LanguageToggle.jsx'
import StepNav from './components/common/StepNav.jsx'
import Term from './components/common/Term.jsx'
import Footer from './components/common/Footer.jsx'
import Step1Mnemonic from './components/steps/Step1Mnemonic.jsx'
import Step2Seed from './components/steps/Step2Seed.jsx'
import Step3MasterKey from './components/steps/Step3MasterKey.jsx'
import Step4DerivationTree from './components/steps/Step4DerivationTree.jsx'
import Step5Bip44Path from './components/steps/Step5Bip44Path.jsx'
import Step6Summary from './components/steps/Step6Summary.jsx'

export default function App() {
  const { t } = useI18n()
  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="key">🗝️</span>
          <h1>{t('app.title')}</h1>
        </div>
        <LanguageToggle />
      </header>

      <StepNav />

      <section className="hero">
        <h2>{t('app.subtitle')}</h2>
        <p className="intro">{t('app.intro')}</p>
        <div className="glossary">
          <span className="glossary-label">{t('app.glossary')}</span>
          <Term id="entropy">{t('term.entropy')}</Term>
          <Term id="checksum">{t('term.checksum')}</Term>
          <Term id="hmac">HMAC</Term>
          <Term id="chaincode">{t('term.chaincode')}</Term>
          <Term id="hardened">{t('term.hardened')}</Term>
          <Term id="slip44">SLIP-44</Term>
        </div>
        <div className="warning">
          <span className="icon">⚠️</span>
          <span>{t('app.warning')}</span>
        </div>
      </section>

      <Step1Mnemonic />
      <Step2Seed />
      <Step3MasterKey />
      <Step4DerivationTree />
      <Step5Bip44Path />
      <Step6Summary />

      <Footer />
    </div>
  )
}
