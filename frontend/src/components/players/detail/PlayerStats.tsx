import Loader from 'components/general/Loader'
import { runtimeFormat } from 'components/util/filters'
import useApiRequest from 'hooks/useApiRequest'
import KZMap from 'models/KZMap'
import KZRecord from 'models/KZRecord'
import React, { useMemo, useState } from 'react'
import PlayerStatsGrid from './PlayerStatsGrid'

interface Props {
  data: KZRecord[]
}

interface DifficultyStats {
  total: number
  wr: number
  time_sum: number
  tp_sum: number
}

interface StatObject {
  total: number
  wr: number
  time_sum: number
  tp_sum: number
  points_sum: number
  [key: number]: DifficultyStats
}

interface MapCount {
  [key: number]: number
}

const PlayerStats = (props: Props) => {
  const { error, loader, data: mapData } = useApiRequest(
    '/maps?is_verified=true&limit=1000',
    null
  )
  const [proStats, setProStats] = useState<StatObject | null>(null)
  const [tpStats, setTpStats] = useState<StatObject | null>(null)
  const [mapCount, setMapCount] = useState<MapCount | null>(null)

  useMemo(() => {
    if (mapData.length < 1) return

    const mapCountObj: MapCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 }
    mapData.forEach((m: KZMap) => {
      mapCountObj[m.difficulty]++
    })
    setMapCount(mapCountObj)

    const tpObj: StatObject = {
      total: 0,
      wr: 0,
      time_sum: 0,
      tp_sum: 0,
      points_sum: 0,
      1: {
        time_sum: 0,
        total: 0,
        tp_sum: 0,
        wr: 0,
      },
      2: {
        time_sum: 0,
        total: 0,
        tp_sum: 0,
        wr: 0,
      },
      3: {
        time_sum: 0,
        total: 0,
        tp_sum: 0,
        wr: 0,
      },
      4: {
        time_sum: 0,
        total: 0,
        tp_sum: 0,
        wr: 0,
      },
      5: {
        time_sum: 0,
        total: 0,
        tp_sum: 0,
        wr: 0,
      },
      6: {
        time_sum: 0,
        total: 0,
        tp_sum: 0,
        wr: 0,
      },
      7: {
        time_sum: 0,
        total: 0,
        tp_sum: 0,
        wr: 0,
      },
    }

    const proObj = JSON.parse(JSON.stringify(tpObj))

    props.data.forEach((r: KZRecord) => {
      const map: KZMap = mapData.find((m: KZMap) => {
        return r.map_name === m.name
      })
      if (!map) return
      const obj = r.teleports === 0 ? proObj : tpObj
      obj.total++
      obj.time_sum += r.time
      obj.points_sum += r.points
      obj.tp_sum += r.teleports
      obj[map.difficulty].total++
      obj[map.difficulty].time_sum += r.time
      if (map.difficulty === 7) console.log(r)
      if (r.points === 1000) {
        obj.wr++
        obj[map.difficulty].wr++
      }
    })
    setProStats(proObj)
    setTpStats(tpObj)
  }, [mapData, props.data])

  if (error) return error
  if (loader || !proStats || !tpStats || !mapCount) return <Loader />
  if (props.data.length < 1)
    return (
      <div>
        <h2>Statistics</h2> No data available.
      </div>
    )

  return (
    <div>
      {proStats.total > 0 && (
        <div>
          <h2>PRO Records ({proStats.total})</h2>
          <div>
            <h3>Averages</h3>
            <b>Runtime:</b> {runtimeFormat(proStats.time_sum / proStats.total)}
            <br />
            <b>Points:</b> {(proStats.points_sum / proStats.total).toFixed(0)}
          </div>

          <PlayerStatsGrid stats={proStats} mapCount={mapCount} />
        </div>
      )}
      {tpStats.total > 0 && (
        <div className="pt-8 mt-8 border-t border-black">
          <h2>TP Records ({tpStats.total})</h2>
          <div>
            <h3>Averages</h3>
            <b>Runtime:</b> {runtimeFormat(tpStats.time_sum / tpStats.total)}
            <br />
            <b>Points:</b> {(tpStats.points_sum / tpStats.total).toFixed(0)}
            <br />
            <b>Teleports:</b> {(tpStats.tp_sum / tpStats.total).toFixed(0)}
          </div>

          <PlayerStatsGrid stats={tpStats} mapCount={mapCount} />
        </div>
      )}
    </div>
  )
}

export default PlayerStats
