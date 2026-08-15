<script setup>
import SwashBackground from '@/components/organisms/SwashBackground.vue'
import SiteNavRail from '@/components/organisms/SiteNavRail.vue'
import TideReadoutBar from '@/components/molecules/TideReadoutBar.vue'
import HeroSection from '@/components/organisms/HeroSection.vue'
import FloodSection from '@/components/organisms/FloodSection.vue'
import VenturesSection from '@/components/organisms/VenturesSection.vue'
import ShallowsSection from '@/components/organisms/ShallowsSection.vue'
import AfloatSection from '@/components/organisms/AfloatSection.vue'
import { provideWaterline } from '@/composables/useWaterline'

const { submerged, seaRestFraction } = provideWaterline()
</script>

<template>
  <div class="page">
    <SwashBackground
      v-if="submerged"
      :hue="214"
      :sat="20"
      :period="8"
      :swell="34"
      :crest="40"
      :sea-rest-fraction="seaRestFraction"
    />

    <TideReadoutBar />
    <SiteNavRail />

    <HeroSection />
    <FloodSection />
    <VenturesSection />
    <ShallowsSection />
    <AfloatSection />
  </div>
</template>

<style scoped>
.page {
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
}
</style>
