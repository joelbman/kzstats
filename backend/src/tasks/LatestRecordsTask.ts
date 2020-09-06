import { db } from '../db/db'
import { globalAPI } from '../util/API'

const LatestRecordsTask = async (): Promise<string> => {
  const mapRes = await globalAPI.get('/maps?is_verified=true')
  const map = mapRes.data[0]

  return 's'
}

export default LatestRecordsTask
