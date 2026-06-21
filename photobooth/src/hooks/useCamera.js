import { useState, useRef, useCallback, useEffect } from 'react'

export function useCamera() {
  const [stream, setStream] = useState(null)
  const [cameraError, setCameraError] = useState(null)
  const videoRef = useRef(null)

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream
      videoRef.current.play().catch(() => {})
    }
  }, [stream])

  const startCamera = useCallback(async () => {
    try {
      setCameraError(null)
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 960 } },
        audio: false,
      })
      setStream(mediaStream)
      return true
    } catch (err) {
      setCameraError(err.name === 'NotAllowedError'
        ? 'Camera access was denied. Please allow camera permission.'
        : 'Could not access your camera.')
      return false
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(t => t.stop())
      setStream(null)
    }
  }, [stream])

  const captureFrame = useCallback((filterString) => {
    const video = videoRef.current
    if (!video) return null
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth || 640
    canvas.height = video.videoHeight || 480
    const ctx = canvas.getContext('2d')
    ctx.filter = filterString || 'none'
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    return canvas.toDataURL('image/jpeg', 0.92)
  }, [])

  return { videoRef, stream, cameraError, startCamera, stopCamera, captureFrame }
}
