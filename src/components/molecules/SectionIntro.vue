<script setup>
import AppEyebrow from '@/components/atoms/AppEyebrow.vue'
import SerifHeading from '@/components/atoms/SerifHeading.vue'

defineProps({
  eyebrow: { type: String, required: true },
  heading: { type: String, required: true },
  intro: { type: String, default: '' },
})
</script>

<template>
  <div class="intro">
    <AppEyebrow>{{ eyebrow }}</AppEyebrow>
    <SerifHeading class="intro__heading">{{ heading }}</SerifHeading>
    <p v-if="intro" class="intro__lede" v-reveal>{{ intro }}</p>
  </div>
</template>

<style scoped>
.intro {
  max-width: var(--content-max);
  position: relative;
}

.intro__heading {
  margin: 18px 0 0;
}

.intro__lede {
  margin: 34px 0 0;
  font-size: clamp(17px, 1.5vw, 21px);
  line-height: 1.75;
  max-width: 26em;
  color: var(--c-body-soft);
}
</style>
