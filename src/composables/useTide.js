import { onBeforeUnmount, onMounted, reactive } from 'vue'
import { NOAA_STATION } from '@/data/content'

function formatClock(ms) {
  const dt = new Date(ms)
  const ap = dt.getHours() >= 12 ? 'pm' : 'am'
  const h = dt.getHours() % 12 || 12
  return `${h}:${String(dt.getMinutes()).padStart(2, '0')}${ap}`
}

/**
 * Fetches today's NOAA tide predictions for The Battery, New York and derives
 * the current water ratio (0 = today's low, 1 = today's high), a human
 * readout, and a technical source note.
 *
 * If the fetch fails, falls back to a slow ambient drift and never invents a
 * tide reading — an honest silent fallback beats a fake number.
 */
export function useTide({ forceFallback = false } = {}) {
  const state = reactive({
    ratio: 0.5,
    settled: false,
    readout: '',
    note: '',
    failed: false,
  })

  let driftTimer = null
  let driftStart = 0

  function fallback() {
    state.failed = true
    state.settled = true
    state.readout = ''
    state.note = ''
    driftStart = Date.now()
    const step = () => {
      state.ratio = 0.5 + 0.22 * Math.sin((Date.now() - driftStart) / 34000)
    }
    step()
    driftTimer = setInterval(step, 4000)
  }

  function apply(predictions) {
    const pts = predictions
      .map((p) => ({ t: new Date(p.t.replace(' ', 'T')).getTime(), v: parseFloat(p.v) }))
      .filter((p) => !Number.isNaN(p.t) && !Number.isNaN(p.v))
    if (pts.length < 3) return fallback()

    const now = Date.now()
    let i = 0
    pts.forEach((p, k) => {
      if (Math.abs(p.t - now) < Math.abs(pts[i].t - now)) i = k
    })
    const cur = pts[i]
    const vals = pts.map((p) => p.v)
    const lo = Math.min(...vals)
    const hi = Math.max(...vals)

    const extrema = []
    for (let k = 1; k < pts.length - 1; k++) {
      if (pts[k].v >= pts[k - 1].v && pts[k].v > pts[k + 1].v) extrema.push({ t: pts[k].t, kind: 'high' })
      else if (pts[k].v <= pts[k - 1].v && pts[k].v < pts[k + 1].v) extrema.push({ t: pts[k].t, kind: 'low' })
    }
    const next = extrema.find((e) => e.t > now)
    const rising = i < pts.length - 1 ? pts[i + 1].v > cur.v : !!(next && next.kind === 'high')

    const parts = ['The Battery, New York', `${cur.v.toFixed(1)} ft and ${rising ? 'rising' : 'falling'}`]
    if (next) parts.push(`${next.kind} water ${formatClock(next.t)}`)

    const ratio = hi > lo ? Math.max(0, Math.min(1, (cur.v - lo) / (hi - lo))) : 0.5
    const note =
      `The waterline on this page sits where the water sits. NOAA station ${NOAA_STATION}, ` +
      `predicted level read at ${formatClock(Date.now())} · range today ${lo.toFixed(1)}–${hi.toFixed(1)} ft`

    requestAnimationFrame(() => {
      state.ratio = ratio
      state.settled = true
      state.readout = parts.join(' · ')
      state.note = note
    })
  }

  async function loadTide() {
    if (forceFallback) return fallback()
    const day = new Date().toISOString().slice(0, 10)
    const key = `tide-${NOAA_STATION}-${day}`
    try {
      let raw = sessionStorage.getItem(key)
      if (!raw) {
        const ds = day.replace(/-/g, '')
        const url =
          'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=predictions&application=andrewdellimore.com' +
          `&begin_date=${ds}&end_date=${ds}&datum=MLLW&station=${NOAA_STATION}` +
          '&time_zone=lst_ldt&units=english&interval=6&format=json'
        const res = await fetch(url)
        if (!res.ok) throw new Error(`noaa ${res.status}`)
        raw = await res.text()
        sessionStorage.setItem(key, raw)
      }
      const predictions = JSON.parse(raw).predictions
      if (!predictions || !predictions.length) throw new Error('empty')
      apply(predictions)
    } catch {
      fallback()
    }
  }

  onMounted(loadTide)
  onBeforeUnmount(() => clearInterval(driftTimer))

  return state
}
