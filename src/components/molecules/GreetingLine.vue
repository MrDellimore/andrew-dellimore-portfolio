<script setup>
import { GREETING_LABEL } from '@/data/content'
import { useWaterlineState } from '@/composables/useWaterline'

const { greeting } = useWaterlineState()
</script>

<template>
  <div class="greeting">
    <div class="greeting__label">{{ GREETING_LABEL }}</div>
    <div :key="greeting.word" class="greeting__word">{{ greeting.word }}</div>
    <div class="greeting__note">{{ greeting.note }}</div>
  </div>
</template>

<style scoped>
.greeting {
  margin: clamp(16px, 3vh, 54px) 0 0;
  min-height: 44px;
  position: relative;
  z-index: 6;
  width: fit-content;
  max-width: min(100%, 560px);
}

.greeting__label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--c-eyebrow);
  margin-bottom: 9px;
  text-shadow:
    0 0 3px var(--c-glow),
    0 0 7px var(--c-glow),
    0 0 15px oklch(0.96 0.012 84 / 0.95);
}

.greeting__word {
  font-family: var(--font-serif);
  font-size: 22px;
  font-style: italic;
  color: oklch(0.2 0.03 252);
  animation: fadeup 900ms ease both;
  text-shadow:
    0 0 3px var(--c-glow),
    0 0 8px var(--c-glow),
    0 0 18px oklch(0.96 0.012 84 / 0.95);
}

.greeting__note {
  font-family: var(--font-mono);
  font-size: 11px;
  line-height: 1.7;
  letter-spacing: 0.02em;
  color: oklch(0.34 0.024 200);
  margin-top: 7px;
  max-width: 42em;
  text-shadow:
    0 0 3px var(--c-glow),
    0 0 7px var(--c-glow),
    0 0 15px oklch(0.96 0.012 84 / 0.95);
}
</style>
