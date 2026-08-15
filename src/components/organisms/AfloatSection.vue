<script setup>
import AppEyebrow from '@/components/atoms/AppEyebrow.vue'
import SerifHeading from '@/components/atoms/SerifHeading.vue'
import EmailLink from '@/components/atoms/EmailLink.vue'
import ClosingBeat from '@/components/molecules/ClosingBeat.vue'
import MaintainList from '@/components/molecules/MaintainList.vue'
import RealWaterline from '@/components/molecules/RealWaterline.vue'
import { AFLOAT } from '@/data/content'
import { useWaterlineState } from '@/composables/useWaterline'

const { pageEndPad } = useWaterlineState()
</script>

<template>
  <section id="afloat" data-screen-label="Where We Lay Afloat" class="afloat" :style="{ paddingBottom: pageEndPad }">
    <div class="afloat__intro">
      <AppEyebrow>{{ AFLOAT.eyebrow }}</AppEyebrow>
      <SerifHeading class="afloat__heading">{{ AFLOAT.heading }}</SerifHeading>
    </div>

    <div class="afloat__beats">
      <ClosingBeat v-for="beat in AFLOAT.beats" :key="beat.label" v-bind="beat" />
    </div>

    <div class="afloat__grid">
      <MaintainList :items="AFLOAT.maintain" />

      <div>
        <AppEyebrow size="sm">{{ AFLOAT.joinery.eyebrow }}</AppEyebrow>
        <p class="afloat__joinery-quote" v-reveal>{{ AFLOAT.joinery.quote }}</p>
        <p class="afloat__joinery-note" v-reveal>{{ AFLOAT.joinery.note }}</p>
      </div>
    </div>

    <div class="afloat__footer">
      <EmailLink :email="AFLOAT.email" />
      <div class="afloat__footer-note">{{ AFLOAT.footer }}</div>
    </div>

    <RealWaterline />
  </section>
</template>

<style scoped>
.afloat {
  padding: clamp(90px, 13vh, 170px) var(--page-pad-x);
  position: relative;
  z-index: 1;
}

.afloat__intro {
  max-width: var(--content-max);
}

.afloat__heading {
  margin: 18px 0 0;
}

.afloat__beats {
  margin-top: clamp(48px, 7vh, 84px);
  display: grid;
  gap: clamp(38px, 5vh, 56px);
  max-width: var(--content-max);
}

.afloat__grid {
  margin-top: clamp(70px, 10vh, 120px);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: clamp(40px, 6vw, 96px);
  max-width: var(--content-max);
  align-items: start;
}

.afloat__joinery-quote {
  margin: 20px 0 0;
  font-family: var(--font-serif);
  font-size: clamp(19px, 1.7vw, 24px);
  line-height: 1.55;
  color: var(--c-body-strong);
  max-width: 24em;
}

.afloat__joinery-note {
  margin: 16px 0 0;
  font-size: 15px;
  line-height: 1.8;
  color: var(--c-technical);
  max-width: 26em;
}

.afloat__footer {
  margin-top: clamp(80px, 12vh, 150px);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: 24px;
  max-width: var(--content-max);
}

.afloat__footer-note {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--c-eyebrow);
}
</style>
