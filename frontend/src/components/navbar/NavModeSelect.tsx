import React, { useContext } from 'react'
import { ModeContext } from '../../context/ModeContext'

const NavModeSelect = () => {
  const { modeContextState, modeContextDispatch } = useContext(ModeContext)

  const changeMode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const tick =
      event.target.value !== 'kz_timer' ? '128' : modeContextState.tickrate
    localStorage.setItem('kzMode', event.target.value)
    modeContextDispatch(event.target.value, tick)
  }

  const changeTickrate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    modeContextDispatch(modeContextState.kzMode, event.target.value)
    localStorage.setItem('tickrate', event.target.value)
  }

  return (
    <div className="order-6 flex-grow text-gray-300 lg:ml-4 mt-4 border-black border-t-2 lg:border-0 pt-4 lg:pt-0 lg:mt-0">
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
      {modeContextState.kzMode === 'kz_timer' && (
        <>
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
        </>
      )}
    </div>
  )
}

export default NavModeSelect
