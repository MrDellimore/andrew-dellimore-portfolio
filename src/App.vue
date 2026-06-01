<template>
  <div class="page">
    <h1 class="name">Andrew<br class="mobile-break"> Dellimore</h1>
    <p class="quote">"There is a tide in the affairs of men. If taken at the flood leads on to fortune, ommitted and all the journies of life are bound to shallows and flats. On these kind seas we lay afloat we must take the tide as it serves us."</p>
  </div>
</template>

<script setup>
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse at 100px 100px, rgba(0, 120, 60, 0.35) 0%, transparent 60%), black;
  position: relative;
}

.name {
  font-family: 'Prompt', sans-serif;
  font-size: clamp(3rem, 8vw, 7rem);
  color: #f0f0f0;
  font-weight: 700;
  letter-spacing: -0.02em;
  text-align: center;
}

.mobile-break {
  display: none;
}

@media (max-width: 600px) {
  .mobile-break {
    display: block;
  }
}

.quote {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: min(680px, 85vw);
  text-align: center;
  color: rgba(240, 240, 240, 0.45);
  font-size: clamp(0.75rem, 1.2vw, 0.95rem);
  font-style: italic;
  line-height: 1.7;
}
</style>
