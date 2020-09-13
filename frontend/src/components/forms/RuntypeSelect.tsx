import React, { useState } from 'react'

interface Props {
  callback?(val: string): void
}

const RuntypeSelect = (props: Props) => {
  const [runtype, setRuntype] = useState(
    localStorage.getItem('kzRuntype') || 'pro'
  )

  const changeRunType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem('kzRuntype', e.target.value)
    setRuntype(e.target.value)
    if (props.callback) props.callback(e.target.value)
  }

  return (
    <select value={runtype} onChange={changeRunType} className="mr-1 sm:mr-4">
      <option value="pro">PRO</option>
      <option value="tp">TP</option>
      <option value="all">Overall</option>
    </select>
  )
}

export default RuntypeSelect
