import styles from './SetupTab.module.css'

const BORDER_SWATCHES = [
  { color: '#ffffff', label: 'white' },
  { color: '#FDF6EE', label: 'cream' },
  { color: '#F2C4C4', label: 'blush' },
  { color: '#C8C0D8', label: 'lavender' },
  { color: '#B8C9B0', label: 'sage' },
  { color: '#3D2B30', label: 'dark' },
]

const PHOTO_COUNTS = [2, 4, 6]
const TIMERS = [
  { value: 0, label: 'no timer', icon: '⚡' },
  { value: 3, label: '3 sec',    icon: '3s' },
  { value: 5, label: '5 sec',    icon: '5s' },
  { value: 10, label: '10 sec',  icon: '10s' },
]
const LAYOUTS = [
  { value: 'strip',    label: 'strip',    icon: '▥' },
  { value: 'grid',     label: 'grid',     icon: '⊞' },
  { value: 'polaroid', label: 'polaroid', icon: '▭' },
]

export default function SetupTab({ settings, updateSetting }) {
  return (
    <>
      <div className={styles.section}>
        <span className={styles.label}>
          <i className="ti ti-stack-2" aria-hidden="true" /> number of photos
        </span>
        <div className={styles.optGrid}>
          {PHOTO_COUNTS.map(n => (
            <button
              key={n}
              className={`${styles.optBtn} ${settings.photoCount === n ? styles.active : ''}`}
              onClick={() => updateSetting('photoCount', n)}
            >
              <span className={styles.optIcon}>{n}</span>
              {n} photos
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <span className={styles.label}>
          <i className="ti ti-clock" aria-hidden="true" /> timer
        </span>
        <div className={styles.optGrid}>
          {TIMERS.map(t => (
            <button
              key={t.value}
              className={`${styles.optBtn} ${settings.timerSecs === t.value ? styles.active : ''}`}
              onClick={() => updateSetting('timerSecs', t.value)}
            >
              <span className={styles.optIcon}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <span className={styles.label}>
          <i className="ti ti-layout" aria-hidden="true" /> strip layout
        </span>
        <div className={styles.optGrid}>
          {LAYOUTS.map(l => (
            <button
              key={l.value}
              className={`${styles.optBtn} ${settings.layout === l.value ? styles.active : ''}`}
              onClick={() => updateSetting('layout', l.value)}
            >
              <span className={styles.optIcon}>{l.icon}</span>
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <span className={styles.label}>
          <i className="ti ti-palette" aria-hidden="true" /> border color
        </span>
        <div className={styles.swatches}>
          {BORDER_SWATCHES.map(s => (
            <button
              key={s.color}
              className={`${styles.swatch} ${settings.borderColor === s.color ? styles.swatchActive : ''}`}
              style={{ background: s.color }}
              onClick={() => updateSetting('borderColor', s.color)}
              aria-label={s.label}
              title={s.label}
            />
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <span className={styles.label}>
          <i className="ti ti-forms" aria-hidden="true" /> caption
        </span>
        <input
          type="text"
          className={styles.captionInput}
          placeholder="add a sweet caption..."
          value={settings.caption}
          onChange={e => updateSetting('caption', e.target.value)}
          maxLength={60}
        />
      </div>
    </>
  )
}
