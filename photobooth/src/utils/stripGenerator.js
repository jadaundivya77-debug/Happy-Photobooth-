function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

export async function generateStrip({ photos, layout, borderColor, caption }) {
  if (!photos.length) return null

  const PHOTO_W = 360
  const PHOTO_H = 270
  const BORDER = 24
  const GAP = 12
  const CAPTION_H = caption ? 40 : 0

  let canvasW, canvasH

  if (layout === 'grid') {
    const cols = 2
    const rows = Math.ceil(photos.length / cols)
    canvasW = BORDER * 2 + PHOTO_W * cols + GAP * (cols - 1)
    canvasH = BORDER * 2 + PHOTO_H * rows + GAP * (rows - 1) + CAPTION_H
  } else {
    canvasW = BORDER * 2 + PHOTO_W
    canvasH = BORDER * 2 + PHOTO_H * photos.length + GAP * (photos.length - 1) + CAPTION_H
  }

  const canvas = document.createElement('canvas')
  canvas.width = canvasW
  canvas.height = canvasH
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = borderColor
  ctx.fillRect(0, 0, canvasW, canvasH)

  const imgs = await Promise.all(photos.map(loadImage))

  imgs.forEach((img, i) => {
    let x, y
    if (layout === 'grid') {
      const col = i % 2
      const row = Math.floor(i / 2)
      x = BORDER + col * (PHOTO_W + GAP)
      y = BORDER + row * (PHOTO_H + GAP)
    } else {
      x = BORDER
      y = BORDER + i * (PHOTO_H + GAP)
    }

    if (layout === 'polaroid') {
      const pad = 10
      const footerH = 28
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(x - pad, y - pad, PHOTO_W + pad * 2, PHOTO_H + pad + footerH)
    }

    ctx.drawImage(img, x, y, PHOTO_W, PHOTO_H)
  })

  if (caption) {
    const textColor = borderColor === '#3D2B30' ? '#F2C4C4' : '#8B5E6A'
    ctx.fillStyle = textColor
    ctx.font = '500 16px "DM Sans", sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(caption, canvasW / 2, canvasH - BORDER / 2 + 4)
  }

  return canvas.toDataURL('image/png')
}

export function downloadDataUrl(dataUrl, filename) {
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  link.click()
}
