<script setup>
defineProps({
  label: { type: String, required: true },
  body: { type: String, required: true },
})
</script>

<template>
  <div class="beat">
    <p v-reveal><strong class="beat__label">{{ label }}</strong> {{ body }}</p>
  </div>
</template>

<style scoped>
.beat {
  max-width: 30em;
}

.beat p {
  margin: 0;
  font-size: clamp(17px, 1.5vw, 20px);
  line-height: 1.8;
  color: var(--c-body-strong);
}

.beat__label {
  font-weight: 500;
}
</style>
