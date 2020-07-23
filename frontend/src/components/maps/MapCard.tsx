import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Map } from '../../SwaggerClient'

interface Props {
  map: Map
}

const MapCard = ({ map }: Props) => {
  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex bg-gray-900">
      <LazyLoadImage alt={map.name} />

      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-black bg-gray-900 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">{map.name}</div>
          <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div className="flex items-center">
          <div className="text-sm">
            <p className="text-gray-900 leading-none">Jonathan Reinink</p>
            <p className="text-gray-600">Aug 18</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapCard
