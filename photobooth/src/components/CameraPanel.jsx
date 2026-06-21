import { useCallback } from 'react'
import { useCamera } from '../hooks/useCamera.js'
import { useCapture } from '../hooks/useCapture.js'
import { buildFilterString, FILTERS } from '../utils/filters.js'
import FilterChip from './FilterChip.jsx'
import AdjustSlider from './AdjustSlider.jsx'
import styles from './CameraPanel.module.css'

export default function CameraPanel({ photos, settings, updateSetting, addPhoto, isCapturing, setIsCapturing }) {
  const { videoRef, stream, cameraError, startCamera, captureFrame } = useCamera()

  const buildFilter = useCallback(() =>
    buildFilterString(settings), [settings])

  const { countdown, progress, flash, captureMessage, startSession } = useCapture({
    captureFrame,
    buildFilter,
    settings,
    addPhoto,
    setIsCapturing,
  })

  const handleShoot = async () => {
    if (!stream) {
      const ok = await startCamera()
      if (!ok) return
    }
    startSession()
  }

  const filterStr = buildFilterString(settings)

  return (
    <div className={styles.panel}>
      <div className={styles.camFrame}>
        {stream ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ filter: filterStr }}
            className={styles.video}
          />
        ) : (
          <div className={styles.camPlaceholder} onClick={startCamera}>
            <i className="ti ti-camera" aria-hidden="true" />
            <span>{cameraError || 'tap to start camera'}</span>
          </div>
        )}

        {countdown !== null && (
          <div className={styles.countdownRing}>{countdown}</div>
        )}

        {flash && <div className={styles.flashOverlay} />}
      </div>

      {captureMessage && (
        <p className={styles.captureMsg}>{captureMessage}</p>
      )}

      {isCapturing && (
        <div className={styles.progressWrap}>
          <div className={styles.progressBar} style={{ width: `${progress}%` }} />
        </div>
      )}

      <div className={styles.section}>
        <span className={styles.sectionLabel}>
          <i className="ti ti-adjustments-horizontal" aria-hidden="true" /> filters
        </span>
        <div className={styles.filterRow}>
          {FILTERS.map(f => (
            <FilterChip
              key={f.id}
              label={f.label}
              active={settings.activeFilter === f.id}
              onClick={() => updateSetting('activeFilter', f.id)}
            />
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <span className={styles.sectionLabel}>
          <i className="ti ti-sliders" aria-hidden="true" /> adjustments
        </span>
        <AdjustSlider label="brightness" min={60} max={160} value={settings.brightness}
          onChange={v => updateSetting('brightness', v)} />
        <AdjustSlider label="contrast" min={60} max={160} value={settings.contrast}
          onChange={v => updateSetting('contrast', v)} />
        <AdjustSlider label="saturation" min={0} max={200} value={settings.saturation}
          onChange={v => updateSetting('saturation', v)} />
        <AdjustSlider label="warmth" min={-30} max={30} value={settings.warmth}
          onChange={v => updateSetting('warmth', v)} />
      </div>

      <div className={styles.btnRow}>
        {!stream && (
          <button className={styles.btn} onClick={startCamera}>
            <i className="ti ti-camera" aria-hidden="true" /> start camera
          </button>
        )}
        <button
          className={styles.btn}
          onClick={handleShoot}
          disabled={isCapturing}
        >
          <i className="ti ti-aperture" aria-hidden="true" />
          {isCapturing ? 'shooting...' : 'shoot!'}
        </button>
      </div>
    </div>
  )
}
