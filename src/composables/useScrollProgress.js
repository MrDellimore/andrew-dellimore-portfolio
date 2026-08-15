import { onBeforeUnmount, onMounted, reactive } from 'vue'

/** Tracks scroll fraction (0–1 down the page) and viewport height, rAF-throttled. */
export function useScrollProgress() {
  const state = reactive({ progress: 0, vh: typeof window !== 'undefined' ? window.innerHeight : 900 })
  let raf = null

  function onScroll() {
    if (raf) return
    raf = requestAnimationFrame(() => {
      raf = null
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      state.progress = max > 0 ? Math.min(1, h.scrollTop / max) : 0
      state.vh = window.innerHeight
    })
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    onScroll()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    if (raf) cancelAnimationFrame(raf)
  })

  return state
}
