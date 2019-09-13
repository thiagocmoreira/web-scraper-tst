import request from 'request-promise'
import fs from 'fs-extra'
import { readOffset, writeFile, writeError } from './helpers/fs'
import { reqBody, reqHeaders } from './config'

let total = 2799

async function getRegisters (offset, folder) {
  try {
    let data = await request.post({
      url: `https://jurisprudencia-backend.tst.jus.br/rest/pesquisa-textual/${offset}/50`,
      headers: reqHeaders,
      body: reqBody,
      json: true
    })
    await fs.ensureDir(`./data/registers/${folder}`)
    await writeFile(`./data/registers/${folder}/${offset}.json`, data, `${offset}.json created!`)
    await writeFile(`./data/current-offset.json`, { offset: offset }, `JSON offset updated: ${offset}\n`)
  } catch (err) {
    console.log(err.message, '\n')
    await writeError(offset)
  }
}

const countToSleep = 5
const sleep = (timeout = 3000) => new Promise((resolve, reject) => setTimeout(resolve, timeout))

async function main () {
  console.log('Running crawler...\n')
  let offset = await readOffset() || 1
  let reqCount = 0
  while (offset <= total) {
    if (reqCount === countToSleep) {
      await sleep()
      console.log('Sleeping... (3 seconds)\n')
      reqCount = 0
    }
    console.log('Current offset:', offset)
    await getRegisters(offset, '2010-10-31')
    reqCount++
    offset += 50
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