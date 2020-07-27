import { useState, useEffect } from 'react'
import API from './API'
import { AxiosError } from 'axios'

const useApiRequest = (url: string, params: object) => {
  const [data, setData] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<AxiosError | null>(null)

  useEffect(() => {
    API.get(url, { params: params })
      .then((response) => {
        setIsLoaded(true)
        setData(response.data)
      })
      .catch((error) => {
        setError(error)
      })
  }, [url, params])

  return { error, isLoaded, data }
}

export default useApiRequest
