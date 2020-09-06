import ProgressBar from 'components/general/ProgressBar'
import React from 'react'

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

interface Props {
  stats: StatObject
  type: 'tp' | 'pro'
}

const PlayerStatsGrid = ({ stats, type }: Props) => {
  if (type === 'tp') {
    return (
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ProgressBar
          current={stats[1].tp_total}
          max={stats.tp_total}
          barColor="#259917"
          label={`Very easy (${stats[1].tp_total}/${stats.tp_total})`}
        />
        <ProgressBar
          current={stats[2].tp_total}
          max={stats.tp_total}
          barColor="#207316"
          label={`Easy (${stats[2].tp_total}/${stats.tp_total})`}
        />
        <ProgressBar
          current={stats[3].tp_total}
          max={stats.tp_total}
          barColor="#b0a61a"
          textColor="black"
          label={`Medium (${stats[3].tp_total}/${stats.tp_total})`}
        />
        <ProgressBar
          current={stats[4].tp_total}
          max={stats.tp_total}
          barColor="orange"
          label={`Hard (${stats[4].tp_total}/${stats.tp_total})`}
        />
        <ProgressBar
          current={stats[5].tp_total}
          max={stats.tp_total}
          barColor="red"
          label={`Very hard (${stats[5].tp_total}/${stats.tp_total})`}
        />
        <ProgressBar
          current={stats[6].tp_total}
          max={stats.tp_total}
          barColor="black"
          label={`Death (${stats[6].tp_total}/${stats.tp_total})`}
        />
      </div>
    )
  }

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ProgressBar
        current={stats[1].pro_total}
        max={stats.pro_total}
        barColor="#259917"
        label={`Very easy (${stats[1].pro_total}/${stats.pro_total})`}
      />
      <ProgressBar
        current={stats[2].pro_total}
        max={stats.pro_total}
        barColor="#207316"
        label={`Easy (${stats[2].pro_total}/${stats.pro_total})`}
      />
      <ProgressBar
        current={stats[3].pro_total}
        max={stats.pro_total}
        barColor="#d9cb11"
        textColor="black"
        label={`Medium (${stats[3].pro_total}/${stats.pro_total})`}
      />
      <ProgressBar
        current={stats[4].pro_total}
        max={stats.pro_total}
        barColor="orange"
        label={`Hard (${stats[4].pro_total}/${stats.pro_total})`}
      />
      <ProgressBar
        current={stats[5].pro_total}
        max={stats.pro_total}
        barColor="red"
        label={`Very hard (${stats[5].pro_total}/${stats.pro_total})`}
      />
      <ProgressBar
        current={stats[6].pro_total}
        max={stats.pro_total}
        barColor="black"
        label={`Death (${stats[6].pro_total}/${stats.pro_total})`}
      />
    </div>
  )
}

export default PlayerStatsGrid
