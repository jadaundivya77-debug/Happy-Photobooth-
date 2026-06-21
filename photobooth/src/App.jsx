import { useState } from 'react'
import Header from './components/Header.jsx'
import CameraPanel from './components/CameraPanel.jsx'
import ControlPanel from './components/ControlPanel.jsx'
import styles from './styles/App.module.css'

export default function App() {
  const [photos, setPhotos] = useState([])
  const [stripDataUrl, setStripDataUrl] = useState(null)
  const [isCapturing, setIsCapturing] = useState(false)

  const [settings, setSettings] = useState({
    photoCount: 4,
    timerSecs: 3,
    layout: 'strip',
    borderColor: '#ffffff',
    caption: '',
    activeFilter: 'none',
    brightness: 100,
    contrast: 100,
    saturation: 100,
    warmth: 0,
  })

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const addPhoto = (dataUrl) => {
    setPhotos(prev => [...prev, dataUrl])
  }

  const resetPhotos = () => {
    setPhotos([])
    setStripDataUrl(null)
  }

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <CameraPanel
          photos={photos}
          settings={settings}
          updateSetting={updateSetting}
          addPhoto={addPhoto}
          isCapturing={isCapturing}
          setIsCapturing={setIsCapturing}
        />
        <ControlPanel
          photos={photos}
          settings={settings}
          updateSetting={updateSetting}
          stripDataUrl={stripDataUrl}
          setStripDataUrl={setStripDataUrl}
          resetPhotos={resetPhotos}
        />
      </main>
    </div>
  )
}
