export const FILTERS = [
  { id: 'none',     label: 'normal',     css: '' },
  { id: 'sepia',    label: 'sepia',      css: 'sepia(0.8) contrast(1.1)' },
  { id: 'bw',       label: 'b&w',        css: 'grayscale(1) contrast(1.2)' },
  { id: 'vintage',  label: 'vintage',    css: 'sepia(0.5) saturate(1.4) brightness(1.05)' },
  { id: 'dreamy',   label: 'dreamy',     css: 'saturate(1.3) contrast(0.9) brightness(1.1)' },
  { id: 'polaroid', label: 'polaroid',   css: 'sepia(0.3) saturate(0.8) brightness(1.1) contrast(0.9)' },
  { id: 'warm',     label: 'warm',       css: 'sepia(0.7) saturate(1.8) hue-rotate(-10deg)' },
  { id: 'cool',     label: 'cool',       css: 'saturate(0.5) brightness(1.1) contrast(1.1) hue-rotate(200deg)' },
  { id: 'film',     label: 'film',       css: 'contrast(1.15) saturate(0.85) sepia(0.2)' },
  { id: 'rosy',     label: 'rosy',       css: 'saturate(1.5) hue-rotate(-20deg) brightness(1.05)' },
]

export function buildFilterString({ activeFilter, brightness, contrast, saturation }) {
  const base = FILTERS.find(f => f.id === activeFilter)?.css || ''
  const adj = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`
  return base ? `${base} ${adj}` : adj
}
