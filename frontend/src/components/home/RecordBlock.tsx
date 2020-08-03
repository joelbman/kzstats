import React from 'react'
import Record from '../../models/Record'
import { Img } from 'react-image'
import RunTimeFormatter from '../util/RunTimeFormatter'
import TimeAgoFormatter from '../util/TimeAgoFormatter'

interface Props {
  record: Record
}
const RecordBlock = ({ record }: Props) => {
  return (
    <div className="mt-4 pt-4 border-t-2 border-gray-900 first:border-t-0 first:mt-0 first:pt-0">
      <div className="w-48 block md:inline-block lg:inline-block">
        <Img
          alt={record.map_name}
          src={[`img/map/thumb/tn_${record.map_name}.jpg`, 'img/noimage.png']}
          height="90"
          width="150"
          className="h-full border-black border-2 rounded-lg"
        />
      </div>
      <div className="ml-2 block md:inline-block lg:inline-block">
        <a
          className="font-bold text-gray-200 text-xl hover:text-white"
          href={`maps/${record.map_name}`}
        >
          {record.map_name}
        </a>
        <p className="text-lg">
          <RunTimeFormatter time={record.time} />
          {record.place === 1 ? (
            <img
              src="img/icon/trophy.svg"
              alt="trophy"
              height="16"
              width="16"
              className="inline ml-2 pb-2"
            />
          ) : (
            <sup className="ml-2">#{record.place}</sup>
          )}
        </p>
        by <a href={`/players/${record.steamid64}`}>{record.player_name}</a>
        <br />
        <TimeAgoFormatter datetime={record.updated_on} />
      </div>
    </div>
  )
}

export default RecordBlock
