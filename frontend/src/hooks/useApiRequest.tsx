import axios, { AxiosError } from 'axios'
import ErrorHandler from 'components/general/ErrorHandler'
import Loader from 'components/general/Loader'
import { ReactElement, useEffect, useState } from 'react'
import React from 'react'

// This hook is really messy, should be refactored at some point
// (Possibly split in to two hooks and/or use a library?)
const prodCfg = {
  baseURL: 'https://kztimerglobal.com/api/v2/',
  responseType: 'json' as 'json',
}
const localCfg = {
  baseURL: '/api/',
  responseType: 'json' as 'json',
}
// const devCfg = {
//   baseURL: 'https://staging.kztimerglobal.com/api/v2/',
//   headers: { 'X-ApiKey': process.env.REACT_APP_API_KEY },
//   responseType: 'json' as 'json',
// }

// const globalApiCfg = process.env.NODE_ENV === 'production' ? prodCfg : devCfg

const globalAPI = axios.create(prodCfg)
const localAPI = axios.create(localCfg)

const useApiRequest = (url: string, params: object | null, local?: boolean, details?: boolean, type?: string) => {
  const [data, setData] = useState<any>([])
  const [loader, setLoader] = useState<ReactElement<any> | null>(<Loader />)
  const [error, setError] = useState<ReactElement<any> | null>(null)
  const instance = local ? localAPI : globalAPI

  useEffect(() => {
    setLoader(<Loader />)

    let query
    if (type === 'put') {
      query = instance.put(url, { params: params })
    } else query = instance.get(url, { params: params })

    query
      .then((response) => {
        if (details) {
          const steamids = response.data.map((player: any) => {
            return player.steamid64
          })
          localAPI
            .post('/player/details/', steamids)
            .then((localRes) => {
              if (localRes.data.length < 1) {
                setData(response.data)
                return
              }
              const arr = response.data.map((p: any) => {
                const player = localRes.data[p.steamid64]
                if (player) {
                  p.countrycode = player.countrycode
                  p.country = player.country
                  if (player.alias) p.player_name = player.alias
                }
                return p
              })
              setData(arr)
              setLoader(null)
              setError(null)
            })
            .catch(() => {
              // Fallback to giving the original data if KZStats backend is down
              setData(response.data)
              setLoader(null)
              setError(null)
            })
        } else {
          setData(response.data)
          setLoader(null)
          setError(null)
        }
      })
      .catch((error: AxiosError) => {
        setError(<ErrorHandler message={error.message} local={local} />)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, params, instance, details])

  return { error, loader, data }
}

export default useApiRequest
