// totally trivial script to push data and generate charts
const got = require('got')
const fs = require('fs')
const request = require('request')

const text1 = 'Start date for each country has been chosen so that each country starts with a similar group of base cases. This makes evolution of the graph comparable. For chosen dates have a look at the dataset, IT/2020-02-22, DE/2020-03-01, ES/2020-02-29, IE/2020-03-04, KR/2020-02-19, UK/2020-03-01, SE/2020-02-27, ST/2020-02-27, AT/2020-02-29, CH/2020-02-27, US/2020-03-07.'
const text2 = 'Please also note that comparing total recorded case numbers might be misleading, since they do not account for unreported/undetected cases (dark numbers). This factor is likely different in each country, due to the different testing policies. Comparing slope changes - and not total figures - is the main point in this chart.'
const text3 = 'This charts the new confirmed cases (nx_avg) of covid-19 vs. the total confirmed cases (tx) to date, normalized to an identical population of 60.3 millions, both on logarithmic scales. When plotted in this way, exponential growth is represented as a straight line that slopes upwards. Notice that almost all countries follow a very similar path of exponential growth. For this approach of visualization, check out details and interactive chart at aatishb.com/covidtrends.'
const text4 = 'Die grün strichlierte Linie stellt das Verhältnis zwischen den täglichen neuen Fällen (newPositiveTested) und den neu getesteten Personen (newNumberTestedPeople) in Prozent dar, es wird ein gleitender Durchschnitt über vier Tage angewendet. Unter der Annahme unveränderter Testvorgaben (=wer wird getestet) dient diese Darstellung zur Einschätzung wieviel Prozent der neu Getesteten positiv sind. Anders formuliert, man beobachtet dabei relative und nicht absolute Zahlen. Die absoluten Werte unterliegen naturgemäß deutlichen Schwankungen und beinhalten auch die Tests, die an den wieder Gesundeten ausgeführt werden. Die blau strichlierte Linie (newPos/newNumberTests) stellt dasselbe Verhältnis, aber zur Zahl der durchgeführten Tests dar.'
const text5 = 'Please also note that simple unreflected comparison of case numbers might be misleading, since they do not account for unreported/undetected cases (dark numbers). This factor is likely different in each country, due to the different testing policies. Checking of the "incidence below 50 cases per week" rule of the German government on a country-wide-scale is one of the scopes of this chart.'

const DW_TOKEN = process.env.DW_TOKEN

async function updateurl(url, sourceurl, tmpfilename) {
  download(sourceurl, tmpfilename)
  update(url, tmpfilename)    
  //fs.unlinkSync(tmpfilename)
}

async function update(url, filename) {
  const data = fs.readFileSync(filename, 'ascii')
  const dataResponse = await request(
    url, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${DW_TOKEN}`
      },
      body: data
    }
  )
  console.log(`data [${url}]`)
}

async function timestamp(url, text) {
  const timeStamp = new Date().toLocaleString('de-DE', {
        timeZone: 'Europe/Berlin',
        hour12: false,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }).replace(/(\d+).(\d+).(\d+),\s(\d+):(\d+):(\d+)/, "$3-$1-$2, $4:$5:$6");
  
  const dataResponse = await request(
    url, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${DW_TOKEN}`
      },
      json: true,
      body: {
        metadata: {
          annotate: {
            notes: `Last update: ${timeStamp}. ${text}`
          }
        }
      }
    }
  )
  console.log(`notes [${url}]`)
}

async function publish(url) {
  const publishResponse = await request(
    url, {
      json: true,
      method: 'POST',
      headers: {
        authorization: `Bearer ${DW_TOKEN}`
      }
    }
  )
  console.log(`publish [${url}]`)
}

async function download(url, filename) {
  await request.get(url, {
    'headers': {
      authorization: `Bearer ${DW_TOKEN}`
    }
  }).pipe(fs.createWriteStream(filename));
  console.log(`download [${url}]`)
}

function main() {
  console.log(`token [${DW_TOKEN}]`)

  update('https://api.datawrapper.de/v3/charts/njNtn/data', '../dataset-01/covid19-normalized-noheader.CSV')
  update('https://api.datawrapper.de/v3/charts/Zojai/data', '../dataset-01/covid19-normalized-noheader.CSV')
  //updateurl('https://api.datawrapper.de/v3/charts/HWIBU/data', 'https://github.com/abaumg/covid19-bz-scraper/raw/master/data/covid19_bz_detailed.csv', '../dataset-01/covid19_bz_detailed.csv')
  update('https://api.datawrapper.de/v3/charts/HWIBU/data','../dataset-01/covid19_bz_detailed.csv')
  update('https://api.datawrapper.de/v3/charts/4sti7/data', '../dataset-01/covid19-normalized-timeseries.CSV')
  update('https://api.datawrapper.de/v3/charts/1Cdh3/data', '../dataset-01/covid19-normalized-noheader.CSV')
  
  timestamp('https://api.datawrapper.de/v3/charts/njNtn', `${text1} ${text2}`)
  timestamp('https://api.datawrapper.de/v3/charts/Zojai', `${text1}`)
  timestamp('https://api.datawrapper.de/v3/charts/HWIBU', `${text4}`)
  timestamp('https://api.datawrapper.de/v3/charts/4sti7', `${text3}`)
  timestamp('https://api.datawrapper.de/v3/charts/1Cdh3', `${text1} ${text5}`)
  
  publish('https://api.datawrapper.de/charts/njNtn/publish')
  publish('https://api.datawrapper.de/charts/Zojai/publish')
  publish('https://api.datawrapper.de/charts/HWIBU/publish')
  publish('https://api.datawrapper.de/charts/4sti7/publish')
  publish('https://api.datawrapper.de/charts/1Cdh3/publish')
  
  download('https://api.datawrapper.de/v3/charts/njNtn/export/png?unit=px&mode=rgb&plain=false&scale=2&borderWidth=40', '../image/njNtn-covid-19-normalized.png')
  download('https://api.datawrapper.de/v3/charts/Zojai/export/png?unit=px&mode=rgb&plain=false&scale=2&borderWidth=40', '../image/Zojai-covid-19-doubling-time.png')
  download('https://api.datawrapper.de/v3/charts/HWIBU/export/png?unit=px&mode=rgb&plain=false&scale=2&borderWidth=40', '../image/HWIBU-covid-19-s-dtirol.png')
  download('https://api.datawrapper.de/v3/charts/4sti7/export/png?unit=px&mode=rgb&plain=false&scale=2&borderWidth=40', '../image/4sti7-covid-19-normalized-averaged-timeseries.png')
  download('https://api.datawrapper.de/v3/charts/1Cdh3/export/png?unit=px&mode=rgb&plain=false&scale=2&borderWidth=40', '../image/1Cdh3-covid-19-incidence-per-week.png')
}

main()
