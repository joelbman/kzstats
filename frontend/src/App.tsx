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
import { BrowserRouter } from 'react-router-dom'
import { User } from 'types'

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
    if (!data.id) return
    dispatchUser({
      steamid64: data.id,
      avatarSmall: data.photos[0].value,
      avatarMedium: data.photos[1].value,
      alias: data.userObj.alias,
      country: data.userObj.country,
      countrycode: data.userObj.countrycode,
      admin: data.userObj.admin,
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
