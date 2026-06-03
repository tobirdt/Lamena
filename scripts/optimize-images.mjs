import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const assetsDir = path.join(process.cwd(), 'public', 'assets')
const files = await readdir(assetsDir)
const raster = files.filter((file) => /\.(png|jpe?g)$/i.test(file))

for (const file of raster) {
  const input = path.join(assetsDir, file)
  const output = path.join(assetsDir, file.replace(/\.(png|jpe?g)$/i, '.webp'))

  await sharp(input)
    .webp({ quality: 82, effort: 6 })
    .toFile(output)

  const { size: before } = await stat(input)
  const { size: after } = await stat(output)
  console.log(`${file} -> ${path.basename(output)} (${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB)`)
}
