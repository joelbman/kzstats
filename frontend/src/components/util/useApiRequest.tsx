import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { globalAPI, localAPI } from './API'

const useApiRequest = (url: string, params: object | null, local?: boolean) => {
  const [data, setData] = useState<any>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<AxiosError | null>(null)
  const instance = local ? localAPI : globalAPI

  useEffect(() => {
    setIsLoaded(false)
    instance
      .get(url, { params: params })
      .then((response) => {
        setIsLoaded(true)
        setError(null)
        setData(response.data)
      })
      .catch((error) => {
        setError(error)
      })
  }, [url, params, instance])

  return { error, isLoaded, data }
}

export default useApiRequest
