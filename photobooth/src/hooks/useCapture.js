import { useState, useCallback } from 'react'

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function useCapture({ captureFrame, buildFilter, settings, addPhoto, setIsCapturing }) {
  const [countdown, setCountdown] = useState(null)
  const [progress, setProgress] = useState(0)
  const [flash, setFlash] = useState(false)
  const [captureMessage, setCaptureMessage] = useState('')

  const doCountdown = useCallback(async (secs) => {
    for (let i = secs; i > 0; i--) {
      setCountdown(i)
      await delay(1000)
    }
    setCountdown(null)
  }, [])

  const triggerFlash = useCallback(async () => {
    setFlash(true)
    await delay(120)
    setFlash(false)
  }, [])

  const startSession = useCallback(async () => {
    const { photoCount, timerSecs } = settings
    setIsCapturing(true)
    setProgress(0)

    for (let i = 0; i < photoCount; i++) {
      setCaptureMessage(`get ready for photo ${i + 1} of ${photoCount}...`)
      if (timerSecs > 0) await doCountdown(timerSecs)

      await triggerFlash()
      const dataUrl = captureFrame(buildFilter())
      if (dataUrl) addPhoto(dataUrl)

      setProgress(Math.round(((i + 1) / photoCount) * 100))
      if (i < photoCount - 1) await delay(600)
    }

    setCaptureMessage(`✿ all ${photoCount} photos taken!`)
    setIsCapturing(false)
  }, [settings, captureFrame, buildFilter, addPhoto, doCountdown, triggerFlash, setIsCapturing])

  return { countdown, progress, flash, captureMessage, startSession }
}
