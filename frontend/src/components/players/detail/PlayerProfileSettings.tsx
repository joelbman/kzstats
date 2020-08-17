import useApiRequest from 'components/util/useApiRequest'
import { UserContext } from 'context/UserContext'
import User from 'models/User'
import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'

interface Props {
  user: User
}

const PlayerProfileSettings = (props: Props) => {
  const userCtx = useContext(UserContext)
  const user = userCtx?.user
  const { error, isLoaded, data } = useApiRequest('api/country/', null, true)

  if (!user) return <Redirect to="/" />
  if (error?.message) return <div>Error: {error.message}</div>
  if (!isLoaded) return <div className="loader"></div>

  const handleSubmit = () => {}

  return (
    <div>
      <h2>Profile settings</h2>
      <form>
        <div className="block">
          Name: <input type="text" value={user.alias} />
        </div>
        <div className="block">
          Country:{' '}
          <select value={user.countryCode}>
            {Object.keys(data).map((c: string) => (
              <option value={c}>{data[c]}</option>
            ))}
          </select>
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default PlayerProfileSettings
