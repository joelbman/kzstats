import Panel from 'components/general/Panel'
import { ModeContext } from 'context/ModeContext'
import useApiRequest from 'hooks/useApiRequest'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { KZRecord } from 'types'
import RecordBlock from './RecordBlock'

interface ApiOpt {
  limit: number
  place_top_at_least: number
  has_teleports?: boolean
  tickrate: string
  modes_list_string: string
  stage: number
}

const LatestRecords = () => {
  const [wrOnly, setWrOnly] = useState(localStorage.getItem('frontPage_wrOnly') === 'top20' ? false : true)
  const { state: modeState } = useContext(ModeContext)
  const [apiOptions, setApiOptions] = useState<ApiOpt>({
    limit: 300,
    place_top_at_least: 20,
    has_teleports: false || true || undefined,
    tickrate: modeState.tickrate,
    modes_list_string: modeState.kzMode,
    stage: 0,
  })
  const { error, loader, data } = useApiRequest('/records/top/recent', apiOptions, false, true)

  const [items, setItems] = useState([])
  const [runType, setRunType] = useState(localStorage.getItem('kzRuntype') || 'pro')

  useMemo(() => {
    let apiOpt = {
      ...apiOptions,
      modes_list_string: modeState.kzMode,
      tickrate: modeState.tickrate,
    }

    if (runType === 'pro') {
      apiOpt = { ...apiOpt, has_teleports: false }
    } else if (runType === 'tp') {
      apiOpt = { ...apiOpt, has_teleports: true }
    } else delete apiOpt.has_teleports

    setApiOptions(apiOpt)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modeState.kzMode, modeState.tickrate, runType])

  useEffect(() => {
    // remove duplicate map+player combos and keep the newest one
    const filterRecords = () => {
      const filtered = data
        .slice()
        .filter((r: KZRecord, i: number, a: []) => a.findIndex((re: KZRecord) => re.map_id === r.map_id && re.player_name === r.player_name) === i)
        .reverse()

      return filtered
        .filter((r: KZRecord) => {
          if (wrOnly) return r.place === 1
          else return true
        })
        .sort((a: KZRecord, b: KZRecord) => {
          return new Date(a.updated_on).getTime() - new Date(b.updated_on).getTime()
        })
        .reverse()
        .slice(0, 50)
    }

    setItems(filterRecords)
  }, [data, wrOnly])

  const changeWrOnly = (e: React.ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem('frontPage_wrOnly', e.target.value)
    setWrOnly(e.target.value === 'wr')
  }

  const changeRunType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem('kzRuntype', e.target.value)
    setRunType(e.target.value)
  }

  const panelHeader = () => {
    return (
      <div className="flex items-center justify-between">
        <span className="text-sm sm:text-xl m-0 p-0">Records</span>
        <div className="text-base">
          <span className="hidden sm:inline">Type:</span>
          <select value={runType} onChange={changeRunType} className="mr-1 sm:mr-4">
            <option value="pro">PRO</option>
            <option value="tp">TP</option>
            <option value="all">Overall</option>
          </select>
          <span className="hidden sm:inline">Rank:</span>
          <select value={wrOnly ? 'wr' : 'top20'} onChange={changeWrOnly}>
            <option value="wr">WR</option>
            <option value="top20">Top 20</option>
          </select>
        </div>
      </div>
    )
  }

  if (error) return error

  return (
    <Panel header={panelHeader()}>
      {loader ? <>{loader}</> : items.length > 0 ? items.map((record: KZRecord) => <RecordBlock record={record} key={record.id} />) : <p>No records found.</p>}
    </Panel>
  )
}

export default LatestRecords
