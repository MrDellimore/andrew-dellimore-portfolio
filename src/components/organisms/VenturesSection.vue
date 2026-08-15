<script setup>
import SectionIntro from '@/components/molecules/SectionIntro.vue'
import VentureCard from '@/components/molecules/VentureCard.vue'
import { VENTURES } from '@/data/content'
import { useWaterlineState } from '@/composables/useWaterline'

const { flood } = useWaterlineState()
</script>

<template>
  <section id="ventures" data-screen-label="Our Ventures" class="ventures">
    <SectionIntro :eyebrow="VENTURES.eyebrow" :heading="VENTURES.heading" :intro="VENTURES.intro" />

    <div class="ventures__list">
      <VentureCard v-for="item in VENTURES.items" :key="item.title" v-bind="item" />
      <VentureCard v-if="flood" v-bind="VENTURES.hiddenAtFlood" />
    </div>
  </section>
</template>

<style scoped>
.ventures {
  padding: clamp(90px, 13vh, 170px) var(--page-pad-x);
  position: relative;
  z-index: 1;
}

.ventures__list {
  margin-top: clamp(56px, 8vh, 104px);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: clamp(48px, 7vh, 88px) clamp(32px, 4vw, 64px);
  max-width: var(--content-max);
}

/* the featured venture (with photo) spans the full row; the rest sit two-up */
.ventures__list :deep(.venture--featured) {
  grid-column: 1 / -1;
}
</style>
