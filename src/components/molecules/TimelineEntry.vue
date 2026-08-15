<script setup>
import AppEyebrow from '@/components/atoms/AppEyebrow.vue'
import SerifHeading from '@/components/atoms/SerifHeading.vue'

defineProps({
  stamp: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
})
</script>

<template>
  <div class="entry">
    <AppEyebrow size="sm" class="entry__stamp" v-reveal>{{ stamp }}</AppEyebrow>
    <div>
      <SerifHeading tag="h3" size="sub">{{ title }}</SerifHeading>
      <p class="entry__body" v-reveal>{{ body }}</p>
    </div>
  </div>
</template>

<style scoped>
.entry {
  display: grid;
  grid-template-columns: minmax(0, 200px) minmax(0, 1fr);
  gap: clamp(20px, 4vw, 64px);
  align-items: start;
}

.entry__stamp {
  color: var(--c-accent);
  padding-top: 8px;
}

.entry__body {
  margin: 12px 0 0;
  font-size: 16px;
  line-height: 1.8;
  max-width: 34em;
  color: var(--c-body);
}
</style>
