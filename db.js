const path = require('path')
const fs = require('fs')
const { promisify } = require('util')

const dbPath = path.resolve(__dirname, './db.json')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

exports.getDb = async () => {
  const db = await readFile(dbPath, 'utf-8')
  return JSON.parse(db)
}

exports.saveDb = async (db) => {
  const data = JSON.stringify(db)
  await writeFile(dbPath, data)
}