<script setup>
import AppEyebrow from '@/components/atoms/AppEyebrow.vue'

defineProps({
  items: { type: Array, required: true },
})
</script>

<template>
  <div>
    <AppEyebrow size="sm">Things I maintain</AppEyebrow>
    <div class="maintain" v-reveal>
      <div v-for="item in items" :key="item" v-html="item"></div>
    </div>
  </div>
</template>

<style scoped>
.maintain {
  margin-top: 20px;
  display: grid;
  gap: 12px;
  font-size: 16px;
  line-height: 1.7;
  color: var(--c-body);
  max-width: 26em;
}
</style>
