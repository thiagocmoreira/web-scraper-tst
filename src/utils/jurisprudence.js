import request from 'request-promise'
import fs from 'fs-extra'
import { formatReqBody, reqHeaders } from './request-configs'
import { writeFile, writeError } from './fs'

export async function getJuris (offset, initialDate, finalDate) {
  try {
    const data = await request.post({
      url: `https://jurisprudencia-backend.tst.jus.br/rest/pesquisa-textual/${offset}/50`,
      headers: reqHeaders,
      body: formatReqBody(initialDate, finalDate),
      json: true
    })
    await saveJurisAndOffset(data, offset, finalDate)

    return data
  } catch (err) {
    console.log(err.message, '\n')
    await writeError(offset, finalDate)
  }
}

async function saveJurisAndOffset (data, offset, finalDate) {
  await fs.ensureDir(`./data/registers/${finalDate}`)
  await writeFile(`./data/registers/${finalDate}/${offset}.json`, data, `${offset}.json created!`)
  await writeFile(`./data/offsets/${finalDate}.json`, { offset: offset }, `JSON offset created: ${offset}\n`)
}