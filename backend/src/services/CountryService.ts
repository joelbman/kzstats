import { promises as fsp } from 'fs'
import path from 'path'

const CountryService = {
  getCountries: (): Promise<string> => {
    return fsp.readFile(
      path.join(__dirname, '../util/countrycodes.json'),
      'utf-8'
    )
  },
}

export default CountryService
