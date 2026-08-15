<script setup>
defineProps({
  rotate: { type: Boolean, default: true },
})
</script>

<template>
  <div class="stamp" :class="{ 'stamp--rotate': rotate }" v-reveal="rotate ? -0.4 : 0">
    <slot />
  </div>
</template>

<style scoped>
/* "pressed into the page" — a shipping mark, not a pill badge */
.stamp {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--c-accent);
}

.stamp--rotate {
  transform: rotate(-0.4deg);
}
</style>
