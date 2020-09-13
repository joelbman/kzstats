import { UserContext } from 'context/UserContext'
import useApiRequest from 'hooks/useApiRequest'
import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { User } from 'types'

interface Props {
  user: User
}

const PlayerProfileSettings = (props: Props) => {
  const userCtx = useContext(UserContext)
  const user = userCtx?.user
  const { error, loader, data } = useApiRequest('/country/', null, true)

  if (!user) return <Redirect to="/" />
  if (error) return error
  if (loader) return loader

  const handleSubmit = () => {
    alert('Not functional - Work in progress')
  }

  return (
    <div>
      <h2>Profile settings (WORK IN PROGRESS)</h2>
      <form className="mb-10">
        <div className="block">
          Name: <input type="text" value={user.alias} />
        </div>
        <div className="block mt-4 mb-4">
          Country:{' '}
          <select value={user.countrycode as string}>
            {Object.keys(data).map((c: string) => (
              <option value={c}>{data[c]}</option>
            ))}
          </select>
        </div>
        <button className="bg-green-500 px-2 py-1" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default PlayerProfileSettings
