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
  const [country, setCountry] = useState(user?.countrycode || '')
  const [alias, setAlias] = useState(user?.alias || '')
  const [done, setDone] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const { error, loader, data } = useApiRequest('/country/', null, true)

  if (!user) return <Redirect to="/" />
  if (error) return error
  if (loader) return loader

  const handleSubmit = () => {
    Axios.patch('/player/profile/', { alias: alias, country: country })
      .then(() => {
        setDone(true)
      })
      .catch(() => {
        setSubmitError(true)
      })
  }

  return (
    <div>
      <h2>Profile settings</h2>
      {done ? (
        <p>Success!</p>
      ) : (
        <form className="mt-2">
          <div className="inline-block w-20">Name</div>
          <input
            type="text"
            minLength={2}
            maxLength={40}
            onChange={(e) => {
              setAlias(e.target.value)
            }}
            value={user.alias}
          />
          <div className="block mt-4 mb-4">
            <div className="inline-block w-20">Country</div>
            <select
              value={country}
              onChange={(e) => {
                setCountry(e.target.value)
              }}
            >
              <option value="">None</option>
              {Object.keys(data).map((c: string, i: number) => (
                <option value={c} key={i}>
                  {data[c]}
                </option>
              ))}
            </select>
          </div>
          <p className="italic">You can only change your profile information once in 7 days.</p>
          <button className="bg-green-700 px-2 py-1 mt-4" onClick={handleSubmit}>
            Submit
          </button>
          {submitError && <p className="text-red-800 font-bold">Something went wrong.</p>}
        </form>
      )}
    </div>
  )
}

export default PlayerProfileSettings
