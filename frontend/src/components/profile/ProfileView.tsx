import useApiRequest from 'components/util/useApiRequest'
import { UserContext } from 'context/UserContext'
import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'

interface Props {}

const ProfileView = () => {
  const userCtx = useContext(UserContext)
  const { error, isLoaded, data } = useApiRequest('api/countries/', {}, true)

  if (!userCtx?.user?.steamid64) return <Redirect to="/" />
  if (error?.message) return <div>Error: {error.message}</div>
  if (!isLoaded) return <div className="loader"></div>

  const handleSubmit = () => {}

  return (
    <div>
      <h1>{userCtx.user.alias}</h1>
      <form>
        Name: <input type="text" value={userCtx.user.alias} />
        Country:{' '}
        <select value={userCtx.user.countryCode}>
          {Object.keys(data).map((c: string) => (
            <option value={c}>{c}</option>
          ))}
        </select>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default ProfileView
