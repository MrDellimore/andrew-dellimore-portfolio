import { onMounted, reactive } from 'vue'
import { WATERLINE_STATIONS } from '@/data/waterlineStations'

function minutesAgo(iso) {
  const t = new Date(iso.replace(' ', 'T') + 'Z').getTime()
  const mins = Math.round((Date.now() - t) / 60000)
  if (!Number.isFinite(mins)) return ''
  if (mins < 1) return 'just now'
  if (mins === 1) return '1 min ago'
  if (mins < 60) return `${mins} min ago`
  const hrs = Math.round(mins / 60)
  return hrs === 1 ? '1 hr ago' : `${hrs} hr ago`
}

async function fetchNoaa(station) {
  const url =
    'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter' +
    `?station=${station.stationId}&product=water_level&datum=MLLW` +
    '&units=english&time_zone=lst_ldt&format=json&date=latest&application=andrewdellimore.com'
  const res = await fetch(url)
  if (!res.ok) throw new Error(`noaa ${res.status}`)
  const body = await res.json()
  const point = body?.data?.[0]
  if (!point) throw new Error('noaa: no reading')
  return {
    reading: `${parseFloat(point.v).toFixed(1)} ft`,
    updated: minutesAgo(point.t),
  }
}

async function fetchIoc(station) {
  const url = `https://www.ioc-sealevelmonitoring.org/service.php?query=latest&code=${station.stationCode}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`ioc ${res.status}`)
  const rows = await res.json()
  // The feed multiplexes several sensors per station (battery voltage,
  // pressure, radar); anything but "bat" is an actual water-level sensor.
  const readings = (rows || []).filter((r) => r.sensor !== 'bat' && Number.isFinite(r.slevel))
  if (!readings.length) throw new Error('ioc: no water-level sensor in response')
  const latest = readings.reduce((a, b) => (a.stime > b.stime ? a : b))
  return {
    reading: `${latest.slevel.toFixed(2)} m`,
    updated: minutesAgo(latest.stime),
  }
}

/**
 * Polls the real, live water-level APIs behind the three places this site
 * is anchored to. Same honest-failure rule as useTide: if a source doesn't
 * answer, say so and link out — never show an invented number.
 */
export function useWaterlineReadings() {
  const readings = reactive(
    WATERLINE_STATIONS.map((station) => ({
      ...station,
      status: station.kind === 'link-only' ? 'link-only' : 'loading',
      reading: '',
      updated: '',
    })),
  )

  async function load(entry) {
    try {
      const fetcher = entry.kind === 'noaa' ? fetchNoaa : fetchIoc
      const { reading, updated } = await fetcher(entry)
      entry.reading = reading
      entry.updated = updated
      entry.status = 'ok'
    } catch {
      entry.status = 'unavailable'
    }
  }

  onMounted(() => {
    readings.filter((r) => r.status === 'loading').forEach(load)
  })

  return readings
}
