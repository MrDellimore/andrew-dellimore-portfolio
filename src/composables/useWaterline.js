import { computed, inject, onMounted, onBeforeUnmount, provide, ref, watchEffect } from 'vue'
import { useTide } from './useTide'
import { useReducedMotion } from './useReducedMotion'
import { useScrollProgress } from './useScrollProgress'
import { setRevealParams } from '@/directives/reveal'
import { GREETINGS, ISLANDS } from '@/data/content'

const WATERLINE_KEY = Symbol('waterline')
const GREETING_INTERVAL_MS = 6400

// Submersion + reveal: the swash canvas migrates with the tide, and extra
// content (Matahari, the leaving-quote aside) surfaces near the flood.
const MECHANIC = 'both'

/**
 * The single source of truth the whole page hangs off: where the tide sits,
 * how far the visitor has scrolled, and the greeting/island rail that ride
 * along with it.
 *
 * Call once at the root and consume elsewhere with `useWaterlineState()`.
 */
export function provideWaterline({ forceFallback = false } = {}) {
  const reduced = useReducedMotion()
  const tide = useTide({ forceFallback })
  const scroll = useScrollProgress()

  const barHeight = ref(96)
  const navHover = ref(false)
  const greetIndex = ref(0)

  const ratio = computed(() => (tide.settled ? tide.ratio : 0))
  const heightPct = computed(() => 12 + ratio.value * 18)

  const submerged = true
  const flood = computed(() => tide.ratio >= 0.62 && tide.settled)

  // seaRest migrates with the tide: low water sits low on the canvas (0.78), high water high (0.56)
  const seaRestFraction = computed(() => +(0.78 - ratio.value * 0.22).toFixed(3))
  const settleMs = computed(() => (reduced.value ? 0 : 2600))

  // last section clears the water and the bar; hero clears the bar + the swash run-up zone
  const pageEndPad = computed(() => `${Math.round(Math.max(barHeight.value + 60, scroll.vh * 0.5))}px`)
  const heroPadBottom = computed(
    () =>
      `${Math.round(
        Math.max(barHeight.value + 34 + Math.min(46, scroll.vh * 0.04), scroll.vh * 0.46),
      )}px`,
  )

  // island rail: which of the 32 is "here" as you scroll
  const here = computed(() => Math.max(0, Math.min(31, Math.round(scroll.progress * 31))))
  const islandName = computed(() => ISLANDS[here.value])
  const islandOrdinal = computed(() => `${String(here.value + 1).padStart(2, '0')} / 32`)
  const marks = computed(() => {
    const list = []
    for (let k = 0; k < 32; k++) {
      const on = scroll.progress * 32 >= k + 0.5
      list.push({
        active: k === here.value,
        on,
      })
    }
    return list
  })

  // greeting cycle
  let greetTimer
  onMounted(() => {
    greetTimer = setInterval(() => {
      greetIndex.value = (greetIndex.value + 1) % GREETINGS.length
    }, GREETING_INTERVAL_MS)
  })
  onBeforeUnmount(() => clearInterval(greetTimer))
  const greeting = computed(() => GREETINGS[greetIndex.value])

  // keep the reveal-on-scroll directive in sync with the tide-driven line
  watchEffect(() => {
    setRevealParams({
      vh: scroll.vh,
      pct: heightPct.value,
      disabled: reduced.value,
    })
  })

  const state = {
    reduced,
    tide,
    scroll,
    mechanic: MECHANIC,
    barHeight,
    setBarHeight: (h) => {
      barHeight.value = h
    },
    navHover,
    setNavHover: (v) => {
      navHover.value = v
    },
    ratio,
    heightPct,
    submerged,
    flood,
    seaRestFraction,
    settleMs,
    pageEndPad,
    heroPadBottom,
    here,
    islandName,
    islandOrdinal,
    marks,
    greeting,
  }

  provide(WATERLINE_KEY, state)
  return state
}

export function useWaterlineState() {
  const state = inject(WATERLINE_KEY)
  if (!state) throw new Error('useWaterlineState() must be called within a tree under provideWaterline()')
  return state
}
