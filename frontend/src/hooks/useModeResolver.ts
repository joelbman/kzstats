import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

const useModeResolver = () => {
  const location = useLocation()
  const urlSearch = useRef(new URLSearchParams(location.search))
  const [mode, setMode] = useState(localStorage.getItem('kzMode') || 'kz_timer')
  const [tick, setTick] = useState(localStorage.getItem('tickrate') || '128')

  useEffect(() => {
    if (urlSearch.current.get('mode') && ['kz_timer', 'kz_vanilla', 'kz_simple'].indexOf(urlSearch.current.get('mode') as string) > -1)
      setMode(urlSearch.current.get('mode') || 'kz_timer')
    if (
      urlSearch.current.get('tick') &&
      urlSearch.current.get('mode') === 'kz_timer' &&
      ['128', '102', '64'].indexOf(urlSearch.current.get('tick') as string) > -1
    )
      setTick(urlSearch.current.get('tick') || '128')
  }, [location])

  return { mode, tick }
}

export default useModeResolver
