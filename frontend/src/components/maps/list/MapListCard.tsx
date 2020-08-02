import React from 'react'
import { Img } from 'react-image'
import Map from '../../../models/Map'

interface Props {
  map: Map
}

const MapListCard = ({ map }: Props) => {
  return (
    <div className="bg-gray-900 border-2 border-black rounded-lg flex flex-col w-64">
      <div className="mt-5 bg-cover text-center h-24 overflow-hidden">
        <Img
          src={[`img/map/thumb/tn_${map.name}.jpg`, 'img/noimage.png']}
          alt={map.name}
          width={150}
          height={100}
          className="m-auto border-black border-2"
        />
      </div>

      <div className="p-4 justify-between leading-normal">
        <div className="mb-2">
          <div className="text-gray-200 font-bold text-xl mb-2">
            <a href={`maps/${map.name}`}>{map.name}</a>
          </div>
          <p className="text-gray-400 text-base">
            Difficulty: {map.difficulty}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MapListCard
