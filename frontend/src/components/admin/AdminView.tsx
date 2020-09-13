import Panel from 'components/general/Panel'
import useApiRequest from 'hooks/useApiRequest'
import React from 'react'
import ImageUploadMulti from './ImageUploadMulti'

interface Props {}

const AdminView = () => {
  const { error, loader, data } = useApiRequest('/auth/profile/', null, true)

  if (error || data.admin !== true) return <h1>Access denied</h1>
  if (loader) return loader

  return (
    <div>
      <h1>Admin</h1>
      <Panel header="Map images">
        <ImageUploadMulti />
      </Panel>
    </div>
  )
}

export default AdminView
