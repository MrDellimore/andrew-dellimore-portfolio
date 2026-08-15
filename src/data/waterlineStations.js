// Real, live water-level sources for the three places tied to this site's
// story (see AFLOAT.footer). Two have public, CORS-enabled JSON APIs and are
// polled directly; Kuala Lumpur's flood-monitoring system (JPS Public
// InfoBanjir) doesn't expose a cross-origin API, so it's a direct link
// instead of a faked reading.
export const WATERLINE_STATIONS = [
  {
    id: 'brooklyn',
    place: 'Brooklyn',
    detail: 'The Battery, NY — NOAA station 8518750',
    kind: 'noaa',
    stationId: '8518750',
    sourceUrl: 'https://tidesandcurrents.noaa.gov/waterlevels.html?id=8518750',
  },
  {
    id: 'kualalumpur',
    place: 'Kuala Lumpur',
    detail: 'Sungai Klang, via JPS Public InfoBanjir',
    kind: 'link-only',
    sourceUrl: 'https://infobanjirjpskl.water.gov.my/',
  },
  {
    id: 'saintvincent',
    place: 'Saint Vincent',
    detail: 'Calliaqua Coast Guard Base — IOC station CALQ',
    kind: 'ioc',
    stationCode: 'calq',
    sourceUrl: 'https://www.ioc-sealevelmonitoring.org/bgraph.php?code=calq',
  },
]
