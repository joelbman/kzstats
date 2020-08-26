import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const [darkmode, setDarkmode] = useState(false)

  const switchMode = (darkmode: boolean) => {
    setDarkmode(darkmode)

    if (darkmode) {
      document.documentElement.classList.remove('lightmode')
      localStorage.setItem('kzTheme', 'dark')
      return
    }

    document.documentElement.classList.add('lightmode')
    localStorage.setItem('kzTheme', 'light')
  }

  useEffect(() => {
    if (localStorage.getItem('kzTheme') === 'dark') {
      setDarkmode(true)
      document.documentElement.classList.remove('lightmode')
    } else if (localStorage.getItem('kzTheme') === 'light') {
      setDarkmode(false)
      document.documentElement.classList.add('lightmode')
    } else {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        localStorage.setItem('kzTheme', 'dark')
        setDarkmode(true)
      }
    }
  }, [])

  const handleToggle = (e: React.ChangeEvent) => {
    switchMode(!darkmode)
  }

  return (
    <footer>
      <div className="mr-8">&copy; Joel Bergman 2020 - Powered by Steam</div>
      <div>
        Theme:
        <label className="switch ml-2">
          <input type="checkbox" onChange={handleToggle} checked={darkmode} />
          <span className="slider round" />
        </label>
      </div>
    </footer>
  )
}
export default Footer
