import ImageC from 'components/general/ImageC'
import { difficultyToText } from 'components/util/filters'
import Map from 'models/Map'
import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  map: Map
}

const MapListCard = ({ map }: Props) => {
  return (
    <div className="maplist-card">
      <div className="h-32 border-b bg-gray-medium border-black overflow-hidden">
        <Suspense fallback={<div></div>}>
          <Link to={`maps/${map.name}`}>
            <ImageC
              src={`img/map/thumb/tn_${map.name}.jpg`}
              alt={map.name}
              className="w-full h-full border-gray-verydark"
            />
          </Link>
        </Suspense>
      </div>

      <div className="p-4 justify-between leading-normal">
        <div className="mb-2">
          <div className="text-xl mb-2">
            <Link to={`maps/${map.name}`}>{map.name}</Link>
          </div>
          <p className="text-base">
            Difficulty: {difficultyToText(map.difficulty)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MapListCard
