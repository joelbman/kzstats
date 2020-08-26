import './tailwind.output.css'

import Footer from 'components/Footer'
import MainContent from 'components/MainContent'
import NavBar from 'components/navbar/NavBar'
import useApiRequest from 'components/util/useApiRequest'
import { ModeContext } from 'context/ModeContext'
import { UserContext } from 'context/UserContext'
import User from 'models/User'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
  const [modeState, setModeState] = useState({
    kzMode: localStorage.getItem('kzMode') || 'kz_timer',
    tickrate: localStorage.getItem('tickrate') || '128',
  })
  const [userState, setUserState] = useState<User | null>(null)
  const dispatchMode = (mode: string, tick: string) => {
    setModeState({ kzMode: mode, tickrate: tick })
  }
  const dispatchUser = (user: User | null) => {
    setUserState(user)
  }

  const { error, data } = useApiRequest('/auth/profile', null, true)

  useEffect(() => {
    if (error) {
      dispatchUser(null)
      return
    }
    if (!data.id) return
    dispatchUser({
      steamid32: data.userObj.steamid32,
      steamid64: data.id,
      country: data.userObj.country,
      countryCode: data.userObj.countrycode,
      alias: data.userObj.alias,
      avatarSmall: data.photos[0].value,
      avatarMedium: data.photos[1].value,
    })
  }, [data, error])

  return (
    <BrowserRouter>
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
      </UserContext.Provider>
      <Footer />
    </BrowserRouter>
  )
}

export default App
