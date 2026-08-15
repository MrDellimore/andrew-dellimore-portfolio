<script setup>
import AppEyebrow from '@/components/atoms/AppEyebrow.vue'
import { useWaterlineReadings } from '@/composables/useWaterlineReadings'

const readings = useWaterlineReadings()
</script>

<template>
  <div class="real-waterline">
    <AppEyebrow size="sm">The actual waterline, right now</AppEyebrow>

    <ul class="real-waterline__list">
      <li v-for="r in readings" :key="r.id" class="real-waterline__row">
        <span class="real-waterline__place">{{ r.place }}</span>

        <span class="real-waterline__reading">
          <template v-if="r.status === 'ok'">{{ r.reading }} <span class="real-waterline__updated">· {{ r.updated }}</span></template>
          <template v-else-if="r.status === 'loading'">reading…</template>
          <template v-else-if="r.status === 'unavailable'">no live reading right now</template>
          <template v-else>no public API — see live</template>
        </span>

        <a :href="r.sourceUrl" target="_blank" rel="noopener noreferrer" class="real-waterline__link" :title="r.detail">
          <span class="real-waterline__link-label">source</span>
          <svg class="real-waterline__link-icon" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M2.5 7.5L7.5 2.5M7.5 2.5H3.5M7.5 2.5V6.5" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.real-waterline {
  margin-top: clamp(48px, 7vh, 84px);
  max-width: var(--content-max);
}

.real-waterline__list {
  list-style: none;
  margin: 14px 0 0;
  padding: 0;
  display: grid;
  gap: 10px;
}

.real-waterline__row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 10px;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.03em;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--c-accent-border);
}

.real-waterline__place {
  color: var(--c-body-strong);
  min-width: 8em;
}

.real-waterline__reading {
  color: var(--c-technical);
  flex: 1;
}

.real-waterline__updated {
  color: var(--c-footnote);
}

.real-waterline__link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--c-accent);
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 0.1em;
  border-bottom-width: 0;
}

.real-waterline__link:hover {
  color: var(--c-accent-hover);
}

.real-waterline__link-icon {
  flex: none;
}
</style>
