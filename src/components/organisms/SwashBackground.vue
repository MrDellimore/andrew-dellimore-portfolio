<script setup>
// The swash zone: four wave "fronts" sharing one cycle, each with its own
// easing, plus a sea whose height is derived from the others rather than
// animated independently. Ported 1:1 from swash.js — see uploads/SWASH-SPEC.md
// in the design project for the full model. Do not retune FRONTS or L by eye;
// the timings are solved (see spec), not eyeballed.
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useReducedMotion } from '@/composables/useReducedMotion'

const props = defineProps({
  hue: { type: Number, default: 214 },
  sat: { type: Number, default: 20 },
  period: { type: Number, default: 8 },
  swell: { type: Number, default: 34 },
  crest: { type: Number, default: 40 },
  seaRestFraction: { type: Number, default: 0.7 },
  invert: { type: Boolean, default: false },
  staticPhase: { type: Number, default: 0.3 },
})

const L = { sand: 94, sheen: 84, sheet: 72, swash: 56, seaTop: 36, seaBed: 19, lip: 48, foam: 99 }

const FRONTS = {
  foam: { rush: 0.16, stall: 0.1, drain: 0.3, warp: 0.86, drainExp: 1.4, reach: 1.0, hold: 0.08 },
  sheet: { rush: 0.18, stall: 0.07, drain: 0.4, warp: 1.0, drainExp: 1.9, reach: 0.93, hold: 0.3 },
  sheen: { rush: 0.19, stall: 0.16, drain: 0.676, warp: 1.02, drainExp: 3.4, reach: 0.88, hold: 0.26 },
  swash: { rush: 0.2, stall: 0.04, drain: 0.34, warp: 1.18, drainExp: 1.5, reach: 0.55, hold: 0.36 },
}

const smoother = (x) => x * x * x * (x * (x * 6 - 15) + 10)

const canvasEl = ref(null)
const hostEl = ref(null)
const reduced = useReducedMotion()

let ctx, W = 0, H = 0
let clock = 0, last = 0, raf = null
let onScreen = true
let seaFrac = null
let peakReturned = 1
let ro, io

function calibrate() {
  let max = 0
  for (let i = 0; i < 400; i++) {
    let onBeach = 0
    for (const k in FRONTS) onBeach += frontW(i / 400, FRONTS[k]) * FRONTS[k].hold
    if (1 - onBeach > max) max = 1 - onBeach
  }
  peakReturned = Math.max(max, 0.001)
}

function front(p, c) {
  const { rush, stall, drain, warp, drainExp } = c
  if (p < 0) return 0
  if (p < rush) return smoother(Math.pow(p / rush, warp))
  if (p < rush + stall) return 1
  if (p < rush + stall + drain) return 1 - Math.pow((p - rush - stall) / drain, drainExp)
  return 0
}
function frontW(p, c) {
  return Math.max(front(p, c), front(p + 1, c))
}

function col(lightness, alpha = 1, satScale = 1) {
  const l = props.invert ? 100 - lightness : lightness
  return `hsla(${props.hue}, ${props.sat * satScale}%, ${l}%, ${alpha})`
}

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const r = hostEl.value.getBoundingClientRect()
  W = Math.max(1, r.width)
  H = Math.max(1, r.height)
  canvasEl.value.width = Math.floor(W * dpr)
  canvasEl.value.height = Math.floor(H * dpr)
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function edgeY(x, base, amp, t, seed) {
  return (
    base +
    amp * Math.sin(x * 0.0042 + t * 0.55 + seed) +
    amp * 0.42 * Math.sin(x * 0.0131 - t * 0.92 + seed * 1.7) +
    amp * 0.2 * Math.sin(x * 0.029 + t * 1.45 + seed * 2.9)
  )
}

function crestLine(x, base, amp, t) {
  return (
    base -
    amp *
      Math.pow(
        Math.max(0, (Math.sin(x * 0.0055 + t * 0.5) * 0.66 + Math.sin(x * 0.0132 - t * 0.83) * 0.34 + 1) / 2),
        1.9,
      )
  )
}

function traceTop(fn) {
  ctx.beginPath()
  ctx.moveTo(0, H + 2)
  ctx.lineTo(0, fn(0))
  for (let x = 8; x <= W; x += 8) ctx.lineTo(x, fn(x))
  ctx.lineTo(W, fn(W))
  ctx.lineTo(W + 2, H + 2)
  ctx.closePath()
}

function fillBand(base, amp, t, seed, lightTop, lightBottom, depth, alpha = 1) {
  traceTop((x) => edgeY(x, base, amp, t, seed))
  const g = ctx.createLinearGradient(0, base - amp, 0, Math.min(H, base + depth))
  g.addColorStop(0, col(lightTop, alpha))
  g.addColorStop(1, col(lightBottom, alpha))
  ctx.fillStyle = g
  ctx.fill()
}

function drawFoamRibbon(base, amp, t, seed, alpha) {
  if (alpha <= 0.01) return
  ctx.beginPath()
  for (let x = 0; x <= W; x += 6) ctx.lineTo(x, edgeY(x, base, amp, t, seed))
  for (let x = W; x >= 0; x -= 6) {
    const j = 5 + 4 * Math.sin(x * 0.021 + t * 2.1) + 3 * Math.sin(x * 0.061 - t * 3.3)
    ctx.lineTo(x, edgeY(x, base, amp, t, seed) + 9 + j)
  }
  ctx.closePath()
  ctx.fillStyle = col(L.foam, alpha * 0.9, 0.35)
  ctx.fill()
}

function drawStrandedFoam(base, alpha) {
  if (alpha <= 0.01) return
  ctx.save()
  ctx.lineWidth = 1.5
  ctx.strokeStyle = col(L.foam, alpha * 0.55, 0.3)
  ctx.beginPath()
  for (let x = 0; x <= W; x += 7) {
    ctx.lineTo(x, base + 3.5 * Math.sin(x * 0.019 + 1.3) + 2.2 * Math.sin(x * 0.047 - 0.6) + 1.4 * Math.sin(x * 0.101 + 2.2))
  }
  ctx.stroke()
  ctx.restore()
}

function render(t) {
  const period = props.period
  const p = (t / period) % 1

  if (seaFrac === null) seaFrac = props.seaRestFraction
  else seaFrac += (props.seaRestFraction - seaFrac) * 0.012

  const seaRest = H * seaFrac
  const travel = seaRest - H * 0.16

  const f = {}
  let onBeach = 0
  for (const k in FRONTS) {
    f[k] = frontW(p, FRONTS[k])
    onBeach += f[k] * FRONTS[k].hold
  }

  const returned = Math.min(1, (1 - onBeach) / peakReturned)
  const seaLine = seaRest + 22 - props.swell * returned
  const crestAmp = props.crest * Math.pow(returned, 5)

  const y = (k) => seaRest - f[k] * travel * FRONTS[k].reach

  const bg = ctx.createLinearGradient(0, 0, 0, H)
  bg.addColorStop(0, col(L.sand + 3, 1, 0.5))
  bg.addColorStop(1, col(L.sand - 6, 1, 0.7))
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  fillBand(y('sheen'), 5, t, 0.4, L.sheen, L.sheen - 6, 200, 0.92)
  fillBand(y('sheet'), 7, t, 1.1, L.sheet, L.sheet - 8, 240)
  fillBand(y('swash'), 9, t, 2.3, L.swash, L.swash - 10, 260)
  fillBand(seaLine, 11, t * 0.8, 3.7, L.seaTop, L.seaBed, H)

  if (crestAmp > 0.5) {
    traceTop((x) => crestLine(x, seaLine + 4, crestAmp, t))
    const g = ctx.createLinearGradient(0, seaLine - crestAmp, 0, seaLine + 90)
    g.addColorStop(0, col(L.lip))
    g.addColorStop(0.45, col(L.seaTop))
    g.addColorStop(1, col(L.seaBed + 6))
    ctx.fillStyle = g
    ctx.fill()

    const glint = Math.max(0, crestAmp / Math.max(props.crest, 1) - 0.55) / 0.45
    if (glint > 0.02) {
      ctx.save()
      ctx.lineWidth = 1.6
      ctx.strokeStyle = col(L.foam, glint * 0.5, 0.3)
      ctx.beginPath()
      for (let x = 0; x <= W; x += 6) ctx.lineTo(x, crestLine(x, seaLine + 4, crestAmp, t) + 1)
      ctx.stroke()
      ctx.restore()
    }
  }

  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  fillBand(seaLine + 8, 13, t * 1.3, 5.2, L.seaTop + 14, L.seaTop, 44, 0.1 + returned * 0.22)
  ctx.restore()

  const rushWin = FRONTS.foam.rush + FRONTS.foam.stall
  const foamAlpha = p < rushWin ? 0.35 + 0.65 * Math.min(1, p / FRONTS.foam.rush) : Math.max(0, 1 - (p - rushWin) / 0.22)
  drawFoamRibbon(y('foam'), 6, t, 1.1, foamAlpha)

  const strandAlpha = p > FRONTS.foam.rush ? Math.max(0, 1 - (p - FRONTS.foam.rush) / 0.5) : 0
  drawStrandedFoam(seaRest - travel * FRONTS.foam.reach, strandAlpha)
}

function frame(now) {
  clock += Math.min((now - last) / 1000, 0.05)
  last = now
  render(clock)
  raf = requestAnimationFrame(frame)
}

function start() {
  if (raf !== null || reduced.value || !onScreen || document.hidden) return
  last = performance.now()
  raf = requestAnimationFrame(frame)
}
function stop() {
  if (raf !== null) {
    cancelAnimationFrame(raf)
    raf = null
  }
}
function still() {
  stop()
  render(props.staticPhase * props.period)
}

function onVisibility() {
  document.hidden ? stop() : start()
}

watch(reduced, (isReduced) => (isReduced ? still() : start()))
watch(
  () => [props.hue, props.sat, props.invert, props.seaRestFraction],
  () => {
    if (reduced.value) still()
  },
)

onMounted(() => {
  ctx = canvasEl.value.getContext('2d')
  calibrate()

  ro = new ResizeObserver(() => {
    resize()
    reduced.value ? still() : render(clock)
  })
  ro.observe(hostEl.value)

  io = new IntersectionObserver(
    (entries) => {
      onScreen = entries[0].isIntersecting
      onScreen ? start() : stop()
    },
    { threshold: 0 },
  )
  io.observe(hostEl.value)

  document.addEventListener('visibilitychange', onVisibility)

  resize()
  render(clock || props.staticPhase * props.period)
  if (!reduced.value) start()
})

onBeforeUnmount(() => {
  stop()
  ro?.disconnect()
  io?.disconnect()
  document.removeEventListener('visibilitychange', onVisibility)
})
</script>

<template>
  <div ref="hostEl" class="swash-bg" aria-hidden="true">
    <canvas ref="canvasEl"></canvas>
  </div>
</template>

<style scoped>
.swash-bg {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50vh;
  z-index: 0;
  pointer-events: none;
  display: block;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.35) 22%, #000 40%);
  mask-image: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.35) 22%, #000 40%);
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
