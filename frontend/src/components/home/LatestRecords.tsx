import Panel from 'components/general/Panel'
import { ModeContext } from 'context/ModeContext'
import useApiRequest from 'hooks/useApiRequest'
import Record from 'models/Record'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import RecordBlock from './RecordBlock'

interface Props {
  steamid64?: string
}

const LatestRecords = (props: Props) => {
  const { state: modeState } = useContext(ModeContext)

  let apiOpt = props.steamid64
    ? {
        limit: 300,
        has_teleports: false,
        tickrate: modeState.tickrate,
        modes_list_string: modeState.kzMode,
        steamid64: props.steamid64,
      }
    : {
        limit: 300,
        place_top_at_least: 20,
        has_teleports: false,
        tickrate: modeState.tickrate,
        modes_list_string: modeState.kzMode,
      }

  const [apiOptions, setApiOptions] = useState(apiOpt)

  const { error, loader, data } = useApiRequest(
    '/records/top/recent',
    apiOptions,
    false,
    true
  )
  const [items, setItems] = useState([])
  const [wrOnly, setWrOnly] = useState(true)

  const toggleWROnly = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWrOnly(event.target.checked)
  }

  useMemo(() => {
    setApiOptions({
      ...apiOptions,
      modes_list_string: modeState.kzMode,
      tickrate: modeState.tickrate,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modeState.kzMode, modeState.tickrate])

  useEffect(() => {
    // remove duplicate map+player combos and keep the newest one
    const filterRecords = () => {
      const filtered = data
        .slice()
        .filter(
          (r: Record, i: number, a: []) =>
            a.findIndex(
              (re: Record) =>
                re.map_id === r.map_id && re.player_name === r.player_name
            ) === i
        )
        .reverse()

      return filtered
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
    }

    setItems(filterRecords)
  }, [data, wrOnly])

  if (error) return error

  const panelHeader = () => {
    return (
      <>
        {props.steamid64 ? 'My records' : 'Global records'}
        <div className="float-right">
          <input type="checkbox" onChange={toggleWROnly} checked={wrOnly} /> WRs
          only
        </div>
      </>
    )
  }

  return (
    <Panel header={panelHeader}>
      {loader ? (
        <>{loader}</>
      ) : items.length > 0 ? (
        items.map((record: Record) => (
          <RecordBlock record={record} key={record.id} />
        ))
      ) : (
        <p>No records found.</p>
      )}
    </Panel>
  )
}

export default LatestRecords
