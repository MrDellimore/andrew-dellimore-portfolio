<script setup>
defineProps({
  active: { type: Boolean, default: false },
  on: { type: Boolean, default: false },
})
</script>

<template>
  <div class="mark" :class="{ 'mark--active': active, 'mark--on': on && !active }"></div>
</template>

<style scoped>
.mark {
  height: 1px;
  width: 11px;
  transform-origin: right center;
  background: var(--c-nav-mark-off);
  transform: scaleX(0.45);
  transition: background 700ms ease, transform 700ms ease;
}

.mark--on {
  background: var(--c-accent);
  transform: scaleX(1);
}

.mark--active {
  background: var(--c-highlight);
  transform: scaleX(1.7);
}
</style>
