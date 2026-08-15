<script setup>
defineProps({
  size: { type: String, default: 'md', validator: (v) => ['sm', 'md'].includes(v) },
  tag: { type: String, default: 'div' },
})
</script>

<template>
  <component :is="tag" class="eyebrow" :class="`eyebrow--${size}`">
    <slot />
  </component>
</template>

<style scoped>
.eyebrow {
  font-family: var(--font-mono);
  text-transform: uppercase;
  color: var(--c-eyebrow);
}

.eyebrow--md {
  font-size: 11px;
  letter-spacing: 0.18em;
}

.eyebrow--sm {
  font-size: 10px;
  letter-spacing: 0.16em;
}
</style>
