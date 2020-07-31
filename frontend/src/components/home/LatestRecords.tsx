import React, { useState, useEffect, useContext, useMemo } from 'react'
import useApiRequest from '../util/useApiRequest'
import RecordBlock from './RecordBlock'
import Record from '../../models/Record'
import Panel from '../general/Panel'
import { ModeContext } from '../../context/ModeContext'

const LatestRecords = () => {
  const { modeContextState } = useContext(ModeContext)
  const [apiOptions, setApiOptions] = useState({
    limit: 300,
    place_top_at_least: 20,
    has_teleports: false,
    tickrate: modeContextState.tickrate,
    modes_list_string: modeContextState.kzMode,
  })
  const { error, isLoaded, data } = useApiRequest(
    '/records/top/recent',
    apiOptions
  )
  const [items, setItems] = useState([])
  const [wrOnly, setWrOnly] = useState(true)

  const toggleWROnly = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWrOnly(event.target.checked)
  }

  useMemo(() => {
    setApiOptions({
      limit: 300,
      place_top_at_least: 20,
      has_teleports: false,
      modes_list_string: modeContextState.kzMode,
      tickrate: modeContextState.tickrate,
    })
  }, [modeContextState.kzMode, modeContextState.tickrate])

  useEffect(() => {
    // remove duplicate map+player combos and keep the newest one
    const filtered = data
      .slice()
      .filter(
        (v: Record, i, a) =>
          a.findIndex(
            (t: Record) =>
              t.map_id === v.map_id && t.player_name === v.player_name
          ) === i
      )
      .reverse()

    setItems(
      filtered
        .filter((r: Record) => {
          if (wrOnly) return r.place === 1
          else return true
        })
        .sort((a: Record, b: Record) => {
          return (
            new Date(a.updated_on).getTime() - new Date(b.updated_on).getTime()
          )
        })
        .reverse()
        .slice(0, 50)
    )
  }, [data, wrOnly])

  if (error && error.message) return <div>Error: {error.message}</div>
  if (!isLoaded) return <div className="loader"></div>

  const panelHeader = () => {
    return (
      <>
        New records
        <div className="float-right">
          <input type="checkbox" onChange={toggleWROnly} checked={wrOnly} /> WRs
          only
        </div>
      </>
    )
  }

  return (
    <Panel header={panelHeader}>
      {items.map((record: Record) => (
        <RecordBlock record={record} key={record.id} />
      ))}
      {/* </InfiniteScroll> */}
    </Panel>
  )
}

export default LatestRecords
