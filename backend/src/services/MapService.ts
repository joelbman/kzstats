import fs from 'fs'
import path from 'path'
import { db } from 'db/db'
import imageThumbnail from 'image-thumbnail'
import { PassportSteamProfile } from 'types'

interface UploadedImage {
  filename: string
  user_steamid: string
  updated_on: string
  user_name: string
}

const MapService = {
  getUploadLog: async (): Promise<UploadedImage[]> => {
    const images = db('kzstats_map_images').orderBy('updated_on').limit(10)
    return images
  },

  uploadImages: async (files, user: PassportSteamProfile): Promise<void> => {
    for (let i = 0; i < files.length; i++) {
      if (!files[i].path) continue

      const options = { responseType: 'buffer', percentage: 25 }
      const buffer = await imageThumbnail(files[i].path, options as any)

      fs.writeFileSync(path.dirname(files[i].path).concat('/thumb/tn_' + files[i].filename), buffer)

      await db('kzstats_map_images').insert({
        filename: files[i].filename,
        user_name: user.displayName,
        user_steamid: user.id,
        updated_on: new Date().toISOString(),
      })
    }
  },
}

export default MapService
