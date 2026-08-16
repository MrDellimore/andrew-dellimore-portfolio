import { createApp } from 'vue'
import posthog from 'posthog-js'
import './assets/main.css'
import App from './App.vue'
import { vReveal } from './directives/reveal'

if (import.meta.env.VITE_POSTHOG_KEY) {
  posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
  })
}

const app = createApp(App)
app.directive('reveal', vReveal)
app.mount('#app')
