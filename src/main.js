import posthog from 'posthog-js'

if (import.meta.env.VITE_POSTHOG_KEY) {
  posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
  })
}

// CloudFront serves index.html for unknown paths, so pages are picked here.
// Each page loads its own CSS, so the proposal never inherits homepage styles.
if (location.pathname.replace(/\/+$/, '') === '/gdi-proposal') import('./gdi-proposal/main.js')
else import('./home.js')
