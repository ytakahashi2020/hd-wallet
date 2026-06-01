import { useI18n } from '../../i18n/I18nContext.jsx'

// Inline glossary. Each term has a short, plain-language gloss in both
// languages. Wrap jargon with <Term id="..."> the word </Term>.
const GLOSSARY = {
  entropy: {
    en: 'Pure randomness — the raw coin-flips everything else is built from.',
    ja: '純粋な乱数。すべての出発点となる「コイン投げ」の結果です。',
  },
  checksum: {
    en: 'A few extra bits computed from the data, used to catch typos.',
    ja: 'データから計算される数ビットの検査値。打ち間違いを検出します。',
  },
  pbkdf2: {
    en: 'A deliberately slow function that repeats 2048 times to make guessing expensive.',
    ja: 'わざと遅くした関数。2048回繰り返して総当たりを高コストにします。',
  },
  hmac: {
    en: 'A keyed hash: mixes a secret key with data to produce a fixed-size output.',
    ja: '鍵付きハッシュ。秘密の鍵とデータを混ぜて固定長の出力を作ります。',
  },
  chaincode: {
    en: 'Extra secret material mixed into every child key — needed to reproduce children.',
    ja: '各子鍵に混ぜ込まれる追加の秘密の素。子を再現するのに必要です。',
  },
  hardened: {
    en: 'A child key that needs the parent PRIVATE key to derive — it cannot be made from the public key.',
    ja: '親の秘密鍵がないと導出できない子鍵。公開鍵からは作れません。',
  },
  slip44: {
    en: 'A registry assigning each coin a number (Bitcoin = 0, Ethereum = 60).',
    ja: '各コインに番号を割り当てる一覧（Bitcoin = 0、Ethereum = 60）。',
  },
}

export default function Term({ id, children }) {
  const { lang } = useI18n()
  const gloss = GLOSSARY[id]?.[lang]
  if (!gloss) return <>{children}</>
  return (
    <span className="term" tabIndex={0}>
      {children}
      <span className="term-pop" role="tooltip">
        {gloss}
      </span>
    </span>
  )
}
