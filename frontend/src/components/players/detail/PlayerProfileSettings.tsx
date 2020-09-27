import Axios from 'axios'
import { UserContext } from 'context/UserContext'
import useApiRequest from 'hooks/useApiRequest'
import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { User } from 'types'

interface Props {
  user: User
}

const PlayerProfileSettings = (props: Props) => {
  const userCtx = useContext(UserContext)
  const user = userCtx?.user
  const [countryCode, setCountryCode] = useState(user?.countrycode || '')
  const [alias, setAlias] = useState(user?.alias || '')
  const [done, setDone] = useState(false)
  const [submitError, setSubmitError] = useState<Error | null>(null)
  const { error, loader, data: countries } = useApiRequest('/country/', null, true)
  const dateLimit = new Date()
  dateLimit.setDate(dateLimit.getDate() - 7)

  if (!user) return <Redirect to="/" />
  if (error) return error
  if (loader) return loader

  const handleSubmit = () => {
    if (done) return
    const newInfo = { alias: alias, countrycode: countryCode, country: countries[countryCode] }
    Axios.patch('/api/player/profile/', newInfo)
      .then(() => {
        userCtx?.dispatch(Object.assign(user, newInfo))
        console.log(Object.assign(user, newInfo))
        setDone(true)
      })
      .catch((e) => {
        setSubmitError(e)
      })
  }

  const renderForm = () => {
    return (
      <form className="mt-2" onSubmit={(e) => e.preventDefault()}>
        <div className="inline-block w-20">Name</div>
        <input
          type="text"
          minLength={2}
          maxLength={40}
          onChange={(e) => {
            setAlias(e.target.value)
          }}
          value={alias}
          style={{ minWidth: '19.7rem', paddingLeft: '0.6rem' }}
        />
        <div className="block mt-4 mb-4">
          <div className="inline-block w-20">Country</div>
          <select
            value={countryCode}
            onChange={(e) => {
              setCountryCode(e.target.value)
            }}
          >
            <option value="">None</option>
            {Object.keys(countries).map((code: string, i: number) => (
              <option value={code} key={i}>
                {countries[code]}
              </option>
            ))}
          </select>
        </div>
        <p className="italic">You can only change your profile information once every week.</p>
        {(!user?.updated_on || user.updated_on < dateLimit.toISOString()) && (
          <button className="bg-green-700 px-2 py-1 mt-4" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </form>
    )
  }

  return (
    <div>
      <h2>Profile settings</h2>
      {done && !submitError && <p>Success!</p>}
      {submitError && <p className="text-red-800 font-bold">Something went wrong!</p>}
      {!done && !submitError && renderForm()}
    </div>
  )
}

export default PlayerProfileSettings
