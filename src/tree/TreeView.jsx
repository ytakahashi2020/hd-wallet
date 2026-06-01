import { useState, useMemo, useCallback } from 'react'
import { useI18n } from '../i18n/I18nContext.jsx'
import { deriveChild, formatIndex } from '../crypto/hdkey.js'
import { bytesToHex } from '../crypto/format.js'

const MAX_DEPTH = 3 // master(0) + 3 levels
const CHILDREN_PER_NODE = 4

// One node in the derivation tree. Lazily derives its children on click. A node
// can derive children in "normal" or "hardened" mode (chosen on the parent toggle).
function TreeNode({ node, label, path, depth, hardened, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen ?? false)

  // Derive children only when first opened, then memoise.
  const children = useMemo(() => {
    if (!open || depth >= MAX_DEPTH) return null
    const out = []
    for (let i = 0; i < CHILDREN_PER_NODE; i++) {
      try {
        const child = deriveChild(node, i, hardened)
        out.push({ node: child, index: i })
      } catch {
        out.push({ node: null, index: i })
      }
    }
    return out
  }, [open, depth, node, hardened])

  const canExpand = depth < MAX_DEPTH
  const fingerprint = node ? bytesToHex(node.publicKey).slice(0, 8) : '—'

  return (
    <div className="tnode-wrap">
      <button
        className={`tnode ${open ? 'open' : ''} ${depth === 0 ? 'root' : ''}`}
        onClick={() => canExpand && setOpen((o) => !o)}
        disabled={!canExpand}
      >
        <span className="tnode-path">{label}</span>
        <span className="tnode-fp">{fingerprint}</span>
        {canExpand && <span className="tnode-caret">{open ? '−' : '+'}</span>}
      </button>

      {open && children && (
        <div className="tchildren fade-up">
          {children.map((c) => {
            const childLabel = formatIndex(c.index, hardened)
            const childPath = `${path}/${childLabel}`
            return (
              <TreeNode
                key={c.index}
                node={c.node}
                label={childLabel}
                path={childPath}
                depth={depth + 1}
                hardened={hardened}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function TreeView({ master, hardened }) {
  const { t } = useI18n()
  return (
    <div className="tree">
      <TreeNode
        node={master}
        label={t('step4.master')}
        path="m"
        depth={0}
        hardened={hardened}
        defaultOpen
      />
    </div>
  )
}
