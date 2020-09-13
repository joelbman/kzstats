import Axios from 'axios'
import React, { useState } from 'react'

const ImageUploadMulti = () => {
  const [files, setFiles] = useState<FileList | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [done, setDone] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files)
  }

  const uploadFiles = () => {
    if (!files) return

    const data = new FormData()
    for (let i = 0; i < files.length; i++) {
      data.append('map_images', files[i])
    }
    Axios.post('/api/map/image/', data)
      .then((a) => {
        setDone(true)
      })
      .catch((e) => setError(e))
  }

  if (error)
    return (
      <p className="text-red-500">
        <h3 className="text-2xl font-bold">Error:</h3>
        Something went wrong :(
        <br />
        If this happens again contact so0le
      </p>
    )

  if (done)
    return (
      <p className="text-green-500">
        Upload complete{' '}
        <span role="img" aria-label="ok_hand">
          👌
        </span>
      </p>
    )

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input className="w-full border-2 p-4 border-black mb-4 ml-0" type="file" multiple onChange={handleChange} />
      <button className="bg-green-600 rounded-lg py-1 px-2 block" onClick={uploadFiles}>
        Upload
      </button>
    </form>
  )
}

export default ImageUploadMulti
