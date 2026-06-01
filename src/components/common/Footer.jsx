import { useI18n } from '../../i18n/I18nContext.jsx'

// Author profile shown at the bottom of the page.
export default function Footer() {
  const { t } = useI18n()
  const base = import.meta.env.BASE_URL // correct path under GitHub Pages

  return (
    <footer className="site-footer">
      <img className="footer-avatar" src={`${base}profile.jpg`} alt="Yuki Takahashi" />
      <div className="footer-body">
        <div className="footer-name">Yuki Takahashi</div>
        <div className="footer-roles">
          <div>{t('footer.role1')}</div>
          <div>{t('footer.role2')}</div>
        </div>
        <div className="footer-links">
          <a href="https://x.com/yuki_web3_jp" target="_blank" rel="noopener noreferrer">
            𝕏 @yuki_web3_jp
          </a>
          <a
            href="https://www.youtube.com/@yuki_web3"
            target="_blank"
            rel="noopener noreferrer"
          >
            ▶ YouTube
          </a>
        </div>
      </div>
    </footer>
  )
}
