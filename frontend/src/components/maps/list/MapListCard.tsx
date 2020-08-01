import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Map from '../../../models/Map'

interface Props {
  map: Map
}

const MapListCard = ({ map }: Props) => {
  let titleStyle = 'text-gray-200 font-bold text-xl mb-2'

  return (
    <div className="bg-gray-900 border-2 border-black rounded-lg flex flex-col w-64">
      <div className="mt-5 bg-cover text-center h-24 overflow-hidden">
        <LazyLoadImage
          alt={map.name}
          src={`img/map/thumb/tn_${map.name}.jpg`}
          height="150"
          width="150"
          placeholderSrc="img/icon/cancel.png"
          className="h-full"
        />
      </div>

      <div className="p-4 justify-between leading-normal">
        <div className="mb-8">
          <div className={titleStyle}>
            <a href={`maps/${map.name}`}>{map.name}</a>
          </div>
          <p className="text-gray-400 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
      </div>
    </div>
  )
}

export default MapListCard
