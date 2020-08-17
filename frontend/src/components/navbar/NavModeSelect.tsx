import { ModeContext } from 'context/ModeContext'
import React, { useContext } from 'react'

interface Props {
  hidden: boolean
}

const NavModeSelect = (props: Props) => {
  const { state: modeState, dispatch: modeDispatch } = useContext(ModeContext)

  const changeMode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const tick = event.target.value !== 'kz_timer' ? '128' : modeState.tickrate
    localStorage.setItem('kzMode', event.target.value)
    localStorage.setItem('tickrate', tick)
    modeDispatch(event.target.value, tick)
    console.log(modeState.kzMode)
  }

  const changeTickrate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    modeDispatch(modeState.kzMode, event.target.value)
    localStorage.setItem('tickrate', event.target.value)
  }

  const hidden = props.hidden ? 'hidden' : ''

  let classes = `${hidden} order-6 flex-wrap lg:flex-1 flex-row lg:flex lg:flex-no-wrap text-gray-300 mt-4 pt-4 lg:pt-0 lg:mt-0`

  return (
    <div className={classes}>
      <div style={{ width: '10.5rem' }} className="inline">
        Mode:
        <select value={modeState.kzMode} onChange={changeMode}>
          <option value="kz_timer">KZTimer</option>
          <option value="kz_simple">Simple KZ</option>
          <option value="kz_vanilla">Vanilla</option>
        </select>
      </div>
      {modeState.kzMode === 'kz_timer' && (
        <div style={{ width: '7.5rem' }} className="inline">
          Tick:
          <select value={modeState.tickrate} onChange={changeTickrate}>
            <option value="128">128</option>
            <option value="102">102</option>
            <option value="64">64</option>
          </select>
        </div>
      )}
    </div>
  )
}

export default NavModeSelect
