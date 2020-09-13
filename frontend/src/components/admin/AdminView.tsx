import Panel from 'components/general/Panel'
import Table from 'components/general/Table'
import useApiRequest from 'hooks/useApiRequest'
import React from 'react'
import ImageUploadMulti from './ImageUploadMulti'

const AdminView = () => {
  const { error, loader, data } = useApiRequest('/map/image/log', null, true)

  if (error) return <h1>Access denied</h1>
  if (loader) return loader

  return (
    <div>
      <h1>Admin</h1>
      <Panel header="Map images">
        <h2>Log</h2>
        <Table
          className="my-4"
          data={data}
          columns={[{ key: 'filename' }, { key: 'user_name', header: 'User' }, { key: 'updated_on', type: 'datetime', header: 'Date' }]}
          sort={{ key: 'updated_on', desc: true }}
        />

        <h2>Read these rules before uploading:</h2>
        <ul className="list-disc pl-6 my-4">
          <li>Filenames must be in the following format: prefix_mapname.jpg e.g. kz_beginnerblock_go.jpg</li>
          <li>Image resolution should be 1920x1080</li>
          <li>Screenshots must have no visible UI, weapons etc.</li>
          <li>Max filesize is 1MB, file limit is 16</li>
        </ul>
        <ImageUploadMulti />
      </Panel>
    </div>
  )
}

export default AdminView
