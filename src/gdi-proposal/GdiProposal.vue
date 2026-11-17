<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const FEE = 4500
const WORKDAYS_PER_MONTH = 21.67
const SECTIONS = ['Partner', 'Opportunity', 'Roadmap', 'How we work', 'Investment']

const muted = (pct) => `color:color-mix(in srgb,var(--color-text) ${pct}%,transparent)`
const eyebrow = 'font-size:13px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;color:var(--color-accent-700)'
const sectionEyebrow = `${eyebrow};padding-bottom:12px;border-bottom:1px solid var(--color-divider);margin-bottom:24px`
const sectionPad = 'max-width:1200px;margin:0 auto;padding:clamp(40px,6cqw,80px) clamp(20px,5cqw,56px) clamp(56px,8cqw,104px)'
const h2 = 'font-size:clamp(36px,6cqw,72px);line-height:1.04;letter-spacing:.01em;text-transform:uppercase;margin:0;text-wrap:balance'
const cardTitle = 'font-family:var(--font-heading);font-weight:600;font-size:24px;text-transform:uppercase;letter-spacing:.02em;line-height:1.1'
const list = 'margin:0;padding:0;list-style:none;display:grid;gap:10px;font-size:15px;line-height:1.4'
const stat = 'font-family:var(--font-heading);font-weight:600;font-size:28px;line-height:1.1;font-variant-numeric:tabular-nums;margin-top:4px'
const stepperBtn = 'width:48px;height:48px;border:1px solid var(--color-divider);background:transparent;font-size:24px;line-height:1;color:var(--color-text);cursor:pointer'

const highlights = [
  ['16 years', 'building e-commerce and operations software'],
  ['End to end', 'receiving, warehouse, shipping, marketplaces, reporting, financials'],
  ['Founder experience', 'I think about revenue and operations, not only code'],
]
const phases = [
  { when: '01 · November to December', name: 'Measure', items: ['Sellercloud and Aiken data in one place', 'Clean, accurate reporting dashboard', 'Scan or tap tracking at the kitting stations', 'A real baseline for throughput'] },
  { when: '02 · From January', name: 'Optimize', items: ['Receiving synced across Sellercloud and Aiken', 'Inventory by serial number and location', 'Labelled warehouse locations with scan in and scan out', 'Location audits'] },
  { when: '03', name: 'Expand', items: ['Repair work orders and standard procedures', 'Disassembly, parts testing and component inventory', 'Builds with true kitted cost', 'Purchase orders tied to serial-level profit and lot turnaround', 'Returns'] },
  { when: '04', name: 'Own', items: ['Client portal for ITAD customers', 'Marketplace listings and QuickBooks integration', 'Handheld mobile scanning', 'Sellercloud retired'] },
]
const ways = [
  ['phone-call', 'Weekly call', 'to review progress and set priorities'],
  ['flag', 'Milestone-based delivery', 'you see working software at every step'],
  ['map-pin', 'On site when it matters', 'integrations, station setup and staff training'],
  ['users', 'Alongside your team', 'I work with your operations lead, not around them'],
]
const tiers = [
  { name: 'Baseline', when: 'November, one week', price: '$625', items: ['Workflow mapped from receiving to shipment', 'Sellercloud and Aiken connected', 'First reporting dashboard live', 'Up to 2 site visits'] },
  { name: 'Pilot', when: 'December', price: '$2,500', items: ['Scan or tap tracking on the warehouse floor', 'Live operations dashboard', 'Baseline numbers and an improvement target', 'Project list ranked by return'] },
]
const presets = [['Conservative', 20], ['Target', 30], ['Stretch', 50], ['Double', 100]]
const waHref = 'https://wa.me/19173769168?text=' + encodeURIComponent('Hi Andrew, I approve the November baseline for GDI Trading.')

// Calculator
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const money = (n) => '$' + Math.round(n).toLocaleString('en-US')
const nums = ref({ staff: 7, rate: 15, hours: 40 })
const steppers = [
  { label: 'Warehouse staff', key: 'staff', lo: 1, hi: 50, pre: '' },
  { label: 'Hourly labour cost', key: 'rate', lo: 10, hi: 50, pre: '$' },
  { label: 'Hours per person per week', key: 'hours', lo: 10, hi: 60, pre: '' },
]
const step = (s, d) => { nums.value[s.key] = clamp(nums.value[s.key] + d, s.lo, s.hi) }
const unitsRaw = ref('500')
const pct = ref(30)

const calc = computed(() => {
  const units = clamp(parseInt(unitsRaw.value, 10) || 1, 1, 10000)
  const { staff, rate, hours } = nums.value
  const payroll = staff * rate * hours * 52 / 12
  const imp = pct.value / 100
  const value = payroll * imp
  const after = units * (1 + imp)
  const top = Math.max(value, FEE)
  return {
    units,
    payroll: money(payroll),
    value: money(value),
    multiple: (value / FEE).toFixed(1) + 'x',
    valueW: (value / top * 100) + '%',
    feeW: (FEE / top * 100) + '%',
    unitsBefore: units.toLocaleString('en-US'),
    unitsAfter: Math.round(after).toLocaleString('en-US'),
    hires: (staff * imp).toFixed(1),
    cpuBefore: '$' + (payroll / (units * WORKDAYS_PER_MONTH)).toFixed(2),
    cpuAfter: '$' + (payroll / (after * WORKDAYS_PER_MONTH)).toFixed(2),
  }
})

// Narrow layout: the calculator becomes a card that flips between results and inputs.
const narrow = ref(false)
const flippedRaw = ref(false)
const flipped = computed(() => narrow.value && flippedRaw.value)

// Section dots
const scroller = ref(null)
const active = ref(0)
const secs = () => (scroller.value ? Array.from(scroller.value.querySelectorAll('[data-sec]')) : [])
function onScroll() {
  const sc = scroller.value
  const y = sc.scrollTop + sc.clientHeight * 0.4
  let a = 0
  secs().forEach((el, i) => { if (el.offsetTop <= y) a = i })
  if (sc.scrollTop + sc.clientHeight >= sc.scrollHeight - 4) a = secs().length - 1
  active.value = a
}
const go = (i) => { const el = secs()[i]; if (el) scroller.value.scrollTo({ top: el.offsetTop, behavior: 'smooth' }) }

let ro
onMounted(() => {
  ro = new ResizeObserver(() => { narrow.value = scroller.value.clientWidth < 720 })
  ro.observe(scroller.value)
})
onBeforeUnmount(() => ro?.disconnect())
</script>

<template>
  <div style="position:relative;height:100vh;height:100dvh;overflow:hidden;background:var(--color-bg)">
    <nav aria-label="Sections" style="position:absolute;right:6px;top:50%;transform:translateY(-50%);z-index:5;display:flex;flex-direction:column;gap:2px">
      <button v-for="(label, i) in SECTIONS" :key="label" @click="go(i)" :aria-label="label" :title="label" style="width:28px;height:28px;padding:0;border:0;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center">
        <span :style="`width:${i === active ? 10 : 6}px;height:${i === active ? 10 : 6}px;border:1px solid var(--color-accent-700);background:${i === active ? 'var(--color-accent-700)' : 'var(--color-bg)'};transition:all .15s`"></span>
      </button>
    </nav>

    <div ref="scroller" @scroll.passive="onScroll" style="position:relative;height:100%;overflow-y:auto;overflow-x:hidden;container-type:inline-size;background:var(--color-bg);color:var(--color-text);font-size:16px;line-height:1.5">

      <header style="max-width:1200px;margin:0 auto;padding:18px clamp(20px,5cqw,56px);display:flex;justify-content:space-between;align-items:baseline;gap:6px 16px;flex-wrap:wrap">
        <span style="font-family:var(--font-heading);font-weight:600;font-size:20px">Andrew Dellimore</span>
        <span :style="`font-size:13px;letter-spacing:.08em;text-transform:uppercase;font-weight:500;${muted(70)}`">Proposal for GDI Trading</span>
      </header>

      <!-- 01 Partner -->
      <section data-sec="Partner" style="max-width:1200px;margin:0 auto;padding:clamp(40px,7cqw,88px) clamp(20px,5cqw,56px) clamp(56px,8cqw,104px)">
        <div :style="`${eyebrow};margin-bottom:20px`">Fractional CTO for GDI Trading</div>
        <h1 style="font-size:clamp(44px,7.5cqw,96px);line-height:1.04;letter-spacing:.01em;text-transform:uppercase;margin:0 0 0 -.05em;max-width:16ch;text-wrap:balance">Your own head of technology, without the full-time hire</h1>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:28px clamp(20px,3cqw,40px);margin-top:clamp(40px,6cqw,72px)">
          <div v-for="[big, small] in highlights" :key="big" class="blueprint" style="padding:22px">
            <i class="corner tl"></i><i class="corner tr"></i><i class="corner bl"></i><i class="corner br"></i>
            <div style="font-family:var(--font-heading);font-weight:600;font-size:44px;line-height:1;text-transform:uppercase;letter-spacing:.01em">{{ big }}</div>
            <div :style="`margin-top:12px;${muted(78)}`">{{ small }}</div>
          </div>
        </div>
        <div style="margin-top:36px;display:flex;flex-wrap:wrap;align-items:baseline;gap:10px 32px">
          <span :style="`${eyebrow};flex:0 0 ${narrow ? '100%' : 'auto'}`">Experience includes</span>
          <span :style="`font-family:var(--font-heading);font-weight:600;font-size:22px;flex:0 0 ${narrow ? '100%' : 'auto'}`">Focus Camera</span>
          <span :style="`font-family:var(--font-heading);font-weight:600;font-size:22px;flex:0 0 ${narrow ? '100%' : 'auto'}`">Front Row Electronics</span>
          <span style="font-family:var(--font-heading);font-weight:600;font-size:22px">Click Go and Buy <span :style="`font-family:var(--font-body);font-weight:400;font-size:15px;${muted(70)}`">(reverse logistics)</span></span>
        </div>
      </section>

      <!-- 02 Opportunity -->
      <section data-sec="Opportunity" style="max-width:1200px;margin:0 auto;padding:clamp(40px,6cqw,80px) clamp(20px,5cqw,56px) clamp(56px,8cqw,104px)">
        <div :style="sectionEyebrow">02 · The opportunity</div>
        <h2 :style="h2">Scale output without scaling payroll</h2>
        <p :style="`font-size:clamp(17px,2cqw,21px);margin:14px 0 0;${muted(78)}`">See what a more efficient warehouse is worth</p>

        <div style="perspective:1600px;margin-top:clamp(28px,4cqw,44px)">
          <div class="blueprint" :style="`display:grid;grid-template-columns:${narrow ? 'minmax(0,1fr)' : 'repeat(auto-fit,minmax(min(100%,340px),1fr))'};transform-style:preserve-3d;transition:transform .7s cubic-bezier(.4,.1,.2,1);transform:${flipped ? 'rotateY(180deg)' : 'none'}`">
            <i class="corner tl"></i><i class="corner tr"></i><i class="corner bl"></i><i class="corner br"></i>

            <!-- Inputs face -->
            <div :style="`padding:clamp(18px,3.5cqw,36px);grid-area:${narrow ? '1 / 1' : 'auto'};backface-visibility:hidden;-webkit-backface-visibility:hidden;transform:${narrow ? 'rotateY(180deg)' : 'none'};pointer-events:${narrow && !flipped ? 'none' : 'auto'};background:var(--color-bg)`">
              <div :style="`font-size:13px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;${muted(70)};margin-bottom:6px`">Your warehouse</div>
              <div v-for="s in steppers" :key="s.key" style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px solid var(--color-divider)">
                <span style="font-weight:500">{{ s.label }}</span>
                <div style="display:flex;align-items:center;flex-shrink:0">
                  <button class="stepper-btn" @click="step(s, -1)" aria-label="Decrease" :style="stepperBtn">−</button>
                  <span style="min-width:68px;text-align:center;font-family:var(--font-heading);font-weight:600;font-size:28px;line-height:1;font-variant-numeric:tabular-nums">{{ s.pre + nums[s.key] }}</span>
                  <button class="stepper-btn" @click="step(s, 1)" aria-label="Increase" :style="stepperBtn">+</button>
                </div>
              </div>
              <label style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px solid var(--color-divider)">
                <span style="font-weight:500">Units processed per day</span>
                <input class="units-input" type="number" inputmode="numeric" min="1" max="10000" v-model="unitsRaw" @blur="unitsRaw = String(calc.units)" style="width:140px;height:48px;flex-shrink:0;border:1px solid var(--color-divider);border-radius:0;background:var(--color-surface);font-family:var(--font-heading);font-weight:600;font-size:28px;text-align:center;color:var(--color-text);font-variant-numeric:tabular-nums;-moz-appearance:textfield">
              </label>
              <div style="padding-top:22px">
                <div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px">
                  <span style="font-weight:500">Productivity improvement</span>
                  <span style="font-family:var(--font-heading);font-weight:600;font-size:40px;line-height:1;color:var(--color-accent-700);font-variant-numeric:tabular-nums">{{ pct }}%</span>
                </div>
                <div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));margin-top:14px;border:1px solid var(--color-divider)">
                  <button v-for="([name, v], i) in presets" :key="name" @click="pct = v" :style="`min-height:54px;padding:6px 2px;border:0;border-left:${i ? '1px solid var(--color-divider)' : '0'};background:${pct === v ? 'var(--color-accent-700)' : 'transparent'};color:${pct === v ? 'var(--color-bg)' : 'var(--color-text)'};cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center`">
                    <span style="font-size:11px;font-weight:500">{{ name }}</span>
                    <span style="font-family:var(--font-heading);font-weight:600;font-size:20px;line-height:1.1">{{ v }}%</span>
                  </button>
                </div>
                <input type="range" min="0" max="100" step="1" v-model.number="pct" aria-label="Productivity improvement" style="width:100%;height:44px;margin:10px 0 0;accent-color:var(--color-accent-700);cursor:pointer">
                <div :style="`display:flex;justify-content:space-between;font-size:12px;font-weight:500;${muted(70)}`"><span>0%</span><span>100%</span></div>
                <button v-if="narrow" class="btn btn-primary" @click="flippedRaw = false" style="width:100%;min-height:56px;margin-top:18px;font-size:20px;text-transform:uppercase;letter-spacing:.04em;gap:10px">See the savings <span style="font-variant-numeric:tabular-nums">{{ calc.value }}</span> →</button>
              </div>
            </div>

            <!-- Results face -->
            <div @click="narrow && (flippedRaw = true)" :style="`background:var(--color-accent-900);color:var(--color-bg);padding:clamp(18px,3.5cqw,36px);display:flex;flex-direction:column;gap:26px;grid-area:${narrow ? '1 / 1' : 'auto'};backface-visibility:hidden;-webkit-backface-visibility:hidden;pointer-events:${flipped ? 'none' : 'auto'};cursor:${narrow ? 'pointer' : 'auto'}`">
              <button v-if="narrow" style="order:99;width:100%;min-height:52px;border:1px solid var(--color-accent-300);background:transparent;color:var(--color-accent-300);font-family:var(--font-heading);font-weight:600;font-size:20px;text-transform:uppercase;letter-spacing:.04em;cursor:pointer">Tap to edit your numbers ↻</button>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
                <span style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;font-weight:500;color:var(--color-accent-300)">Monthly payroll {{ calc.payroll }}</span>
                <span style="background:var(--color-accent-300);color:var(--color-accent-900);padding:4px 12px;font-family:var(--font-heading);font-weight:600;font-size:24px;line-height:1.2;text-transform:uppercase;font-variant-numeric:tabular-nums">{{ calc.multiple }} return</span>
              </div>
              <div style="display:grid;gap:22px">
                <div>
                  <div style="font-size:15px;color:var(--color-accent-200)">Monthly value of added capacity</div>
                  <div style="font-family:var(--font-heading);font-weight:600;font-size:clamp(72px,11cqw,120px);line-height:.95;color:var(--color-accent-300);font-variant-numeric:tabular-nums;margin:6px 0 12px">{{ calc.value }}</div>
                  <div style="height:12px;background:color-mix(in srgb,var(--color-bg) 12%,transparent)"><div :style="`height:100%;background:var(--color-accent-300);width:${calc.valueW};transition:width .2s`"></div></div>
                </div>
                <div>
                  <div style="font-size:15px;color:var(--color-accent-200)">Monthly fee</div>
                  <div style="font-family:var(--font-heading);font-weight:600;font-size:clamp(44px,6cqw,64px);line-height:.95;font-variant-numeric:tabular-nums;margin:6px 0 12px">$4,500</div>
                  <div style="height:12px;background:color-mix(in srgb,var(--color-bg) 12%,transparent)"><div :style="`height:100%;background:var(--color-bg);width:${calc.feeW};transition:width .2s`"></div></div>
                </div>
              </div>
              <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:16px;border-top:1px solid color-mix(in srgb,var(--color-bg) 22%,transparent);padding-top:20px;margin-top:auto">
                <div>
                  <div style="font-size:13px;color:var(--color-accent-200)">Units per day</div>
                  <div :style="stat"><span style="font-weight:400;color:var(--color-accent-300)">{{ calc.unitsBefore }} →</span> {{ calc.unitsAfter }}</div>
                </div>
                <div>
                  <div style="font-size:13px;color:var(--color-accent-200)">Hires avoided</div>
                  <div :style="stat">{{ calc.hires }}</div>
                </div>
                <div>
                  <div style="font-size:13px;color:var(--color-accent-200)">Labour cost per unit</div>
                  <div :style="stat"><span style="font-weight:400;color:var(--color-accent-300)">{{ calc.cpuBefore }} →</span> {{ calc.cpuAfter }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:20px 32px;align-items:center;justify-content:space-between;margin-top:24px">
          <p :style="`font-size:13px;margin:0;max-width:60ch;${muted(70)}`">Illustrative. Enter your own numbers. We measure GDI's real baseline first, then set the target together.</p>
          <div class="blueprint" style="padding:14px 18px;font-size:15px;max-width:420px">
            <i class="corner tl"></i><i class="corner tr"></i><i class="corner bl"></i><i class="corner br"></i>
            <strong>Later upside:</strong> retiring Sellercloud removes about $12,000 a year in licence fees.
          </div>
        </div>
      </section>

      <!-- 03 Roadmap -->
      <section data-sec="Roadmap" :style="sectionPad">
        <div :style="sectionEyebrow">03 · The roadmap</div>
        <h2 style="font-size:clamp(34px,6cqw,72px);line-height:1.06;letter-spacing:.01em;text-transform:uppercase;margin:0;text-wrap:balance">Measure <span style="color:var(--color-accent)">→</span> Optimize <span style="color:var(--color-accent)">→</span> Expand <span style="color:var(--color-accent)">→</span> Own</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:28px clamp(20px,2.5cqw,32px);margin-top:clamp(28px,4cqw,44px)">
          <div v-for="(p, i) in phases" :key="p.name" class="blueprint" :style="`padding:22px${i === 0 ? ';border-top:3px solid var(--color-accent)' : ''}`">
            <i class="corner tl"></i><i class="corner tr"></i><i class="corner bl"></i><i class="corner br"></i>
            <div :style="eyebrow">{{ p.when }}</div>
            <h3 style="font-size:30px;text-transform:uppercase;letter-spacing:.02em;margin:8px 0 14px">{{ p.name }}</h3>
            <ul :style="`${list};${muted(82)}`"><li v-for="item in p.items" :key="item">{{ item }}</li></ul>
          </div>
        </div>
        <p style="font-family:var(--font-heading);font-weight:600;font-size:clamp(22px,2.6cqw,28px);line-height:1.2;margin:32px 0 0">Priorities are set together. You choose the projects with the highest return.</p>
        <div class="blueprint" style="margin-top:32px;padding:22px;display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px 32px;align-items:start">
          <i class="corner tl"></i><i class="corner tr"></i><i class="corner bl"></i><i class="corner br"></i>
          <div>
            <div :style="`${cardTitle};font-size:22px`">New revenue lines</div>
            <div :style="`font-size:13px;margin-top:6px;${muted(70)}`">Each scoped as its own milestone</div>
          </div>
          <div style="font-size:15px">Parts harvesting and repair station, with procedures and staff training</div>
          <div style="font-size:15px">Laptop skin printing station</div>
          <div style="font-size:15px">Marketing to win more ITAD and buyback clients</div>
        </div>
      </section>

      <!-- 04 How we work -->
      <section data-sec="How we work" :style="sectionPad">
        <div :style="sectionEyebrow">04 · How we work</div>
        <h2 style="font-size:clamp(36px,6cqw,72px);line-height:1.04;letter-spacing:.01em;text-transform:uppercase;margin:0">Milestones, not hours</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:28px clamp(20px,2.5cqw,32px);margin-top:clamp(28px,4cqw,44px)">
          <div v-for="[icon, title, body] in ways" :key="title" class="blueprint" style="padding:22px">
            <i class="corner tl"></i><i class="corner tr"></i><i class="corner bl"></i><i class="corner br"></i>
            <span :style="`display:block;width:32px;height:32px;background:var(--color-accent-700);-webkit-mask:url(https://unpkg.com/lucide-static@0.460.0/icons/${icon}.svg) center/contain no-repeat;mask:url(https://unpkg.com/lucide-static@0.460.0/icons/${icon}.svg) center/contain no-repeat`"></span>
            <div :style="`${cardTitle};margin-top:18px`">{{ title }}</div>
            <div :style="`font-size:15px;margin-top:8px;${muted(78)}`">{{ body }}</div>
          </div>
        </div>
        <div :style="`display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px 40px;margin-top:40px;font-size:18px;${muted(78)}`">
          <div><strong style="color:var(--color-text)">Your data is yours.</strong> Always.</div>
          <div><strong style="color:var(--color-text)">Perpetual licence</strong> to the software built for GDI.</div>
          <div><strong style="color:var(--color-text)">If it becomes a product</strong> for other ITAD companies, we agree a fair equity split.</div>
        </div>
      </section>

      <!-- 05 Investment -->
      <section data-sec="Investment" style="max-width:1200px;margin:0 auto;padding:clamp(40px,6cqw,80px) clamp(20px,5cqw,56px) clamp(40px,6cqw,72px)">
        <div :style="sectionEyebrow">05 · The investment</div>
        <h2 :style="h2">Start small. Prove it. Then scale.</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:28px clamp(20px,2.5cqw,32px);margin-top:clamp(28px,4cqw,44px);align-items:stretch">
          <div v-for="t in tiers" :key="t.name" class="blueprint" style="padding:28px">
            <i class="corner tl"></i><i class="corner tr"></i><i class="corner bl"></i><i class="corner br"></i>
            <div :style="cardTitle">{{ t.name }}</div>
            <div :style="`font-size:14px;${muted(70)}`">{{ t.when }}</div>
            <div style="font-family:var(--font-heading);font-weight:600;font-size:80px;line-height:1;margin:20px 0">{{ t.price }}</div>
            <ul :style="`${list};padding:18px 0 0;border-top:1px solid var(--color-divider)`"><li v-for="item in t.items" :key="item">{{ item }}</li></ul>
          </div>
          <div class="blueprint" style="padding:28px;background:var(--color-accent-900);color:var(--color-bg);border-color:var(--color-accent-900)">
            <i class="corner tl"></i><i class="corner tr"></i><i class="corner bl"></i><i class="corner br"></i>
            <div :style="`${cardTitle};color:var(--color-accent-300)`">Partnership</div>
            <div style="font-size:14px;color:var(--color-accent-200)">From January</div>
            <div style="font-family:var(--font-heading);font-weight:600;font-size:80px;line-height:1;margin:20px 0;display:flex;align-items:baseline;gap:10px;flex-wrap:wrap">$4,500 <span style="font-family:var(--font-body);font-size:16px;font-weight:500;color:var(--color-accent-200)">per month</span></div>
            <ul :style="`${list};padding:18px 0 0;border-top:1px solid color-mix(in srgb,var(--color-bg) 22%,transparent)`">
              <li>Fractional CTO for GDI</li><li>Roadmap delivered milestone by milestone</li><li>Weekly call, on site as needed</li><li>Fee revisited together if the scope grows</li>
            </ul>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:18px;margin-top:clamp(40px,6cqw,64px)">
          <a class="btn btn-primary blueprint" :href="waHref" target="_blank" rel="noopener" style="min-height:64px;padding:0 40px;font-size:24px;text-transform:uppercase;letter-spacing:.04em;width:min(100%,380px)">
            <i class="corner tl"></i><i class="corner tr"></i><i class="corner bl"></i><i class="corner br"></i>
            Approve the baseline
          </a>
          <p :style="`margin:0;font-size:15px;max-width:44ch;${muted(70)}`">Next step: a short technical session to confirm Sellercloud and Aiken access.</p>
        </div>
      </section>

      <footer :style="`max-width:1200px;margin:0 auto;padding:24px clamp(20px,5cqw,56px) 40px;border-top:1px solid var(--color-divider);display:flex;flex-wrap:wrap;justify-content:center;gap:6px 14px;font-size:14px;${muted(70)}`">
        <span style="color:var(--color-text);font-weight:500">Andrew Dellimore</span><span>·</span>
        <a href="mailto:AndrewDellimore@gmail.com" style="color:var(--color-accent-700)">AndrewDellimore@gmail.com</a><span>·</span>
        <a href="tel:+19173769168" style="color:var(--color-accent-700)">917-376-9168</a>
      </footer>
    </div>
  </div>
</template>
