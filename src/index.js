import { DateTime } from 'luxon'
import { getJuris } from './utils/jurisprudence'
import {  writeFile, readDate } from './utils/fs'

let intervals = 1
const countToSleep = 5
const sleep = (timeout = 3000) => new Promise((resolve, reject) => setTimeout(resolve, timeout))

async function main () {
  console.log('Running TST Scraper...\n')

  let interval = 0
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
      let data = await getJuris(offset, initialDate.toISODate(), finalDate.toISODate())
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
