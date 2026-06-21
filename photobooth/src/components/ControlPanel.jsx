import { useState, useEffect } from 'react'
import SetupTab from './SetupTab.jsx'
import StripTab from './StripTab.jsx'
import DownloadTab from './DownloadTab.jsx'
import styles from './ControlPanel.module.css'

const TABS = [
  { id: 'setup', label: 'setup' },
  { id: 'strip', label: 'strip' },
  { id: 'download', label: 'download' },
]

export default function ControlPanel({ photos, settings, updateSetting, stripDataUrl, setStripDataUrl, resetPhotos }) {
  const [activeTab, setActiveTab] = useState('setup')

  useEffect(() => {
    if (photos.length === settings.photoCount && photos.length > 0) {
      setActiveTab('strip')
    }
  }, [photos.length, settings.photoCount])

  return (
    <div className={styles.panel}>
      <div className={styles.tabs} role="tablist">
        {TABS.map(t => (
          <button
            key={t.id}
            role="tab"
            aria-selected={activeTab === t.id}
            className={`${styles.tab} ${activeTab === t.id ? styles.active : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {activeTab === 'setup' && (
          <SetupTab settings={settings} updateSetting={updateSetting} />
        )}
        {activeTab === 'strip' && (
          <StripTab
            photos={photos}
            settings={settings}
            stripDataUrl={stripDataUrl}
            setStripDataUrl={setStripDataUrl}
            resetPhotos={resetPhotos}
            onGoDownload={() => setActiveTab('download')}
          />
        )}
        {activeTab === 'download' && (
          <DownloadTab
            stripDataUrl={stripDataUrl}
            resetPhotos={resetPhotos}
            onGoSetup={() => setActiveTab('setup')}
          />
        )}
      </div>
    </div>
  )
}
