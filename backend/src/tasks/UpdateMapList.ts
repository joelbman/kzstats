import { KZMap } from "types";
import { db } from "../db/db";
import { globalAPI } from "../util/API";

//work in progress
const UpdateMapList = async (): Promise<void> => {
  const localMaps = await db('kzstats_map').orderBy('updated_on', 'desc')
  const globalMaps = await globalAPI.get('/maps?is_verified=true&limit=2000')

  if (localMaps.length === 0) {
    const promises = globalMaps.data.map((m: KZMap) => {
      return db('kzstats_map').insert({ id: m.id, updated_on: m.updated_on, difficulty: m.difficulty, validated: m.validated, workshop_url: m.workshop_url, name: m.name })
    })

    promises.then(() => console.log('Done'))
  }
  // else {
  //   localMaps[0]
  // } 

}

UpdateMapList()