<script setup>
import SectionIntro from '@/components/molecules/SectionIntro.vue'
import ShallowEntry from '@/components/molecules/ShallowEntry.vue'
import { SHALLOWS } from '@/data/content'
import { useWaterlineState } from '@/composables/useWaterline'

const { flood } = useWaterlineState()
</script>

<template>
  <section id="shallows" data-screen-label="Shallows" class="shallows">
    <!-- kumiko-style geometric motif, used once -->
    <div class="shallows__texture" aria-hidden="true"></div>

    <SectionIntro :eyebrow="SHALLOWS.eyebrow" :heading="SHALLOWS.heading" :intro="SHALLOWS.intro" />

    <div class="shallows__list">
      <ShallowEntry v-for="entry in SHALLOWS.entries" :key="entry.title" v-bind="entry" />
      <ShallowEntry v-if="flood" v-bind="SHALLOWS.hiddenAtFlood" />
    </div>
  </section>
</template>

<style scoped>
.shallows {
  padding: clamp(90px, 13vh, 170px) var(--page-pad-x);
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.shallows__texture {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.42;
  background-image:
    repeating-linear-gradient(60deg, var(--c-kumiko-line) 0 1px, transparent 1px 34px),
    repeating-linear-gradient(-60deg, var(--c-kumiko-line) 0 1px, transparent 1px 34px),
    repeating-linear-gradient(to right, var(--c-kumiko-line) 0 1px, transparent 1px 34px);
  mask-image: linear-gradient(to bottom, transparent, #000 30%, #000 70%, transparent);
}

.shallows__list {
  margin-top: clamp(56px, 8vh, 104px);
  display: grid;
  gap: clamp(40px, 6vh, 64px);
  max-width: var(--content-max);
  position: relative;
}
</style>
