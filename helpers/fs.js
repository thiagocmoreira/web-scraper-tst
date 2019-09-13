import fs from 'fs-extra'

async function writeFile (path, content, message = 'JSON created!') {
  try {
    await fs.writeJson(path, content)
    console.log(message)
  } catch (err) {
    console.error(err)
  }
}

async function readOffset () {
  let offset = 0
  try {
    offset = (await fs.readJson('./data/current-offset.json')).offset
  } catch (err) {
    console.error(err)
  }

  return offset
}

async function writeError (offset) {
  try {
    let errors = (await fs.readJson('./data/errors.json')).errors
    errors.push(offset)
    await fs.writeJson('./data/errors.json', { errors: errors })
    console.log(offset, 'added to errors.json!')
  } catch (err) {
    console.error(err)
  }
}

export {
  writeFile,
  readOffset,
  writeError
}
