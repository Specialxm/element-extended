import fs from 'fs'
import path from 'path'
import { resolve } from 'path'

const docsDirName = 'docs'
const projRoot = resolve(__dirname, '..', '..', '..')
const docRoot = resolve(projRoot, docsDirName)

export const languages = fs.readdirSync(path.resolve(__dirname, '../crowdin'))

export const ensureLang = (lang: string) => `/${lang}`

export const getLang = (id: string) =>
  path.relative(docRoot, id).split(path.sep)[0]
