import { Console } from 'console'
import Table from 'components/general/Table'
import JumpStatTable from 'components/jumpstats/JumpStatTable'
import useApiRequest from 'components/util/useApiRequest'
import React, { useEffect, useState } from 'react'

interface Props {
  steamid: string
}

const PlayerJumpStats = (props: Props) => {
  const [jumpType] = useState('longjump')
  const [crouchBind] = useState(false)

  return (
    <div>
      {props.steamid && (
        <JumpStatTable
          jumpType={jumpType}
          crouchBind={crouchBind}
          steamid={props.steamid}
        />
      )}
    </div>
  )
}

export default PlayerJumpStats
