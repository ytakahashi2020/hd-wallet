// All UI copy in one place, keyed by language. Crypto values (hex, addresses)
// are never translated. Use {placeholders} for interpolation via t(key, vars).
export const messages = {
  en: {
    'app.title': 'HD Wallet',
    'app.subtitle': 'An interactive demo — touch it to understand',
    'app.intro':
      'A Hierarchical Deterministic (HD) wallet turns a single recovery phrase into an unlimited tree of keys. Change any value below and watch every key downstream change with it. That is what "deterministic" means.',
    'app.warning':
      'Demo only. Never put real funds into any phrase or address shown here — they are generated in your browser for learning.',
    'lang.toggle': '日本語',
    'app.glossary': 'Key terms:',
    'term.entropy': 'entropy',
    'term.checksum': 'checksum',
    'term.chaincode': 'chain code',
    'term.hardened': 'hardened',

    'nav.step': 'Step',
    'common.regenerate': 'Regenerate',
    'common.copy': 'Copy',
    'common.copied': 'Copied!',
    'common.bytes': 'bytes',
    'common.bits': 'bits',
    'common.privateKey': 'Private key',
    'common.publicKey': 'Public key',
    'common.chainCode': 'Chain code',
    'common.path': 'Path',
    'common.address': 'Address',
    'common.normal': 'Normal',
    'common.hardened': 'Hardened',

    'step1.title': 'Mnemonic phrase',
    'step1.tag': 'BIP-39',
    'step1.desc':
      'Everything starts with random entropy. The bits are sliced into 11-bit groups; each group picks one of 2048 words. A short checksum is added so typos can be detected. These words are the only thing you must back up.',
    'step1.words12': '12 words',
    'step1.words24': '24 words',
    'step1.entropyLabel': 'Random entropy',
    'step1.showBits': 'Show the bits',
    'step1.hideBits': 'Hide the bits',
    'step1.entropyHint':
      'Each group is 11 bits = one word. Amber bits at the end are the checksum, not entropy.',
    'step1.checksumNote':
      'The amber checksum bits are derived from the entropy, so a typo makes them disagree.',
    'step1.legendEntropy': 'entropy',
    'step1.legendChecksum': 'checksum',
    'step1.tamperHint': 'Click any word to mistype it — watch the checksum catch it.',
    'step1.cascadeHint': 'Change this and every step below recomputes.',
    'step1.valid': 'Checksum OK — valid phrase',
    'step1.invalid': 'Checksum mismatch — this typo is detectable',
    'step1.restore': 'Restore',

    'step2.title': 'Seed',
    'step2.tag': 'BIP-39',
    'step2.desc':
      'The words (plus an optional passphrase) are stretched into a 512-bit seed using PBKDF2 with 2048 rounds. Change a single character of the passphrase and the entire seed changes — about half of all bits flip. This is the avalanche effect.',
    'step2.passphrase': 'Passphrase (optional)',
    'step2.passphrasePlaceholder': 'e.g. my secret words',
    'step2.avalanche': 'Bits changed vs. empty passphrase',
    'step2.seedLabel': '512-bit seed',

    'step3.title': 'Master key',
    'step3.tag': 'BIP-32',
    'step3.desc':
      'The seed is run through HMAC-SHA512. The left 256 bits become the master private key; the right 256 bits become the chain code (extra randomness mixed into every child). Together they are the root of the whole tree.',
    'step3.split': 'HMAC-SHA512(key = "Bitcoin seed", data = seed) → left half + right half',
    'step3.leftHalf': 'Left 256 bits → master private key',
    'step3.rightHalf': 'Right 256 bits → chain code',

    'step4.title': 'Derivation tree',
    'step4.tag': 'BIP-32',
    'step4.desc':
      'From the master key, each child is derived from (parent key + chain code + index). Click a node to expand its children. The same index always gives the same child — no randomness left.',
    'step4.hint': 'Click any node to derive its children.',
    'step4.master': 'Master',
    'step4.compareTitle': 'Normal vs. hardened',
    'step4.compareDesc':
      'A normal child (index i) can be derived from the parent public key alone — handy, but it means leaking one child key + the parent public key can expose siblings. A hardened child (index i′ = i + 2³¹) requires the parent private key, severing that link. That is why account-level paths are hardened.',
    'step4.normalBadge': 'Derivable from public key',
    'step4.hardenedBadge': 'Requires private key',
    'step4.curveNote':
      'This normal-vs-hardened choice is specific to secp256k1 (Bitcoin, Ethereum). Solana uses ed25519, where only hardened derivation exists — there is no "normal" side at all.',

    'step5.title': 'Derivation path',
    'step5.tag': 'BIP-44',
    'step5.desc':
      'BIP-44 gives the tree a standard shape: m / purpose′ / coin′ / account′ / change / index. Move the sliders and switch coins — the final address recomputes instantly. Note Solana: it shares the same phrase but uses a different curve and path.',
    'step5.coin': 'Coin',
    'step5.account': 'Account',
    'step5.change': 'Change',
    'step5.changeExternal': 'External (receive)',
    'step5.changeInternal': 'Internal (change)',
    'step5.index': 'Address index',
    'step5.segPurpose': "purpose'",
    'step5.segCoin': "coin'",
    'step5.segAccount': "account'",
    'step5.segChange': 'change',
    'step5.segIndex': 'index',
    'step5.resultAddress': 'Address at this path',
    'step5.curveSecp': 'secp256k1 · BIP-32 derivation (Bitcoin, Ethereum)',
    'step5.curveEd': 'ed25519 · SLIP-0010 derivation (Solana)',
    'step5.solNote':
      'Solana uses ed25519, where every level must be hardened — so the path is m/44′/501′/account′/index′ with no change/index split, and Step 4’s "normal" derivation does not exist here.',

    'step6.title': 'One phrase, everything',
    'step6.tag': 'Summary',
    'step6.desc':
      'All of these addresses — different coins, two different elliptic curves (secp256k1 and ed25519), accounts and indexes — descend from the single phrase at the top. Back up those words and every key below can be recreated, anywhere, forever. Lose them and nothing can.',
    'step6.fromPhrase': 'From this phrase',
    'step6.derivesAll': 'all of these are recreated:',
    'step6.closing':
      'No server, no database. The phrase is the wallet.',
  },

  ja: {
    'app.title': 'HDウォレット',
    'app.subtitle': 'インタラクティブ・デモ — 触って理解する',
    'app.intro':
      '階層的決定性（HD）ウォレットは、たった1つのリカバリーフレーズから無限の鍵のツリーを生み出します。下にある値を変えてみてください。その下流のすべての鍵が連動して変わります。これが「決定性」の意味です。',
    'app.warning':
      'これはデモです。ここに表示されるフレーズやアドレスには絶対に実資産を入れないでください。学習用にブラウザ内で生成されています。',
    'lang.toggle': 'English',
    'app.glossary': '用語：',
    'term.entropy': 'エントロピー',
    'term.checksum': 'チェックサム',
    'term.chaincode': 'チェーンコード',
    'term.hardened': 'ハードン化',

    'nav.step': 'ステップ',
    'common.regenerate': '再生成',
    'common.copy': 'コピー',
    'common.copied': 'コピーしました',
    'common.bytes': 'バイト',
    'common.bits': 'ビット',
    'common.privateKey': '秘密鍵',
    'common.publicKey': '公開鍵',
    'common.chainCode': 'チェーンコード',
    'common.path': 'パス',
    'common.address': 'アドレス',
    'common.normal': '通常',
    'common.hardened': 'ハードン化',

    'step1.title': 'ニーモニック（単語フレーズ）',
    'step1.tag': 'BIP-39',
    'step1.desc':
      'すべては乱数（エントロピー）から始まります。ビット列を11ビットごとに区切り、各グループが2048語の中から1語を選びます。誤字を検出するための短いチェックサムも加わります。バックアップが必要なのはこの単語だけです。',
    'step1.words12': '12単語',
    'step1.words24': '24単語',
    'step1.entropyLabel': '乱数エントロピー',
    'step1.showBits': 'ビットを見る',
    'step1.hideBits': 'ビットを隠す',
    'step1.entropyHint':
      '各グループ = 11ビット = 1単語。末尾の橙色のビットはエントロピーではなくチェックサムです。',
    'step1.checksumNote':
      '橙色のチェックサムビットはエントロピーから計算されるため、打ち間違えると値が食い違います。',
    'step1.legendEntropy': 'エントロピー',
    'step1.legendChecksum': 'チェックサム',
    'step1.tamperHint': '単語をクリックして打ち間違えてみてください。チェックサムが検出します。',
    'step1.cascadeHint': 'これを変えると、下のすべてのステップが再計算されます。',
    'step1.valid': 'チェックサムOK — 有効なフレーズ',
    'step1.invalid': 'チェックサム不一致 — この打ち間違いは検出できます',
    'step1.restore': '元に戻す',

    'step2.title': 'シード',
    'step2.tag': 'BIP-39',
    'step2.desc':
      '単語（と任意のパスフレーズ）を、PBKDF2を2048回繰り返して512ビットのシードへ引き伸ばします。パスフレーズを1文字変えるだけでシード全体が変わり、約半分のビットが反転します。これが雪崩効果です。',
    'step2.passphrase': 'パスフレーズ（任意）',
    'step2.passphrasePlaceholder': '例：わたしの秘密の言葉',
    'step2.avalanche': '空パスフレーズと比べたビット変化率',
    'step2.seedLabel': '512ビット シード',

    'step3.title': 'マスターキー',
    'step3.tag': 'BIP-32',
    'step3.desc':
      'シードをHMAC-SHA512に通します。左256ビットがマスター秘密鍵、右256ビットがチェーンコード（すべての子鍵に混ぜ込まれる追加の乱数）になります。この2つがツリー全体の根（ルート）です。',
    'step3.split': 'HMAC-SHA512(鍵 = "Bitcoin seed", データ = シード) → 左半分 + 右半分',
    'step3.leftHalf': '左256ビット → マスター秘密鍵',
    'step3.rightHalf': '右256ビット → チェーンコード',

    'step4.title': '導出ツリー',
    'step4.tag': 'BIP-32',
    'step4.desc':
      'マスターキーから、各子鍵は（親の鍵 + チェーンコード + インデックス）から導出されます。ノードをクリックすると子が展開します。同じインデックスからは必ず同じ子が得られます。乱数はもうありません。',
    'step4.hint': 'ノードをクリックすると子鍵が導出されます。',
    'step4.master': 'マスター',
    'step4.compareTitle': '通常導出 vs ハードン化導出',
    'step4.compareDesc':
      '通常の子（インデックス i）は親の公開鍵だけからでも導出できます。便利ですが、1つの子の鍵と親の公開鍵が漏れると兄弟の鍵まで露出しかねません。ハードン化された子（インデックス i′ = i + 2³¹）は親の秘密鍵を必要とし、その繋がりを断ち切ります。アカウント階層がハードン化されるのはこのためです。',
    'step4.normalBadge': '公開鍵から導出可能',
    'step4.hardenedBadge': '秘密鍵が必要',
    'step4.curveNote':
      'この「通常 vs ハードン化」の選択は secp256k1（Bitcoin・Ethereum）に特有です。Solanaが使うed25519では、ハードン化導出しか存在しません。「通常」側そのものが無いのです。',

    'step5.title': '導出パス',
    'step5.tag': 'BIP-44',
    'step5.desc':
      'BIP-44はツリーに標準的な形を与えます： m / purpose′ / coin′ / account′ / change / index。スライダーを動かしコインを切り替えると、最終的なアドレスが即座に再計算されます。Solanaに注目：同じフレーズを使いますが、曲線もパスも違います。',
    'step5.coin': 'コイン',
    'step5.account': 'アカウント',
    'step5.change': 'チェンジ',
    'step5.changeExternal': '外部（受取用）',
    'step5.changeInternal': '内部（お釣り用）',
    'step5.index': 'アドレス番号',
    'step5.segPurpose': "purpose'",
    'step5.segCoin': "coin'",
    'step5.segAccount': "account'",
    'step5.segChange': 'change',
    'step5.segIndex': 'index',
    'step5.resultAddress': 'このパスのアドレス',
    'step5.curveSecp': 'secp256k1 · BIP-32導出（Bitcoin・Ethereum）',
    'step5.curveEd': 'ed25519 · SLIP-0010導出（Solana）',
    'step5.solNote':
      'Solanaはed25519を使い、すべての階層がハードン化必須です。そのためパスは m/44′/501′/account′/index′ となり、change/indexの区別はありません。Step4の「通常」導出はここには存在しません。',

    'step6.title': '1つのフレーズが、すべて',
    'step6.tag': 'まとめ',
    'step6.desc':
      'これらのアドレスは — コインも、2種類の異なる曲線（secp256k1とed25519）も、アカウントもインデックスも違うのに — すべて一番上にある1つのフレーズから派生しています。この単語さえバックアップすれば、下のすべての鍵をいつでもどこでも何度でも復元できます。失えば、何も取り戻せません。',
    'step6.fromPhrase': 'このフレーズから',
    'step6.derivesAll': 'これらすべてが復元されます：',
    'step6.closing': 'サーバーもデータベースもいりません。フレーズこそがウォレットです。',
  },
}
