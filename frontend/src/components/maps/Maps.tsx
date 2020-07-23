import React, { useEffect, useState, useCallback } from 'react'
import { Map } from '../../SwaggerClient'
import API from '../util/API'
import MapCard from './MapCard'
import ReactPaginate from 'react-paginate'

const limit = 12

const Maps = () => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])
  const [offset, setOffset] = useState(0)
  const [pageCount, setPageCount] = useState(0)

  const fetchMaps = useCallback(() => {
    API.get('/maps', {
      params: {
        limit: limit,
        offset: offset,
      },
    }).then((response) => {
      console.log(response)
      setIsLoaded(true)
      setPageCount(Math.ceil(550 / limit))
      setItems(response.data)
    })
  }, [offset])

  const handlePageClick = (data: any) => {
    let selected = data.selected
    setOffset(Math.ceil(selected * limit))

    fetchMaps()
  }

  useEffect(() => {
    fetchMaps()
  }, [fetchMaps])

  if (error !== null) {
    return <div>Error: {error}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <div>
        <h1>Maps</h1>
        <div className="grid grid-cols-3 gap-4">
          {items.map((map: Map) => (
            <MapCard map={map} key={map.id} />
          ))}
        </div>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
    )
  }
}

export default Maps
