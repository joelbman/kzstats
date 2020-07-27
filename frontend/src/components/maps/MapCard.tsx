import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Map from '../../models/Map'

interface Props {
  map: Map
}

const MapCard = ({ map }: Props) => {
  let titleStyle = 'text-gray-200 font-bold text-xl mb-2'

  if (map.name && map.name.length > 15) {
    titleStyle = 'text-gray-200 font-bold text-l mb-2'
  }

  return (
    <div className=" bg-gray-900 border-2 border-black rounded">
      <div className="mt-5 bg-cover text-center overflow-hidden">
        <LazyLoadImage
          alt={map.name}
          src={`img/map/thumb/tn_${map.name}.jpg`}
          height="150"
          width="150"
          placeholderSrc="img/questionmark.png"
          className="h-full"
        />
      </div>

      <div className="bg-gray-900 p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className={titleStyle}>{map.name}</div>
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

export default MapCard
