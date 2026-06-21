import { downloadDataUrl } from '../utils/stripGenerator.js'
import styles from './DownloadTab.module.css'

export default function DownloadTab({ stripDataUrl, resetPhotos, onGoSetup }) {
  const handleDownload = (format) => {
    if (!stripDataUrl) return
    const dataUrl = format === 'jpg'
      ? stripDataUrl.replace('image/png', 'image/jpeg')
      : stripDataUrl
    downloadDataUrl(dataUrl, `photobooth.${format}`)
  }

  const handleNewSession = () => {
    resetPhotos()
    onGoSetup()
  }

  return (
    <>
      <span className={styles.label}>
        <i className="ti ti-sparkles" aria-hidden="true" /> final strip
      </span>

      <div className={styles.preview}>
        {stripDataUrl
          ? <img src={stripDataUrl} alt="Your photobooth strip" className={styles.img} />
          : <p className={styles.empty}>complete your strip to download ✿</p>
        }
      </div>

      <div className={styles.dlRow}>
        <button
          className={styles.dlBtn}
          onClick={() => handleDownload('png')}
          disabled={!stripDataUrl}
        >
          <i className="ti ti-download" aria-hidden="true" /> PNG
        </button>
        <button
          className={styles.dlBtn}
          onClick={() => handleDownload('jpg')}
          disabled={!stripDataUrl}
        >
          <i className="ti ti-download" aria-hidden="true" /> JPG
        </button>
      </div>

      <button className={styles.newBtn} onClick={handleNewSession}>
        <i className="ti ti-camera-plus" aria-hidden="true" /> new session
      </button>
    </>
  )
}
