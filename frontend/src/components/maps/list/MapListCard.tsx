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
    <div className="bg-gray-850 border-2 border-black flex flex-col w-64">
      <div className="mt-5 bg-cover text-center h-24 overflow-hidden">
        <Suspense fallback={<div></div>}>
          <Link to={`maps/${map.name}`}>
            <ImageC
              src={`img/map/thumb/tn_${map.name}.jpg`}
              alt={map.name}
              width="150"
              height="100"
              className="m-auto border-black border-2"
            />
          </Link>
        </Suspense>
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
