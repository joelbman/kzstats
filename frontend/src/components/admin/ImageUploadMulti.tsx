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

  // if (error)
  //   return (
  //     <p>
  //       <b>Error:</b>
  //       Something went wrong :( If this happens again contact so0le
  //     </p>
  //   )

  // if (done)
  //   return (
  //     <p>
  //       Upload complete{' '}
  //       <span role="img" aria-label="ok_hand">
  //         👌
  //       </span>
  //     </p>
  //   )

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input type="file" multiple onChange={handleChange} />
      <button onClick={uploadFiles}>Go</button>
    </form>
  )
}

export default ImageUploadMulti
