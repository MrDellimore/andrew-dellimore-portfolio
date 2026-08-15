// Content ported verbatim from the Claude Design source
// ("Andrew Dellimore Portfolio.dc.html"). The quote is the site map —
// each section title is a line from the father's version of the speech.

export const NOAA_STATION = '8518750' // The Battery, New York

export const HERO_QUOTE =
  'There is a tide in the affairs of men. If taken at the flood leads on to fortune; omitted, and all the journeys of life are bound to shallows and flats. On these kind seas we lay afloat, and we must take the tide as it serves us.'

export const HERO_FOOTNOTE = [
  "This is how my father said it. Shakespeare wrote it a little differently.",
  "I prefer my father's.",
]

export const GREETING_LABEL = 'Good morning, in the tongues my travels taught me'

export const GREETINGS = [
  { word: 'Gutn tog', note: "learned at a camera company in Brooklyn, praying with the team at three o'clock" },
  { word: 'Buenos días', note: 'learned on a warehouse floor in New Jersey, receiving purchase orders' },
  { word: 'Selamat pagi', note: "learned in Malaysia, buying vegetables from people who didn't speak English" },
  { word: 'Ohayo gozaimasu', note: 'learned out of a backpack in 2015, badly, and used every day for months' },
  { word: 'Joeun achimieyo', note: 'picked up in Seoul, over a second cup of coffee before a supplier meeting' },
  { word: 'Zǎoshàng hǎo', note: 'picked up in Shanghai, waiting on a shipment that never came on time' },
  { word: 'Subha udesanak', note: 'picked up on a tea estate outside Kandy, before the pickers went out' },
  { word: 'Suprabhat', note: 'picked up in Delhi, somewhere between two meetings and a missed flight' },
  { word: 'Magandang umaga', note: 'picked up in Manila, from a fixer who became something closer to family' },
  { word: 'Dobroho ranku', note: 'picked up in Brooklyn, from a neighbor who never left home behind' },
  { word: 'Bonjour', note: 'learned from my grandmother, who never said it any other way' },
  { word: 'Shuprabhat', note: 'picked up on a trail out of Pokhara, before the fog had lifted' },
  { word: 'Arun sawat', note: 'picked up in a Chiang Mai market, buying breakfast before the heat set in' },
]

// The 32 islands and cays of St Vincent and the Grenadines, ordered north to south.
export const ISLANDS = [
  'Saint Vincent', 'Young Island', 'Fort Duvernette', 'Milligan Cay', 'Bequia', 'West Cay',
  'Pigeon Island', 'Petit Nevis', 'Isle à Quatre', 'Semplers Cay', 'Baliceaux', 'Battowia',
  'The Pillories', 'Petit Canouan', 'Mustique', 'Petite Mustique', 'Savan Island', 'Canouan',
  'Petit Rameau', 'Petit Bateau', 'Baradal', 'Jamesby', 'Petit Tabac', 'Mayreau',
  'Catholic Island', 'Union Island', 'Frigate Island', 'Palm Island', 'Petit Saint Vincent',
  'Mopion', 'Pinese', 'Sand Cay',
]

export const FLOOD = {
  eyebrow: 'If taken at the flood',
  heading: 'the Flood',
  intro: "I've changed direction five or six times. Every one of them looked reckless from outside and obvious from inside.",
  entries: [
    {
      stamp: '2015 · Tokyo',
      title: 'A one-way ticket',
      body: 'Left a director job and flew to Japan with a backpack. Lived out of it for months.',
    },
    {
      stamp: 'Kuala Lumpur',
      title: 'Moved the family for the produce',
      body: 'My daughter digested Southeast Asian produce better than what we were buying in New York, so we went to where it grew.',
    },
    {
      stamp: 'Selangor',
      title: 'Two strangers, then a company',
      body: 'Met two people, became a technology co-founder, and spent a year and a half building a marketplace in a language I learned on arrival. A hundred and fifty farms. Michelin kitchens on one end, foragers on the other.',
    },
    {
      stamp: 'Brooklyn',
      title: 'Came home',
      body: 'Back where I started, with the part of the last company that worked.',
    },
  ],
}

export const VENTURES = {
  eyebrow: 'leads to fortune — the highlight reel',
  heading: 'to Fortune',
  intro: 'Sixteen years of commerce software. Warehouses, marketplaces, ERPs, subscriptions, supply chains. Most of it built next to the people using it.',
  items: [
    {
      stamp: 'Built in Kuala Lumpur, and in farm sheds up-country',
      title: 'LocalPasar',
      body: "A venture-backed B2B agricultural marketplace supplying Michelin-star kitchens, where the catalogue doesn't exist until someone harvests it. WhatsApp is where the orders actually arrived, so the order desk moved into WhatsApp. A CRM over 150+ farms ranked candidate growers by distance, because for a depreciating asset proximity is freshness and margin at once. I built eighty to ninety per cent of the platform.",
      underTheHood: [
        'Cloud — AWS primary, GCP in parallel against credits',
        'Frontend — Vue.js, static assets on S3 via CDN; product pages compiled to static at the edge',
        'Async — anything slower than a few milliseconds deferred to autoscaling queue workers',
        'Messaging — Twilio as BSP; Go service for the real-time WhatsApp layer with intent routing',
        'Voice — Whisper transcription, including regional languages',
        'IaC — Terraform throughout',
      ],
    },
    {
      stamp: 'Built standing in a cold room',
      title: 'Cold room inventory',
      body: 'The same SKU received Tuesday and Thursday becomes one undifferentiated pile, and the old stock ages out at the back. I retrofitted the room with discrete shelf locations mapped in the system: a different receipt date goes to a different location rather than merging. Freshness enforced by where something sits instead of by whether someone remembers. The software design and the physical design were the same design.',
    },
    {
      stamp: 'Built between Brooklyn and Selangor',
      title: 'PasarVoice',
      body: 'A chicken processor running five production teams — Myanmar, Nepal, Bangladesh, Pakistan, Indonesia — with no shared language to record what happened on the floor. The information exists; every supervisor knows what their line did. So the interface is a voice note in the speaker\'s own language, and the AI performs an action rather than a conversation: transcription, intent, a real ERP write. The user never learns a system. They say what happened.',
      underTheHood: [
        'Frontend — Vue.js as a PWA with mobile push; an installable app without an app store',
        'Messaging — Twilio as BSP; voice notes transcribed, intent extracted, routed to an ERP write',
        'Real time — websockets live, autoscaling queue absorbing shift-change peaks',
        'Tenancy — multi-tenant from the first commit; onboarding is configuration, not a deployment',
        "Interop — Excel import/export, deliberately. A manual sync that works beats an API that's always six weeks away.",
      ],
    },
    {
      stamp: 'Built in Brooklyn, for a hundred thousand people at once',
      title: 'Kinder Beauty subscriptions',
      body: 'Around a hundred thousand recurring subscriptions, every one of them customisable, with inventory that had to stay honest while thousands of people picked from the same shelf simultaneously. Thirty per cent of incoming webhooks were failing; the fix was sequencing, not capacity — acknowledge in milliseconds, do the work behind the scenes. Reservation on selection, websocket broadcast so options disable live, and an honest failure path when two clicks genuinely collide.',
      technicalNote: '30% of webhooks failing → 100% success across ~100,000. Overselling was mitigated substantially, not solved absolutely; other channels touched the same inventory and a single source of truth across them was out of scope.',
    },
    {
      stamp: 'Built on a warehouse floor in New Jersey',
      title: 'Reverse-logistics WMS',
      body: 'A warehouse management system for goods travelling the wrong way down the supply chain. I learned Spanish on that floor, receiving purchase orders alongside the temp workers.',
    },
    {
      stamp: 'Built in Brooklyn',
      title: 'Product import manager',
      body: "A tool for getting other people's catalogues into a system that disagrees with them.",
    },
    {
      stamp: 'Built on the Boston–New York train, in three hours',
      title: 'RentRoll',
      body: "A landlord reconciling Zelle payments against a bank statement by eye, every month, for a dozen properties. Multi-tenant rent collection, rough around the edges, a weekend of work from its first real user. Multi-tenant from the first commit and the payment provider swappable — the same principles as everything above, executed in an afternoon instead of a month. I don't fly, so I had the time.",
    },
  ],
  // shown only under the "reveal" / "both" waterline mechanic, at high tide
  hiddenAtFlood: {
    stamp: "Built in an apartment, on a hobbyist's schedule",
    title: 'Matahari',
    body: 'A home server named for the sun, running the seven-stage RO/DI system that feeds a reef tank. Salinity, temperature, alkalinity, dosing. It is the smallest supply chain I operate and the only one where the customers die if I get it wrong.',
  },
}

export const SHALLOWS = {
  eyebrow: 'Bound to shallows and flats',
  heading: 'to Shallows',
  intro: "The things that didn't work, which is most of the useful part.",
  entries: [
    {
      title: 'We tried five business models at once',
      body: "A grocer, a frozen fruit line, B2B restaurant supply, B2C, and B2B2C through a national chain. We got regenerative produce onto Jaya Grocer's shelves, a first in Malaysia. We ran out of rope before any single line compounded. Two weeks on an initiative, then a fire, then another fire. The architecture held. The focus didn't.",
    },
    {
      title: 'Ten acres',
      body: 'Soil we were trying to heal, up-country. I walked away from it.',
    },
    {
      title: 'A client that went out of business',
      body: "The system worked. The company didn't.",
    },
    {
      title: 'My weakness was never moving carelessly',
      body: 'It was moving too slowly.',
    },
  ],
  // shown only under the "reveal" / "both" waterline mechanic, at high tide
  hiddenAtFlood: {
    title: 'A quote I have used to explain leaving',
    body: "Twice it was the right call and once it was cover. I still can't tell you which one was which at the time.",
  },
}

export const AFLOAT = {
  eyebrow: 'On these kind seas we lay afloat',
  heading: 'the Tide',
  beats: [
    { label: 'Where I am.', body: 'Back in Brooklyn, after two years in Malaysia. Working from a desk here and a floor there.' },
    { label: "What I'm building.", body: "PasarVoice — a voice-driven ERP for people who will never open an ERP. Five production teams, five languages, one WhatsApp thread. It's the part of the last company that worked, rebuilt as its own thing." },
    { label: "What I'm looking for.", body: "Food, supply chains, and the software that moves physical things through a city. Somewhere small enough that I'm still writing code, and serious enough that it matters which code." },
  ],
  maintain: [
    'A reef tank, and a seven-stage RO/DI system to feed it.',
    'A home server named Matahari — <em>sun</em>, in Malay.',
    'Ten acres of soil in Malaysia, for a while, which we were trying to heal.',
    'A property in Brooklyn.',
    'An ERP with three customers, on the QuickBooks app store.',
    'A property management app with one user, once I get around to onboarding my mother.',
  ],
  joinery: {
    eyebrow: 'On the fast version',
    quote: 'AI is flat-pack furniture. It assembles fast. I do Japanese joinery in my own time — slow, unforgiving, no fasteners. What I\'ve found is that the person who can do the slow version assembles the fast version thoughtfully.',
    note: 'There are no borders on this page. Joinery holds by geometry, not by hardware, and so does a layout.',
  },
  email: 'AndrewDellimore@gmail.com',
  footer: 'St. Vincent and the Grenadines · Brooklyn · Malaysia',
}
