import React, { useState } from 'react'

interface Props {
  switchTheme(darkmode: boolean): void
  darkmode: boolean
}

const Footer = (props: Props) => {
  const [checked, setChecked] = useState(props.darkmode)

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked)
    props.switchTheme(e.target.checked)
  }

  return (
    <footer>
      <div className="mr-8">&copy; Joel Bergman 2020 - Powered by Steam</div>
      <div>
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
