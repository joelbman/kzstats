import { ModeContext } from 'context/ModeContext'
import React, { useContext, useEffect, useState } from 'react'
import ReactTooltip from 'react-tooltip'

const NavModeSelect = () => {
  const { state: modeState, dispatch: modeDispatch } = useContext(ModeContext)

  const [mode, setMode] = useState(modeState.kzMode)
  const [tick, setTick] = useState(modeState.tickrate)
  const [showCopyBox, setShowCopyBox] = useState(false)
  let copyableUrl = `${window.location.href.split('?')[0]}?mode=${mode}`
  if (mode === 'kz_timer') copyableUrl += `&tick=${tick}`

  const changeMode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const tr = event.target.value !== 'kz_timer' ? '128' : modeState.tickrate
    localStorage.setItem('kzMode', event.target.value)
    localStorage.setItem('tickrate', tr)
    modeDispatch(event.target.value, tr)
  }

  const changeTickrate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    modeDispatch(modeState.kzMode, event.target.value)
    localStorage.setItem('tickrate', event.target.value)
  }

  const toggleCopyBox = () => {
    const current = showCopyBox
    setShowCopyBox(!showCopyBox)
    if (!current) {
      setTimeout(() => {
        copyText()
      }, 200)
    }
  }

  const copyText = () => {
    var copyText = document.querySelector('#urlField') as HTMLInputElement
    copyText?.select()
    document.execCommand('copy')
  }

  useEffect(() => {
    setMode(modeState.kzMode)
    setTick(modeState.tickrate)
  }, [modeState.kzMode, modeState.tickrate])

  return (
    <div className="order-6 flex flex-wrap">
      <ReactTooltip />
      <div className="inline-block" style={{ width: '10.5rem' }}>
        Mode:
        <select value={mode} onChange={changeMode}>
          <option value="kz_timer">KZTimer</option>
          <option value="kz_simple">Simple KZ</option>
          <option value="kz_vanilla">Vanilla</option>
        </select>
      </div>
      {modeState.kzMode === 'kz_timer' && (
        <div className="inline-block" style={{ width: '7.5rem' }}>
          Tick:
          <select value={tick} onChange={changeTickrate}>
            <option value="128">128</option>
            <option value="102">102</option>
            <option value="64">64</option>
          </select>
        </div>
      )}
      <div className="flex items-center justify-center">
        <svg
          onClick={toggleCopyBox}
          className="inline cursor-pointer"
          data-tip="Copy URL with mode & tick"
          stroke="currentColor"
          fill="currentColor"
          viewBox="0 0 1024 1024"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM382 896h-.2L232 746.2v-.2h150v150z"></path>
        </svg>
        {showCopyBox && (
          <div className="absolute py-2 px-4 text-white bg-black w-64 mt-20">
            <input id="urlField" type="text" value={copyableUrl} className="bg-gray-850 text-white mr-1" readOnly />
            <svg
              onClick={copyText}
              className="inline cursor-pointer"
              stroke="currentColor"
              fill="currentColor"
              viewBox="0 0 1024 1024"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM382 896h-.2L232 746.2v-.2h150v150z"></path>
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavModeSelect
