import './tailwind.output.css'

import ContentWrapper from 'components/ContentWrapper'
import Footer from 'components/Footer'
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

  const { error, data } = useApiRequest('api/auth/account', {}, true)

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
      avatarUrl: data.photos[0].url,
    })
  }, [data, error])

  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }} />
      <BrowserRouter>
        <UserContext.Provider
          value={{ user: userState, dispatch: dispatchUser }}
        >
          <ModeContext.Provider
            value={{
              state: modeState,
              dispatch: dispatchMode,
            }}
          >
            <NavBar></NavBar>
            <ContentWrapper></ContentWrapper>
          </ModeContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
      <Footer></Footer>
    </>
  )
}

export default App
