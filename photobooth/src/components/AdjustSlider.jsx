import styles from './AdjustSlider.module.css'

export default function AdjustSlider({ label, min, max, value, onChange }) {
  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className={styles.slider}
        aria-label={label}
      />
      <span className={styles.val}>{value}</span>
    </div>
  )
}
