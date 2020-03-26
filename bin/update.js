// totally trivial script to push data and generate charts
const got = require('got')
const fs = require('fs')
const request = require('request')

const text1 = 'Start date for each country has been chosen so that each country starts with a similar group of base cases. This makes evolution of the graph comparable. For chosen dates have a look at the dataset, IT/2020-02-22, DE/2020-03-01, ES/2020-02-29, IE/2020-03-04, KR/2020-02-19, UK/2020-03-01, SE/2020-02-27, ST/2020-02-27, AT/2020-02-29, CH/2020-02-27, US/2020-03-07.'
const text2 = 'Please also note that comparing total recorded case numbers might be misleading, since they do not account for unreported/undetected cases (dark numbers). This factor is likely different in each country, due to the different testing policies. Comparing slope changes - and not total figures - is the main point in this chart.'

const DW_TOKEN = process.env.DW_TOKEN

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
  
  timestamp('https://api.datawrapper.de/v3/charts/njNtn', `${text1} ${text2}`)
  timestamp('https://api.datawrapper.de/v3/charts/Zojai', `${text1}`)
  
  publish('https://api.datawrapper.de/charts/njNtn/publish')
  publish('https://api.datawrapper.de/charts/Zojai/publish')
  
  download('https://api.datawrapper.de/v3/charts/njNtn/export/png?unit=px&mode=rgb&plain=false&scale=2&borderWidth=40', '../image/njNtn-covid-19-normalized.png')
  download('https://api.datawrapper.de/v3/charts/Zojai/export/png?unit=px&mode=rgb&plain=false&scale=2&borderWidth=40', '../image/Zojai-covid-19-doubling-time.png')
}

main()