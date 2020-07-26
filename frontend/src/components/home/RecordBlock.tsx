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
    <div className="flex mt-4 pt-4 mb-0 pb-0 border-t-2 border-gray-900 first:border-t-0 first:mt-0 first:pt-0">
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
          <span className="font-light text-lg">
            {' '}
            (<RunTimeFormatter time={record.time} />)
          </span>
        </p>
        by <b>{record.player_name}</b>
        <br />
        <TimeAgoFormatter datetime={record.updated_on} />
      </div>
    </div>
  )
}

export default RecordBlock
