// A labelled range slider that shows its current value.
export default function Slider({ label, value, min, max, onChange, format }) {
  return (
    <div style={{ flex: 1, minWidth: 160 }}>
      <div className="field-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>{label}</span>
        <span style={{ fontFamily: 'var(--mono)', color: 'var(--cyan)' }}>
          {format ? format(value) : value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  )
}
