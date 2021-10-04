import { UserContext } from 'context/UserContext'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  switchTheme(darkmode: boolean): void
  darkmode: boolean
}

const Footer = (props: Props) => {
  const [checked, setChecked] = useState(props.darkmode)
  const userCtx = useContext(UserContext)

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked)
    props.switchTheme(e.target.checked)
  }

  return (
    <footer className="flex justify-center items-center">
      {userCtx?.user?.admin && (
        <div className="px-4">
          <Link to="/admin">Admin</Link>
        </div>
      )}
      <div className="mr-4 hidden text-sm sm:inline-block">
        &copy; Joel Bergman 2021 - <a href="https://store.steampowered.com/">Powered by Steam</a>
      </div>
      <div className="mr-4">
        <a href="https://github.com/joelbman/kzstats/">
          <img src="/img/icon/githubicon.png" alt="GitHub logo" />
        </a>
      </div>
      <div className="flex items-center justify-center">
        Theme:
        <label className="switch ml-2">
          <input type="checkbox" onChange={handleToggle} checked={checked} />
          <span className="slider round" />
        </label>
      </div>
    </footer>
  )
}
export default Footer
