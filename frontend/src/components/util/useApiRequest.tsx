import { AxiosError } from 'axios'
import ErrorHandler from 'components/general/ErrorHandler'
import Loader from 'components/general/Loader'
import { ReactElement, useEffect, useState } from 'react'
import React from 'react'
import { globalAPI, localAPI } from './API'

const useApiRequest = (url: string, params: object | null, local?: boolean) => {
  const [data, setData] = useState<any>([])
  const [loader, setLoader] = useState<ReactElement<any> | null>(<Loader />)
  const [error, setError] = useState<ReactElement<any> | null>(null)
  const instance = local ? localAPI : globalAPI

  useEffect(() => {
    setLoader(<Loader />)
    instance
      .get(url, { params: params })
      .then((response) => {
        setLoader(null)
        setError(null)
        setData(response.data)
      })
      .catch((error: AxiosError) => {
        setError(<ErrorHandler message={error.message} />)
      })
  }, [url, params, instance])

  return { error, loader, data }
}

export default useApiRequest
