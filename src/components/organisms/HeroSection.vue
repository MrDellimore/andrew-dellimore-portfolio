<script setup>
import GreetingLine from '@/components/molecules/GreetingLine.vue'
import { HERO_QUOTE, HERO_FOOTNOTE } from '@/data/content'
import { useWaterlineState } from '@/composables/useWaterline'

const { heroPadBottom } = useWaterlineState()
</script>

<template>
  <section id="tide" data-screen-label="The Tide" class="hero" :style="{ paddingBottom: heroPadBottom }">
    <header class="hero__header">
      <span class="hero__name">Andrew Dellimore</span>
      <span class="hero__meta">
        <span>Brooklyn, New York</span>
        <a
          class="hero__social"
          href="https://www.linkedin.com/in/mrdellimore/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
            <path
              d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"
            />
          </svg>
        </a>
      </span>
    </header>

    <div class="hero__body">
      <blockquote class="hero__quote">
        <em>{{ HERO_QUOTE }}</em>
      </blockquote>
      <p class="hero__footnote">
        {{ HERO_FOOTNOTE[0] }}<br />
        {{ HERO_FOOTNOTE[1] }}
      </p>

      <GreetingLine />
    </div>
  </section>
</template>

<style scoped>
.hero {
  --header-h: 55px;
  min-height: 100svh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  padding: 42px var(--page-pad-x);
  padding-top: calc(42px + var(--header-h));
  position: relative;
  z-index: 1;
}

.hero__header {
  height: var(--header-h);
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 7;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 24px;
  padding: 20px var(--page-pad-x);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--c-eyebrow);
  background-color: var(--c-page-bg);
  background-image: linear-gradient(to bottom, var(--c-page-bg) 0%, oklch(0.94 0.012 84 / 0) 100%);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
}

.hero__name {
  color: var(--c-heading);
}

.hero__meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.hero__social {
  display: inline-flex;
  color: var(--c-eyebrow);
  transition: color 160ms ease;
}

.hero__social:hover,
.hero__social:focus-visible {
  color: var(--c-heading);
}

.hero__body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1180px;
  min-height: 0;
  padding: clamp(0px, 3vh, 78px) 0 0;
}

.hero__quote {
  margin: 0;
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: clamp(24px, min(3.5vw, 5.2vh), 52px);
  line-height: 1.3;
  letter-spacing: -0.005em;
  max-width: 21em;
  text-wrap: pretty;
}

.hero__quote em {
  font-style: italic;
}

.hero__footnote {
  margin: clamp(18px, 3vh, 30px) 0 0;
  font-size: 13px;
  font-style: italic;
  line-height: 1.7;
  max-width: 30em;
  align-self: flex-end;
  text-align: right;
  color: var(--c-footnote);
}
</style>
