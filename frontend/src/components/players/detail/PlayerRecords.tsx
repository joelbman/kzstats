import Table from 'components/general/Table'
import Record from 'models/Record'
import React, { useState } from 'react'

interface Props {
  data: Record[]
}

let timer = 0

const PlayerRecords = (props: Props) => {
  const data = props.data
  const [nameFilter, setNameFilter] = useState('')
  const [pointsFilter, setPointsFilter] = useState('')

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer)
    const val = e.target.value
    timer = window.setTimeout(() => {
      setNameFilter(val)
    }, 600)
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPointsFilter(e.target.value)
  }

  return (
    <div>
      <h2>
        Records
        <small className="ml-2">({data.length} total)</small>
      </h2>

      {data.length > 0 ? (
        <>
          <div className="mt-2 mb-4 w-full">
            <div className="inline-block mr-4">
              Mapname
              <input
                type="text"
                onChange={handleInput}
                maxLength={20}
                className="w-40"
              />
            </div>
            <div className="inline-block">
              Points{' '}
              <select onChange={handleSelect}>
                <option value="">All</option>
                <option value="gold">WR (1000)</option>
                <option value="silver">Silver (900-999)</option>
                <option value="bronze">Bronze (750-899)</option>
                <option value="rest">Rest (0-749)</option>
              </select>
            </div>
          </div>

          <Table
            data={data}
            columns={[
              { key: 'map_name', type: 'map', header: 'Map' },
              { key: 'time', type: 'runtime' },
              { key: 'points', type: 'points' },
              { key: 'teleports', header: 'TPs' },
              { key: 'updated_on', type: 'datetime', header: 'Date' },
              { key: 'server_name', type: 'server', header: 'Server' },
            ]}
            sort={{ key: 'updated_on', desc: true }}
            itemsPerPage={40}
            className="w-full"
            filters={[
              { key: 'map_name', value: nameFilter },
              { key: 'points', value: pointsFilter },
            ]}
          />
        </>
      ) : (
        <p>No records found.</p>
      )}
    </div>
  )
}

export default PlayerRecords
