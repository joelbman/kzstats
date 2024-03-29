import './tailwind.output.css'

import Footer from 'components/Footer'
import MainContent from 'components/MainContent'
import ScrollToTop from 'components/general/ScrollToTop'
import NavBar from 'components/navbar/NavBar'
import { ModeContext } from 'context/ModeContext'
import { UserContext } from 'context/UserContext'
import useApiRequest from 'hooks/useApiRequest'
import useModeResolver from 'hooks/useModeResolver'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Modal from 'react-modal'
import { BrowserRouter } from 'react-router-dom'
import { User } from 'types'

Modal.setAppElement('#root')
Modal.defaultStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#3d4759',
    color: '#fff',
    minWidth: '25rem',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    padding: '2rem',
  },
}

const App = () => {
  const [userState, setUserState] = useState<User | null>(null)
  const [darkmode, setDarkmode] = useState(true)
  const [loaded, setLoaded] = useState(false)
  const { error, data } = useApiRequest('/auth/profile', null, true)
  const { mode, tick } = useModeResolver()
  const [modeState, setModeState] = useState({
    kzMode: mode,
    tickrate: tick,
  })

  // Theme swap, passed down to footer
  const switchTheme = (darkmode: boolean) => {
    setDarkmode(!darkmode)

    if (darkmode) {
      document.documentElement.classList.remove('lightmode')
      localStorage.setItem('kzTheme', 'dark')
      return
    }

    document.documentElement.classList.add('lightmode')
    localStorage.setItem('kzTheme', 'light')
  }

  useEffect(() => {
    setModeState({
      kzMode: mode,
      tickrate: tick,
    })
  }, [mode, tick])

  // Theme related effect
  useEffect(() => {
    if (localStorage.getItem('kzTheme') === 'dark') {
      setDarkmode(true)
      document.documentElement.classList.remove('lightmode')
    } else if (localStorage.getItem('kzTheme') === 'light') {
      setDarkmode(false)
      document.documentElement.classList.add('lightmode')
    } else {
      localStorage.setItem('kzTheme', 'dark')
      setDarkmode(true)
    }

    setLoaded(true)
  }, [])

  // User related effect
  useEffect(() => {
    if (error) {
      dispatchUser(null)
      return
    }
    if (!data.id || !data.userObj) return
    dispatchUser({
      steamid64: data.id,
      avatarSmall: data.photos[0].value,
      avatarMedium: data.photos[1].value,
      alias: data.userObj.alias,
      country: data.userObj.country,
      countrycode: data.userObj.countrycode,
      admin: data.userObj.admin,
      updated_on: data.userObj.updated_on,
    })
  }, [data, error])

  const dispatchMode = (mode: string, tick: string) => {
    setModeState({ kzMode: mode, tickrate: tick })
  }
  const dispatchUser = (user: User | null) => {
    setUserState(user)
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Helmet htmlAttributes={{ lang: 'en' }} />
      <UserContext.Provider value={{ user: userState, dispatch: dispatchUser }}>
        <ModeContext.Provider
          value={{
            state: modeState,
            dispatch: dispatchMode,
          }}
        >
          <NavBar />
          <MainContent />
        </ModeContext.Provider>
        {loaded && <Footer switchTheme={switchTheme} darkmode={darkmode} />}
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App
