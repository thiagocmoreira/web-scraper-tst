import request from 'request'
import { readOffset, writeFile } from './helpers/fs'
import { reqBody, reqHeaders } from './config'

const TOTAL = 1665916

async function getRegisters (offset) {
  await request.post({
    url: `https://jurisprudencia-backend.tst.jus.br/rest/pesquisa-textual/${offset}/20`,
    headers: reqHeaders,
    body: reqBody,
    json: true
  }, async function (error, response, body) {
    await writeFile(`./data/registers/${offset}.json`, body, `${offset}.json created!`)
    await writeFile(`./data/current-offset.json`, { offset: offset }, `JSON offset updated: ${offset}\n`)
  })
}

async function main () {
  let offset = await readOffset() || 1
  console.log('Current offset:', offset, '\n')
  await getRegisters(offset)
}

main()