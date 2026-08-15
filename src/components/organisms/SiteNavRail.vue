<script setup>
import IslandMark from '@/components/atoms/IslandMark.vue'
import { useWaterlineState } from '@/composables/useWaterline'

const { navHover, setNavHover, here, islandName, islandOrdinal, marks } = useWaterlineState()
</script>

<template>
  <nav class="rail" @mouseenter="setNavHover(true)" @mouseleave="setNavHover(false)">
    <div class="rail__island" :style="{ top: `${here * 6}px` }" :class="{ 'rail__island--visible': navHover }">
      <span class="rail__ordinal">{{ islandOrdinal }}</span>
      <span class="rail__name">{{ islandName }}</span>
    </div>
    <IslandMark v-for="(m, i) in marks" :key="i" :active="m.active" :on="m.on" />
  </nav>
</template>

<style scoped>
.rail {
  position: fixed;
  right: 22px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 8;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-end;
  padding: 10px 0 10px 34px;
}

.rail__island {
  position: absolute;
  right: 26px;
  margin-top: 10px;
  transform: translateY(-50%) translateX(6px);
  opacity: 0;
  transition:
    opacity 260ms ease,
    transform 260ms ease,
    top 220ms ease;
  pointer-events: none;
  display: flex;
  align-items: baseline;
  gap: 10px;
  white-space: nowrap;
  font-family: var(--font-mono);
}

.rail__island--visible {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}

.rail__ordinal {
  font-size: 9px;
  letter-spacing: 0.14em;
  color: var(--c-island-ordinal);
}

.rail__name {
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--c-highlight);
}
</style>
