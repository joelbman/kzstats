import ProgressBar from 'components/general/ProgressBar'
import { TrophyIcon } from 'components/icons'
import { difficultyToText, runtimeFormat } from 'components/util/filters'
import React, { useEffect, useState } from 'react'

interface DifficultyStats {
  total: number
  wr: number
  time_sum: number
  tp_sum: number
}

interface Props {
  mapCount: number
  stats: DifficultyStats
  difficulty: number
}

const PlayerStatsProgressBlock = ({ mapCount, stats, difficulty }: Props) => {
  const [barColor, setBarColor] = useState('#fff')

  useEffect(() => {
    switch (difficulty) {
      case 1:
        setBarColor(
          'linear-gradient(90deg, rgba(36,139,23,1) 0%, rgba(37,199,17,1) 50%, rgba(36,139,23,1) 100%)'
        )
        break
      case 2:
        setBarColor(
          'linear-gradient(90deg, rgba(33,106,24,1) 0%, rgba(36,139,23,1) 50%, rgba(33,106,24,1) 100%)'
        )
        break
      case 3:
        setBarColor(
          'linear-gradient(90deg, rgba(164,162,28,1) 0%, rgba(221,218,23,1) 50%, rgba(164,162,28,1) 100%)'
        )
        break
      case 4:
        setBarColor(
          'linear-gradient(90deg, rgba(120,65,28,1) 0%, rgba(221,126,16,1) 50%, rgba(120,65,28,1) 100%)'
        )
        break
      case 5:
        setBarColor(
          'linear-gradient(90deg, rgba(131,41,41,1) 0%, rgba(214,17,17,1) 50%, rgba(129,39,39,1) 100%)'
        )
        break
      case 6:
        setBarColor(
          'linear-gradient(90deg, rgba(84,39,39,1) 0%, rgba(138,19,43,1) 50%, rgba(84,39,39,1) 100%)'
        )
        break
      case 7:
        setBarColor(
          'linear-gradient(90deg, rgba(27,12,12,1) 0%, rgba(87,30,30,1) 50%, rgba(27,12,12,1) 100%)'
        )
        break
      default:
        setBarColor(
          'linear-gradient(90deg, rgba(36,139,23,1) 0%, rgba(37,199,17,1) 50%, rgba(36,139,23,1) 100%)'
        )
        break
    }
  }, [difficulty])

  return (
    <ProgressBar
      current={stats.total}
      max={mapCount}
      barColor={barColor}
      textColor={difficulty === 3 ? '#000' : '#fff'}
      label={
        <>
          {difficultyToText(difficulty)} ({stats.total}/{mapCount}){' '}
          <span className="float-right">
            <TrophyIcon className="h-4 w-4 mr-1" />
            {stats.wr}
          </span>
        </>
      }
      info={
        stats.time_sum
          ? `Avg. time: ${runtimeFormat(stats.time_sum / stats.total)}`
          : ''
      }
    />
  )
}

export default PlayerStatsProgressBlock
