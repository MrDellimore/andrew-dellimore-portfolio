<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useWaterlineState } from '@/composables/useWaterline'

const { tide, setBarHeight } = useWaterlineState()

const barEl = ref(null)
let ro

onMounted(() => {
  ro = new ResizeObserver(() => {
    const h = Math.round(barEl.value.getBoundingClientRect().height)
    if (h) setBarHeight(h)
  })
  ro.observe(barEl.value)
})
onBeforeUnmount(() => ro?.disconnect())
</script>

<template>
  <div ref="barEl" class="tide-bar">
    <div class="tide-bar__readout">
      <div class="tide-bar__line">{{ tide.readout }}</div>
      <div class="tide-bar__note">{{ tide.note }}</div>
    </div>
  </div>
</template>

<style scoped>
.tide-bar {
  position: fixed;
  z-index: 6;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 13px var(--page-pad-x) 14px;
  pointer-events: none;
  font-family: var(--font-mono);
  letter-spacing: 0.07em;
  background-color: var(--c-bar-bg);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  background-image: linear-gradient(to top, oklch(0.19 0.075 250 / 0) 0px, var(--c-bar-bg-grad));
}

.tide-bar__readout {
  display: grid;
  gap: 4px;
  min-width: 0;
}

.tide-bar__line {
  font-size: 11px;
  color: var(--c-bar-readout);
}

.tide-bar__note {
  font-size: 10px;
  line-height: 1.6;
  color: var(--c-bar-note);
  max-width: min(88ch, 72vw);
}
</style>
