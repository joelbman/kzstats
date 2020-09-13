import RuntypeSelect from 'components/forms/RuntypeSelect'
import Table from 'components/general/Table'
import React, { useRef, useState } from 'react'
import { KZRecord } from 'types'

/* eslint-disable jsx-a11y/accessible-emoji */

interface Props {
  data: KZRecord[]
}

const PlayerRecords = (props: Props) => {
  const data = props.data
  const [nameFilter, setNameFilter] = useState('')
  const [pointsFilter, setPointsFilter] = useState('')
  const [runtypeFilter, setRuntypeFilter] = useState(
    localStorage.getItem('kzRuntype') || 'pro'
  )
  const timer = useRef(0)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer.current)
    const val = e.target.value
    timer.current = window.setTimeout(() => {
      setNameFilter(val)
    }, 600)
  }

  return (
    <div>
      <h2>
        Records
        <small className="ml-2">({data.length} total)</small>
      </h2>

      {data.length > 0 ? (
        <>
          <div className="mt-2 w-full flex flex-wrap">
            <div className="inline-block mr-4 mb-4 order-1">
              Mapname
              <input
                type="text"
                onChange={handleInput}
                maxLength={20}
                className="w-40"
              />
            </div>
            <div className="inline-block mr-4 mb-4 order-4 sm:order-2">
              Runtype{' '}
              <RuntypeSelect callback={(val) => setRuntypeFilter(val)} />
            </div>
            <div className="inline-block mb-4 mr-4 order-3">
              Points{' '}
              <select
                onChange={(e) => {
                  setPointsFilter(e.target.value)
                }}
              >
                <option value="">
                  {'<'}All{'>'}
                </option>
                <option value="gold">🏆 WR (1000)</option>
                <option value="silver">🥈 Silver (900-999)</option>
                <option value="bronze">🥉 Bronze (750-899)</option>
                <option value="rest"> ♻ Rest (0-749)</option>
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
              { key: 'teleports', value: runtypeFilter },
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
