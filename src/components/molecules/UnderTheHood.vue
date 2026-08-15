<script setup>
defineProps({
  lines: { type: Array, required: true },
})
</script>

<template>
  <details class="hood" v-reveal>
    <summary class="hood__summary">Under the hood</summary>
    <div class="hood__lines">
      <div v-for="line in lines" :key="line">{{ line }}</div>
    </div>
  </details>
</template>

<style scoped>
.hood {
  margin-top: 20px;
}

.hood__summary {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--c-eyebrow);
}

.hood__lines {
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.9;
  color: var(--c-technical);
  margin-top: 14px;
  max-width: 38em;
  display: grid;
  gap: 4px;
}
</style>
