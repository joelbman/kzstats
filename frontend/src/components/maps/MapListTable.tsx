import React, { useEffect, useCallback, useState } from 'react'
import API from '../util/API'

const MapListTable = () => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])

  const fetchMaps = useCallback(() => {
    API.get('/maps', {
      params: {
        is_validated: true,
      },
    }).then((response) => {
      setIsLoaded(true)
      setItems(response.data)
    })
  }, [])

  useEffect(() => {
    fetchMaps()
  }, [fetchMaps])

  return <div></div>
}

export default MapListTable
