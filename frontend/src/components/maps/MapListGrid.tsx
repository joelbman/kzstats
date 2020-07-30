import React, { useState } from 'react'
import MapCard from './MapCard'
import ReactPaginate from 'react-paginate'
import Map from '../../models/Map'
import useApiRequest from '../util/useApiRequest'

const MapListGrid = () => {
  const limit = 12
  const [offset, setOffset] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [apiOptions, setApiOptions] = useState({
    limit: limit,
    offset: offset,
    is_verified: true,
  })
  const { error, isLoaded, data } = useApiRequest('/maps', apiOptions)

  const paginationButtonClass =
    'ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150'

  const fetchMaps = () => {
    setApiOptions({
      limit: limit,
      offset: offset,
      is_verified: true,
    })
    setPageCount(Math.ceil(300 / limit))
  }

  const handlePageClick = (data: any) => {
    let selected = data.selected
    setOffset(Math.ceil(selected * limit))
    fetchMaps()
  }

  if (error !== null) return <div>Error: {error.message}</div>
  if (!isLoaded) return <div className="loader"></div>
  if (pageCount === 0 && data.length > 0) setPageCount(300 / limit)

  return (
    <div>
      <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        {data.map((map: Map) => (
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

export default MapListGrid
