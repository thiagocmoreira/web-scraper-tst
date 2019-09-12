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

export {
  writeFile,
  readOffset
}
