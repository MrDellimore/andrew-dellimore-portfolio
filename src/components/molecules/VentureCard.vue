<script setup>
import LocationStamp from '@/components/atoms/LocationStamp.vue'
import SerifHeading from '@/components/atoms/SerifHeading.vue'
import UnderTheHood from '@/components/molecules/UnderTheHood.vue'

defineProps({
  stamp: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  featured: { type: Boolean, default: false },
  imageCaption: { type: String, default: '' },
  underTheHood: { type: Array, default: null },
  technicalNote: { type: String, default: '' },
})
</script>

<template>
  <article class="venture" :class="{ 'venture--featured': featured }">
    <div>
      <LocationStamp>{{ stamp }}</LocationStamp>
      <SerifHeading tag="h3" :size="featured ? 'featured' : 'card'" class="venture__title">{{ title }}</SerifHeading>
      <p class="venture__body" v-reveal>{{ body }}</p>
      <p v-if="technicalNote" class="venture__technical" v-reveal>{{ technicalNote }}</p>
      <UnderTheHood v-if="underTheHood" :lines="underTheHood" />
    </div>
    <div v-if="featured" class="venture__image" v-reveal>
      <span>{{ imageCaption }}</span>
    </div>
  </article>
</template>

<style scoped>
.venture--featured {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 400px);
  gap: clamp(24px, 4vw, 72px);
  align-items: start;
}

.venture__title {
  margin-top: 14px;
}

.venture__body {
  margin: 12px 0 0;
  font-size: 16px;
  line-height: 1.8;
  max-width: 36em;
  color: var(--c-body);
}

.venture__technical {
  margin: 12px 0 0;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.9;
  color: var(--c-technical);
  max-width: 38em;
}

.venture__image {
  aspect-ratio: 4 / 3;
  background: repeating-linear-gradient(135deg, oklch(0.5 0.024 152 / 0.1) 0 6px, oklch(0.5 0.024 152 / 0) 6px 12px);
  display: grid;
  place-items: center;
}

.venture__image span {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--c-eyebrow);
  padding: 12px;
  text-align: center;
}
</style>
