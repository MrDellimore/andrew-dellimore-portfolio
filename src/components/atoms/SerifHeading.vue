<script setup>
defineProps({
  tag: { type: String, default: 'h2' },
  size: { type: String, default: 'section', validator: (v) => ['section', 'sub', 'card', 'entry', 'featured'].includes(v) },
})
</script>

<template>
  <component :is="tag" class="serif-heading" :class="`serif-heading--${size}`">
    <slot />
  </component>
</template>

<style scoped>
.serif-heading {
  margin: 0;
  font-family: var(--font-serif);
  font-weight: 400;
  color: var(--c-heading);
}

/* section title, e.g. "the Flood" */
.serif-heading--section {
  font-size: clamp(30px, 4vw, 58px);
  line-height: 1.1;
  letter-spacing: -0.015em;
}

/* flood timeline entry title */
.serif-heading--sub {
  font-size: clamp(21px, 2vw, 28px);
  line-height: 1.3;
}

/* venture / shallow card title */
.serif-heading--card {
  font-size: clamp(22px, 2.1vw, 30px);
  line-height: 1.25;
}

.serif-heading--entry {
  font-size: clamp(20px, 1.9vw, 26px);
  line-height: 1.3;
}

.serif-heading--featured {
  font-size: clamp(24px, 2.4vw, 36px);
  line-height: 1.2;
}
</style>
