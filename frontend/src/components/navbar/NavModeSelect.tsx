import { ModeContext } from 'context/ModeContext'
import React, { useContext } from 'react'

const NavModeSelect = () => {
  const { state: modeState, dispatch: modeDispatch } = useContext(ModeContext)

  const changeMode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const tick = event.target.value !== 'kz_timer' ? '128' : modeState.tickrate
    localStorage.setItem('kzMode', event.target.value)
    localStorage.setItem('tickrate', tick)
    modeDispatch(event.target.value, tick)
  }

  const changeTickrate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    modeDispatch(modeState.kzMode, event.target.value)
    localStorage.setItem('tickrate', event.target.value)
  }

  return (
    <div className="order-6 flex flex-wrap">
      <div className="inline-block" style={{ width: '10.5rem' }}>
        Mode:
        <select value={modeState.kzMode} onChange={changeMode}>
          <option value="kz_timer">KZTimer</option>
          <option value="kz_simple">Simple KZ</option>
          <option value="kz_vanilla">Vanilla</option>
        </select>
      </div>
      {modeState.kzMode === 'kz_timer' && (
        <div className="inline-block" style={{ width: '7.5rem' }}>
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
