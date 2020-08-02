import React, { useContext } from 'react'
import { ModeContext } from '../../context/ModeContext'

const NavModeSelect = () => {
  const { modeContextState, modeContextDispatch } = useContext(ModeContext)

  const changeMode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const tick =
      event.target.value !== 'kz_timer' ? '128' : modeContextState.tickrate
    localStorage.setItem('kzMode', event.target.value)
    localStorage.setItem('tickrate', tick)
    modeContextDispatch(event.target.value, tick)
  }

  const changeTickrate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    modeContextDispatch(modeContextState.kzMode, event.target.value)
    localStorage.setItem('tickrate', event.target.value)
  }

  return (
    <div className="order-6 flex flex-wrap flex-grow flex-row text-gray-300 mt-4 border-black border-t-2 md:border-0 lg:border-0 pt-4 lg:pt-0 lg:mt-0">
      <div style={{ width: '10rem' }}>
        Mode:
        <select
          value={modeContextState.kzMode}
          onChange={changeMode}
          className="border-black border-2 mr-4 ml-2 bg-gray-700 rounded-lg text-gray-400"
        >
          <option value="kz_timer">KZTimer</option>
          <option value="kz_simple">Simple KZ</option>
          <option value="kz_vanilla">Vanilla</option>
        </select>
      </div>
      {modeContextState.kzMode === 'kz_timer' && (
        <div style={{ width: '9rem' }}>
          Tick:
          <select
            value={modeContextState.tickrate}
            onChange={changeTickrate}
            className="border-black border-2 mr-4 ml-2 bg-gray-700 rounded-lg text-gray-400"
          >
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
