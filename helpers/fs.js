import fs from 'fs-extra'

async function writeFile (path, content, message = 'JSON created!') {
  try {
    await fs.writeJson(path, content)
    console.log(message)
  } catch (err) {
    console.error(err)
  }
}

async function readOffset (date) {
  let offset = 0
  try {
    offset = (await fs.readJson(`./data/offsets/${date}/current-offset.json`)).offset
  } catch (err) {
    console.error(err)
  }

  return offset
}

async function readDate () {
  let date = ''
  try {
    let data = await fs.readJson('./data/current-date.json')
    date = data.dataFinal
  } catch (err) {
    console.error(err)
  }

  return date
}

async function writeError (offset, date) {
  try {
    let errors = (await fs.readJson('./data/errors.json')).errors
    errors.push({ date: date, error: offset })
    await fs.writeJson(`./data/errors.json`, { errors: errors })
    console.log(`${offset} added to ${date} errors.json!\n`)
  } catch (err) {
    console.error(err)
  }
}

export {
  writeFile,
  readOffset,
  readDate,
  writeError
}
