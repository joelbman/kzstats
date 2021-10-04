import React from 'react'
import PlayerStatsProgressBlock from './PlayerStatsProgressBlock'

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

interface Props {
  stats: StatObject
  mapCount: MapCount
}

const PlayerStatsGrid = ({ stats, mapCount }: Props) => {
  return (
    <div className="mt-4">
      <h3>Difficulty breakdown</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <PlayerStatsProgressBlock mapCount={mapCount[i]} stats={stats[i]} difficulty={i} key={i} />
        ))}
      </div>
    </div>
  )
}

export default PlayerStatsGrid
