<script setup>
import SerifHeading from '@/components/atoms/SerifHeading.vue'

defineProps({
  title: { type: String, required: true },
  body: { type: String, required: true },
})
</script>

<template>
  <div class="shallow">
    <SerifHeading tag="h3" size="entry">{{ title }}</SerifHeading>
    <p class="shallow__body" v-reveal>{{ body }}</p>
  </div>
</template>

<style scoped>
.shallow {
  max-width: 34em;
}

.shallow__body {
  margin: 12px 0 0;
  font-size: 16px;
  line-height: 1.8;
  color: var(--c-body);
}
</style>
