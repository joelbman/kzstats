import { AxiosError } from 'axios'
import { useEffect, useRef, useState } from 'react'
import { globalAPI, localAPI } from './API'

const useApiRequest = (url: string, params: object, local?: boolean) => {
  const [data, setData] = useState<any>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<AxiosError | null>(null)
  const ref = useRef(params)

  const instance = local ? localAPI : globalAPI

  useEffect(() => {
    setIsLoaded(false)
    instance
      .get(url, { params: ref.current })
      .then((response) => {
        setIsLoaded(true)
        setError(null)
        setData(response.data)
      })
      .catch((error) => {
        setError(error)
      })
  }, [url, ref, instance])

  return { error, isLoaded, data }
}

export default useApiRequest
