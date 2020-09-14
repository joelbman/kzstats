import ErrorHandler from 'components/general/ErrorHandler'
import { History } from 'history'
import React, { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import JumpStatTable from './JumpStatTable'

interface Props {
  history: History
  location: Location
  match: { params: { jumpType?: string } }
}

const JumpStatsView = (props: Props) => {
  const searchParams = useRef(new URLSearchParams(props.location.search))
  const params = useRef(props.match.params.jumpType)
  const jumptypes = useRef([
    { value: 'longjump', name: 'Longjump' },
    { value: 'bhop', name: 'Bunnyhop' },
    { value: 'multibhop', name: 'Multi B-Hop' },
    { value: 'dropbhop', name: 'Drop B-Hop' },
    { value: 'weirdjump', name: 'Weirdjump' },
    { value: 'ladderjump', name: 'Ladderjump' },
    { value: 'countjump', name: 'Countjump' },
  ])
  const [jumpType, setJumpType] = useState(params.current ? params.current : 'longjump')
  const [crouchBind, setCrouchBind] = useState(searchParams.current.get('bind') === 'true')
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(
      !jumptypes.current.some((j) => {
        return j.value === jumpType
      })
    )
  }, [jumpType])

  if (error) return <ErrorHandler type={404} />

  const toggleBind = () => {
    props.history.push(`/jumpstats/${jumpType}/?bind=${!crouchBind}`)
    setCrouchBind(!crouchBind)
  }

  const changeJumpType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let url = `/jumpstats/${event.target.value}/`
    if (event.target.value !== 'ladderjump') url = url + `?bind=${crouchBind}`
    props.history.push(url)
    setJumpType(event.target.value)
  }

  return (
    <div>
      <Helmet title="Jumpstats" />
      <h1>Jumpstats</h1>
      <i className="block mb-4">There is an API issue which makes some Jumpstat queries very slow, seems to mostly affect longjumps with crouchbind enabled.</i>
      <div className="inline-block mt-2 mr-4">
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
      {jumpType !== 'ladderjump' && (
        <div className="inline-block mt-2">
          Crouch bind:
          <input type="checkbox" onChange={toggleBind} checked={crouchBind} className="ml-4" />
        </div>
      )}
      <div className="w-full xl:w-3/4">
        <JumpStatTable jumpType={jumpType} crouchBind={crouchBind} />
      </div>
    </div>
  )
}

export default JumpStatsView
