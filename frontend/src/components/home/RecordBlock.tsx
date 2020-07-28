import React from 'react'
import Record from '../../models/Record'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import RunTimeFormatter from '../util/RunTimeFormatter'
import TimeAgoFormatter from '../util/TimeAgoFormatter'

interface Props {
  record: Record
}
const RecordBlock = ({ record }: Props) => {
  return (
    <div className="flex mt-4 pt-4 border-t-2 border-gray-900 first:border-t-0 first:mt-0 first:pt-0">
      <div className="w-48">
        <LazyLoadImage
          alt={record.map_name}
          src={`img/map/thumb/tn_${record.map_name}.jpg`}
          height="150"
          width="150"
          placeholderSrc="img/questionmark.png"
          className="h-full border-black border-2 rounded-lg "
        />
      </div>
      <div className="ml-2">
        <p className="font-bold text-gray-200 text-xl break-words ">
          {record.map_name}
        </p>
        <p>
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
        by <b>{record.player_name}</b>
        <br />
        <TimeAgoFormatter datetime={record.updated_on} />
      </div>
    </div>
  )
}

export default RecordBlock
