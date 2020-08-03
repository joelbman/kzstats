import React, { useState, ChangeEvent } from 'react'
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
      <div className="block mt-2">
        Jump type:
        <select
          className="bg-gray-900 text-gray-300 ml-4"
          value={jumpType}
          onChange={changeJumpType}
        >
          <option value="lj">Longjump</option>
          <option value="bhop">Bunnyhop</option>
          <option value="dropbhop">Drop B-Hop</option>
          <option value="multibhop">Multi B-Hop</option>
          <option value="weirdjump">Weirdjump</option>
          <option value="ladderjump">Ladderjump</option>
          <option value="countjump">Countjump</option>
        </select>
      </div>
      <div className="block mt-2">
        Crouch bind:
        <input
          type="checkbox"
          onChange={toggleBind}
          checked={crouchBind}
          className="ml-4"
        />
      </div>
      <JumpStatTable jumpType={jumpType} crouchBind={crouchBind} />
    </div>
  )
}

export default JumpStatsView
