import React, { useEffect, useState, useCallback } from 'react'
import MapCard from './MapCard'
import ReactPaginate from 'react-paginate'
import { Map } from '../../SwaggerClient'
import API from '../util/API'
import { AxiosError } from 'axios'

const limit = 12

const MapListGrid = () => {
  const [error, setError] = useState<AxiosError | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])
  const [offset, setOffset] = useState(0)
  const [pageCount, setPageCount] = useState(0)

  const paginationButtonClass =
    'ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150'

  const fetchMaps = useCallback(() => {
    API.get('/maps', {
      params: {
        limit: limit,
        offset: offset,
        is_verified: true,
      },
    })
      .then((response) => {
        setIsLoaded(true)
        setPageCount(Math.ceil(300 / limit))
        setItems(response.data)
      })
      .catch((error: AxiosError) => {
        setError(error)
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
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <div>
        <div className="grid grid-cols-4 gap-4">
          {items.map((map: Map) => (
            <MapCard map={map} key={map.id} />
          ))}
        </div>
        <div className="text-center h-full mt-10">
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'relative z-0 inline-flex shadow-sm'}
            activeClassName={'active'}
            pageClassName={paginationButtonClass}
            breakClassName={paginationButtonClass}
            nextLinkClassName={paginationButtonClass}
            previousLinkClassName={paginationButtonClass}
          />
        </div>
      </div>
    )
  }
}

export default MapListGrid
