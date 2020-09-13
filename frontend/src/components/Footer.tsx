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
      <div className="mr-8 hidden sm:inline-block">
        &copy; Joel Bergman 2020 - Powered by Steam
      </div>
      <div className="flex items-center justify-center">
        Theme:
        <label className="switch ml-2">
          <input type="checkbox" onChange={handleToggle} checked={checked} />
          <span className="slider round" />
        </label>
      </div>
      {userCtx?.user?.admin && (
        <div>
          <Link to="/admin">Admin</Link>
        </div>
      )}
    </footer>
  )
}
export default Footer
