<script setup>
defineProps({
  email: { type: String, required: true },
})
</script>

<template>
  <a :href="`mailto:${email}`" class="email">{{ email }}</a>
</template>

<style scoped>
.email {
  font-family: var(--font-serif);
  font-size: clamp(24px, 3vw, 40px);
  line-height: 1.2;
  border-bottom-width: 1px;
}
</style>
