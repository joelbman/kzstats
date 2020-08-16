import React, { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import Map from '../../../models/Map'
import useApiRequest from '../../util/useApiRequest'
import MapListGrid from './MapListGrid'
import MapListTable from './MapListTable'

const MapListView = () => {
  const [apiOptions] = useState({
    is_verified: true,
  })
  const { error, isLoaded, data } = useApiRequest('/maps', apiOptions)
  const [nameFilter, setNameFilter] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState('0')
  const [isFancy, setIsFancy] = useState(true)
  const [filtered, setFiltered] = useState<Map[]>([])

  // Update filter 0.6secs after user has stopped typing
  let timer = 0
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer)
    const val = e.target.value
    timer = window.setTimeout(() => {
      setNameFilter(val)
    }, 600)
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficultyFilter(e.target.value)
  }

  useMemo(() => {
    let temp = data
    if (nameFilter.length > 0) {
      temp = temp.filter((m: Map) => {
        return m.name.includes(nameFilter || '')
      })
    }
    if (difficultyFilter !== '0') {
      temp = temp.filter((m: Map) => {
        return (
          difficultyFilter === '0' ||
          m.difficulty === parseInt(difficultyFilter)
        )
      })
    }
    setFiltered(temp)
  }, [nameFilter, difficultyFilter])

  useEffect(() => {
    setFiltered(data)
  }, [data])

  if (error) return <div>Error: {error.message}</div>
  if (!isLoaded) return <div className="loader"></div>

  return (
    <>
      <Helmet title="Maps" />
      <h1>
        Maps <small> - Total: {data.length}</small>
      </h1>
      <div className="flex flex-wrap items-center mb-8">
        <div className="mr-4 mb-4 md:mb-0 lg:mb-0">
          Mapname:{' '}
          <input
            type="text"
            onChange={handleInput}
            className="ml-2 bg-gray-800"
          />
        </div>
        <div className="mr-4">
          Difficulty:
          <select
            className="bg-gray-800 border-2 border-black p-0 pl-2 pr-2 ml-2"
            onChange={handleSelect}
            value={difficultyFilter}
          >
            <option value="0">Any</option>
            <option value="1">Very easy</option>
            <option value="2">Easy</option>
            <option value="3">Medium</option>
            <option value="4">Hard</option>
            <option value="5">Very hard</option>
            <option value="6">Death</option>
          </select>
        </div>
        <div>
          Fancy:
          <input
            type="checkbox"
            className="ml-2"
            checked={isFancy}
            onChange={() => {
              setIsFancy(!isFancy)
            }}
          />
        </div>
      </div>
      {isFancy ? (
        <MapListGrid maps={filtered || data} />
      ) : (
        <MapListTable maps={filtered || data} />
      )}
    </>
  )
}

export default MapListView
