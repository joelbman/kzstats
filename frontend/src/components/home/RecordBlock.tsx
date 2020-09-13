import ImageC from 'components/general/ImageC'
import { FlagIcon } from 'components/icons'
import { runtimeFormat, timeAgoFormat } from 'components/util/filters'
import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { KZRecord } from 'types'

interface Props {
  record: KZRecord
}

const RecordBlock = ({ record }: Props) => {
  return (
    <div className="record-block">
      <div className="w-full block sm:inline-block sm:w-40">
        <Suspense fallback={<span></span>}>
          <Link to={`maps/${record.map_name}`}>
            <ImageC
              alt={record.map_name}
              src={`img/map/thumb/tn_${record.map_name}.jpg`}
              height="90"
              width="150"
              className="h-full mx-auto sm:block border-black border-2"
            />
          </Link>
        </Suspense>
      </div>
      <div className="ml-2 block sm:inline-block">
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
              className="inline ml-1 pb-2"
            />
          ) : (
            <sup className="ml-2">#{record.place}</sup>
          )}
          {record.teleports > 0 && (
            <span className="text-sm ml-2">({record.teleports} TPs)</span>
          )}
        </p>
        by{' '}
        <Link to={`/players/${record.steamid64}`}>
          {record.player_name}
          {record.countrycode ? <FlagIcon code={record.countrycode} /> : ''}
        </Link>
        <br />
        {timeAgoFormat(record.updated_on)}
      </div>
    </div>
  )
}

export default RecordBlock
