import React, { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import useApiRequest from '../../../hooks/useApiRequest'
import KZMap from '../../../models/KZMap'
import MapListGrid from './MapListGrid'
import MapListTable from './MapListTable'

let timer = 0

const MapListView = () => {
  const [apiOptions] = useState({
    is_verified: true,
    limit: 1000,
  })
  const { error, loader, data } = useApiRequest('/maps', apiOptions)
  const [nameFilter, setNameFilter] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState('0')
  const [isFancy, setIsFancy] = useState(true)
  const [filtered, setFiltered] = useState<KZMap[]>([])

  // Update filter 0.6secs after user has stopped typing
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
      temp = temp.filter((m: KZMap) => {
        return m.name.includes(nameFilter || '')
      })
    }
    if (difficultyFilter !== '0') {
      temp = temp.filter((m: KZMap) => {
        return (
          difficultyFilter === '0' ||
          m.difficulty === parseInt(difficultyFilter)
        )
      })
    }
    setFiltered(temp)
  }, [nameFilter, difficultyFilter, data])

  useEffect(() => {
    setFiltered(data)
  }, [data])

  if (error) return error
  if (loader) return loader

  return (
    <>
      <Helmet title="Maps" />
      <h1>
        Maps <small> - Total: {data.length}</small>
      </h1>
      <div className="flex flex-wrap items-center mb-8">
        <div className="mr-4 mb-4 md:mb-0 lg:mb-0">
          Mapname:
          <input type="text" onChange={handleInput} className="ml-2" />
        </div>
        <div className="mr-4">
          Difficulty:
          <select
            onChange={handleSelect}
            value={difficultyFilter}
            className="ml-2"
          >
            <option value="0">Any</option>
            <option value="1">Very easy</option>
            <option value="2">Easy</option>
            <option value="3">Medium</option>
            <option value="4">Hard</option>
            <option value="5">Very hard</option>
            <option value="6">Extreme</option>
            <option value="7">Death</option>
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
