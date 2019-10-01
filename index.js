import request from 'request-promise'
import { DateTime } from 'luxon'
import fs from 'fs-extra'
import { readOffset, writeFile, writeError, readDate } from './helpers/fs'
import { formatReqBody, reqHeaders } from './config'

async function getRegisters (offset, initialDate, finalDate) {
  try {
    let data = await request.post({
      url: `https://jurisprudencia-backend.tst.jus.br/rest/pesquisa-textual/${offset}/50`,
      headers: reqHeaders,
      body: formatReqBody(initialDate, finalDate),
      json: true
    })
    await fs.ensureDir(`./data/registers/${finalDate}`)
    await writeFile(`./data/registers/${finalDate}/${offset}.json`, data, `${offset}.json created!`)
    await writeFile(`./data/offsets/${finalDate}.json`, { offset: offset }, `JSON offset created: ${offset}\n`)

    return data
  } catch (err) {
    console.log(err.message, '\n')
    await writeError(offset, finalDate)
  }
}

let intervals = 5
const countToSleep = 5
const sleep = (timeout = 3000) => new Promise((resolve, reject) => setTimeout(resolve, timeout))

async function main () {
  console.log('Running crawler...\n')

  let interval = 10
  let date = await readDate()
  let currentDate = DateTime.fromISO(date)
  console.log('JSON date:', currentDate.toISODate(), '\n')

  let initialDate = currentDate.plus({ days: 1 })
  let finalDate = currentDate.plus({ days: 11 })

  while (interval <= intervals) {
    let total = 0
    let reqCount = 0
    let offset = 1

    console.log(`--- ${interval}) Current date:`, finalDate.toISODate(), '---')
    await writeFile(`./data/current-date.json`, { dataFinal: finalDate.toISODate() }, `current-date.json updated: ${finalDate.toISODate()}\n`)

    do {
      if (reqCount === countToSleep) {
        await sleep()
        console.log(`\nSleeping... (3 seconds) (${interval})\n`)
        reqCount = 0
      }
      console.log('Current offset:', offset)
      let data = await getRegisters(offset, initialDate.toISODate(), finalDate.toISODate())
      if (data) {
        total = data.totalRegistros
      }
      console.log('All registers:', total)
      reqCount++
      offset += 50
    } while (offset <= total)
    initialDate = finalDate.plus({ days: 1 })
    finalDate = finalDate.plus({ days: 11 })
    interval++
    console.log('\n\n')
  }
}

main()
  .then(() => {
    console.log('Done!')
    process.exit(0)
  })
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })