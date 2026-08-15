import { onBeforeUnmount, onMounted, ref } from 'vue'

/** Tracks the user's `prefers-reduced-motion` setting reactively. */
export function useReducedMotion() {
  const reduced = ref(false)
  let mq

  onMounted(() => {
    mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduced.value = mq.matches
    mq.addEventListener('change', onChange)
  })

  function onChange(e) {
    reduced.value = e.matches
  }

  onBeforeUnmount(() => mq?.removeEventListener('change', onChange))

  return reduced
}
