import ProgressBar from 'components/general/ProgressBar'
import { runtimeFormat } from 'components/util/filters'
import useApiRequest from 'hooks/useApiRequest'
import KZMap from 'models/KZMap'
import KZRecord from 'models/KZRecord'
import React, { useEffect, useMemo, useState } from 'react'
import { TabPanel } from 'react-tabs'
import PlayerStatsGrid from './PlayerStatsGrid'

interface Props {
  data: KZRecord[]
}

interface DifficultyStats {
  tp_total: number
  tp_wr: number
  tp_time_sum: number
  tp_teleports_used: number
  pro_total: number
  pro_wr: number
  pro_time_sum: number
}

interface StatObject {
  tp_total: number
  tp_wr: number
  tp_time_sum: number
  tp_teleports_used: number
  tp_points_sum: number
  pro_total: number
  pro_wr: number
  pro_time_sum: number
  pro_points_sum: number
  [key: number]: DifficultyStats
}

const PlayerStats = (props: Props) => {
  const { error, loader, data: maps } = useApiRequest(
    '/maps?is_verified=true',
    null
  )
  const [stats, setStats] = useState<StatObject | null>(null)

  useMemo(() => {
    if (maps.length < 1) return
    const stats: StatObject = {
      tp_total: 0,
      tp_wr: 0,
      tp_time_sum: 0,
      tp_teleports_used: 0,
      tp_points_sum: 0,
      pro_total: 0,
      pro_wr: 0,
      pro_time_sum: 0,
      pro_points_sum: 0,
      1: {
        tp_time_sum: 0,
        tp_total: 0,
        tp_teleports_used: 0,
        tp_wr: 0,
        pro_total: 0,
        pro_wr: 0,
        pro_time_sum: 0,
      },
      2: {
        tp_total: 0,
        tp_wr: 0,
        tp_time_sum: 0,
        tp_teleports_used: 0,
        pro_total: 0,
        pro_wr: 0,
        pro_time_sum: 0,
      },
      3: {
        tp_total: 0,
        tp_wr: 0,
        tp_time_sum: 0,
        tp_teleports_used: 0,
        pro_total: 0,
        pro_wr: 0,
        pro_time_sum: 0,
      },
      4: {
        tp_total: 0,
        tp_wr: 0,
        tp_time_sum: 0,
        tp_teleports_used: 0,
        pro_total: 0,
        pro_wr: 0,
        pro_time_sum: 0,
      },
      5: {
        tp_total: 0,
        tp_wr: 0,
        tp_time_sum: 0,
        tp_teleports_used: 0,
        pro_total: 0,
        pro_wr: 0,
        pro_time_sum: 0,
      },
      6: {
        tp_time_sum: 0,
        tp_total: 0,
        tp_wr: 0,
        tp_teleports_used: 0,
        pro_total: 0,
        pro_wr: 0,
        pro_time_sum: 0,
      },
      7: {
        tp_time_sum: 0,
        tp_total: 0,
        tp_wr: 0,
        tp_teleports_used: 0,
        pro_total: 0,
        pro_wr: 0,
        pro_time_sum: 0,
      },
    }
    props.data.forEach((r: KZRecord) => {
      const map: KZMap = maps.find((m: KZMap) => {
        return r.map_name === m.name
      })
      if (!map) return
      if (r.teleports === 0) {
        stats.pro_total++
        stats.pro_time_sum += r.time
        stats.pro_points_sum += r.points
        stats[map.difficulty].pro_total++
        stats[map.difficulty].pro_time_sum += r.time
        if (r.points === 1000) {
          stats.pro_wr++
          stats[map.difficulty].pro_wr++
        }
      } else {
        stats.tp_total++
        stats.tp_time_sum += r.time
        stats.tp_teleports_used += r.teleports
        stats.tp_points_sum += r.points
        stats[map.difficulty].tp_total++
        stats[map.difficulty].tp_time_sum += r.time
        stats[map.difficulty].tp_teleports_used += r.teleports
        if (r.points === 1000) {
          stats.tp_wr++
          stats[map.difficulty].tp_wr++
        }
      }
    })
    setStats(stats)
  }, [maps, props.data])

  if (error) return error
  if (loader || !stats) return loader
  if (props.data.length < 1)
    return (
      <div>
        <h2>Statistics</h2> No data available.
      </div>
    )

  return (
    <div>
      {stats.pro_total > 0 && (
        <div>
          <h2>PRO Records ({stats.pro_total})</h2>
          <span className="text-lg font-bold">Average runtime:</span>{' '}
          {runtimeFormat(stats.pro_time_sum / stats.pro_total)}
          <br />
          <span className="text-lg font-bold">Average points:</span>{' '}
          {(stats.pro_points_sum / stats.pro_total).toFixed(0)}
          <PlayerStatsGrid stats={stats} type="pro" />
        </div>
      )}
      {stats.tp_total > 0 && (
        <div className="mt-8">
          <h2>TP Records ({stats.tp_total})</h2>
          <PlayerStatsGrid stats={stats} type="tp" />
        </div>
      )}
    </div>
  )
}

export default PlayerStats
