import React from 'react'
import { Helmet } from 'react-helmet'

const JumpStats = () => {
  return (
    <div>
      <Helmet title="Jumpstats" />
      Jump type:{' '}
      <select>
        <option value={'lj'}>Longjump</option>
      </select>
    </div>
  )
}

export default JumpStats
