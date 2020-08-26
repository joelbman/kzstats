import ImageC from 'components/general/ImageC'
import { runtimeFormat, timeAgoFormat } from 'components/util/filters'
import Record from 'models/Record'
import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  record: Record
}
const RecordBlock = ({ record }: Props) => {
  return (
    <div className="record-block">
      <div className="w-48 block md:inline-block">
        <Suspense fallback={<div></div>}>
          <Link to={`maps/${record.map_name}`}>
            <ImageC
              alt={record.map_name}
              src={`img/map/thumb/tn_${record.map_name}.jpg`}
              height="90"
              width="150"
              className="h-full border-gray-verydark border-2"
            />
          </Link>
        </Suspense>
      </div>
      <div className="ml-2 block md:inline-block">
        <Link className="font-bold text-xl" to={`maps/${record.map_name}`}>
          {record.map_name}
        </Link>
        <p className="text-lg">
          {runtimeFormat(record.time)}
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
        by <Link to={`/players/${record.steamid64}`}>{record.player_name}</Link>
        <br />
        {timeAgoFormat(record.updated_on)}
      </div>
    </div>
  )
}

export default RecordBlock
