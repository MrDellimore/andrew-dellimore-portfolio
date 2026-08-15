# Andrew Dellimore — Portfolio

My personal site: [andrewdellimore.com](https://andrewdellimore.com). One long page, built around a single quote — "There is a tide in the affairs of men..." — with each section named after a line of it: **the Tide** (hero), **the Flood** (career pivots), **to Fortune** (project highlights), **to Shallows** (what didn't work), and **the Tide** again (where things stand now).

The waterline itself is real: it's driven by live NOAA tide predictions for The Battery, New York, and rises and falls across the page as you scroll.

## Stack

- [Vue 3](https://vuejs.org/) + [Vite](https://vite.dev/), no UI framework or CSS library
- Plain CSS with design tokens (`src/assets/tokens.css`) for type, color, and spacing
- Components organized atoms → molecules → organisms
- Deployed on push to `main` via GitHub Actions to S3 + CloudFront (`.github/workflows/deploy.yml`)

## Project setup

```sh
npm install
```

### Development

```sh
npm run dev
```

### Production build

```sh
npm run build
```
