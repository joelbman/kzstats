import React, { useContext } from 'react'
import { ModeContext } from '../../context/ModeContext'

const NavModeSelect = () => {
  const { modeContextState: state, modeContextDispatch: dispatch } = useContext(
    ModeContext
  )

  const changeMode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem('kzMode', event.target.value)
    dispatch(event.target.value, state.tickrate)
  }

  const changeTickrate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(state.kzMode, event.target.value)
    localStorage.setItem('tickrate', event.target.value)
  }

  return (
    <div>
      Mode:
      <select value={state.kzMode} onChange={changeMode}>
        <option value="kz_timer">KZTimer</option>
        <option value="kz_simple">Simple KZ</option>
        <option value="kz_vanilla">Vanilla</option>
      </select>
      {state.kzMode === '200' && (
        <>
          Tick:
          <select value={state.tickrate} onChange={changeTickrate}>
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
