import styles from './FilterChip.module.css'

export default function FilterChip({ label, active, onClick }) {
  return (
    <button
      className={`${styles.chip} ${active ? styles.active : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
