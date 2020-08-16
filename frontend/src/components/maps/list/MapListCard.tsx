import React from 'react'
import { Img } from 'react-image'
import { Link } from 'react-router-dom'
import Map from '../../../models/Map'

interface Props {
  map: Map
}

const MapListCard = ({ map }: Props) => {
  const difficultyToText = (difficulty: number): string => {
    switch (difficulty) {
      case 1:
        return 'Very easy'
      case 2:
        return 'Easy'
      case 3:
        return 'Medium'
      case 4:
        return 'Hard'
      case 5:
        return 'Very hard'
      case 6:
        return 'Death'
      default:
        return 'Unknown'
    }
  }

  return (
    <div className="bg-gray-900 border-2 border-black flex flex-col w-64">
      <div className="mt-5 bg-cover text-center h-24 overflow-hidden">
        <Link to={`maps/${map.name}`}>
          <Img
            src={[`img/map/thumb/tn_${map.name}.jpg`, 'img/noimage.png']}
            alt={map.name}
            width={150}
            height={100}
            className="m-auto border-black border-2"
          />
        </Link>
      </div>

      <div className="p-4 justify-between leading-normal">
        <div className="mb-2">
          <div className="text-gray-200 font-bold text-xl mb-2">
            <Link to={`maps/${map.name}`}>{map.name}</Link>
          </div>
          <p className="text-gray-400 text-base">
            Difficulty: {difficultyToText(map.difficulty)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MapListCard
