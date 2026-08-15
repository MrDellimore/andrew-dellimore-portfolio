<script setup>
import SectionIntro from '@/components/molecules/SectionIntro.vue'
import TimelineEntry from '@/components/molecules/TimelineEntry.vue'
import { FLOOD } from '@/data/content'
</script>

<template>
  <section id="flood" data-screen-label="Taken at the Flood" class="flood">
    <SectionIntro :eyebrow="FLOOD.eyebrow" :heading="FLOOD.heading" :intro="FLOOD.intro" />

    <div class="flood__list">
      <TimelineEntry v-for="entry in FLOOD.entries" :key="entry.title" v-bind="entry" />
    </div>
  </section>
</template>

<style scoped>
.flood {
  padding: clamp(90px, 13vh, 170px) var(--page-pad-x);
  position: relative;
  z-index: 1;
}

.flood__list {
  margin-top: clamp(56px, 8vh, 104px);
  display: grid;
  gap: clamp(44px, 6vh, 72px);
  max-width: var(--content-max);
}
</style>
