// v-reveal: fades/blurs/lifts an element in as the tide's waterline passes it
// on scroll. Mirrors the original data-reveal behaviour — a shared rAF loop
// repaints every registered element against one waterline height, so the
// whole page stays in sync with a single source of truth.

const registry = new Set() // { el, rot }
const params = { vh: typeof window !== 'undefined' ? window.innerHeight : 900, pct: 12, disabled: false }
let raf = null
let listenersInstalled = false

function paint() {
  raf = null
  const lineY = params.vh * (1 - params.pct / 100)
  registry.forEach(({ el, rot }) => {
    if (params.disabled) {
      el.style.opacity = ''
      el.style.filter = ''
      el.style.transform = ''
      return
    }
    if (!el.dataset.rv) {
      el.dataset.rv = '1'
      el.style.transition =
        'opacity 520ms cubic-bezier(0.16,0.84,0.24,1), filter 520ms cubic-bezier(0.16,0.84,0.24,1), transform 520ms cubic-bezier(0.16,0.84,0.24,1)'
      el.style.willChange = 'opacity, filter, transform'
    }
    let p = (lineY - el.getBoundingClientRect().top) / 240
    p = p < 0 ? 0 : p > 1 ? 1 : p
    const e = p * p * (3 - 2 * p)
    const rotStr = rot ? ` rotate(${rot}deg)` : ''
    el.style.opacity = e.toFixed(3)
    el.style.filter = e > 0.99 ? 'none' : `blur(${((1 - e) * 6).toFixed(2)}px)`
    el.style.transform = e > 0.99 ? rotStr.trim() || 'none' : `translateY(${((1 - e) * 18).toFixed(1)}px)${rotStr}`
  })
}

function schedule() {
  if (raf) return
  raf = requestAnimationFrame(paint)
}

function installListeners() {
  if (listenersInstalled) return
  listenersInstalled = true
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule, { passive: true })
}

/** Called by the root waterline state whenever the tide/reduced-motion state changes. */
export function setRevealParams(next) {
  Object.assign(params, next)
  schedule()
}

export const vReveal = {
  mounted(el, binding) {
    installListeners()
    registry.add({ el, rot: binding.value })
    schedule()
  },
  updated(el, binding) {
    for (const entry of registry) {
      if (entry.el === el) {
        entry.rot = binding.value
        break
      }
    }
  },
  unmounted(el) {
    for (const entry of registry) {
      if (entry.el === el) {
        registry.delete(entry)
        break
      }
    }
  },
}
