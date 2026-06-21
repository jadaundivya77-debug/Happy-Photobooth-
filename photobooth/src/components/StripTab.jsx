import { useEffect } from 'react'
import { generateStrip } from '../utils/stripGenerator.js'
import styles from './StripTab.module.css'

export default function StripTab({ photos, settings, stripDataUrl, setStripDataUrl, resetPhotos, onGoDownload }) {
  const { photoCount, layout, borderColor, caption } = settings

  useEffect(() => {
    if (photos.length === photoCount && photoCount > 0) {
      generateStrip({ photos, layout, borderColor, caption }).then(url => {
        setStripDataUrl(url)
      })
    }
  }, [photos, photoCount, layout, borderColor, caption])

  const slots = Array.from({ length: photoCount }, (_, i) => photos[i] || null)

  return (
    <>
      <div className={styles.statusRow}>
        <span className={styles.sectionLabel}>
          <i className="ti ti-photo" aria-hidden="true" /> your photos
        </span>
        <span className={`${styles.dot} ${photos.length === photoCount ? styles.dotLive : ''}`} />
      </div>

      <div className={styles.slotGrid} style={{ gridTemplateColumns: photoCount > 4 ? '1fr 1fr' : '1fr' }}>
        {slots.map((photo, i) => (
          <div key={i} className={styles.slot}>
            {photo
              ? <img src={photo} alt={`photo ${i + 1}`} className={styles.photo} />
              : <div className={styles.placeholder}>
                  <i className="ti ti-camera" aria-hidden="true" />
                  <span>photo {i + 1}</span>
                </div>
            }
          </div>
        ))}
      </div>

      {photos.length > 0 && photos.length < photoCount && (
        <p className={styles.hint}>
          {photos.length} / {photoCount} photos taken — keep shooting!
        </p>
      )}

      <div className={styles.btnGroup}>
        {stripDataUrl && (
          <button className={styles.primaryBtn} onClick={onGoDownload}>
            <i className="ti ti-download" aria-hidden="true" /> download strip
          </button>
        )}
        <button className={styles.secondaryBtn} onClick={resetPhotos}>
          <i className="ti ti-refresh" aria-hidden="true" /> retake photos
        </button>
      </div>
    </>
  )
}
