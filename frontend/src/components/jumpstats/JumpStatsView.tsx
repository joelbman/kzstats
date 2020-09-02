import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import JumpStatTable from './JumpStatTable'

const JumpStatsView = () => {
  const [jumpType, setJumpType] = useState('longjump')
  const [crouchBind, setCrouchBind] = useState(false)

  const toggleBind = () => {
    setCrouchBind(!crouchBind)
  }

  const changeJumpType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setJumpType(event.target.value)
  }

  return (
    <div>
      <Helmet title="Jumpstats" />
      <h1>Jumpstats</h1>
      <div className="inline-block mt-2">
        Jump type:
        <select value={jumpType} onChange={changeJumpType} className="ml-2">
          <option value="longjump">Longjump</option>
          <option value="bhop">Bunnyhop</option>
          <option value="dropbhop">Drop B-Hop</option>
          <option value="multibhop">Multi B-Hop</option>
          <option value="weirdjump">Weirdjump</option>
          <option value="ladderjump">Ladderjump</option>
          <option value="countjump">Countjump</option>
        </select>
      </div>
      <div className="inline-block mt-2 md:ml-4">
        Crouch bind:
        <input
          type="checkbox"
          onChange={toggleBind}
          checked={crouchBind}
          className="ml-4"
        />
      </div>
      <div className="xl:w-1/2">
        <JumpStatTable jumpType={jumpType} crouchBind={crouchBind} />
      </div>
    </div>
  )
}

export default JumpStatsView
