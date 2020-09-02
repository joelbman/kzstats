import { useEffect } from 'react'

const useScript = (url: string, dataset?: { key: string; value: string }) => {
  useEffect(() => {
    const script = document.createElement('script')

    script.src = url
    script.async = true

    if (dataset) script.dataset[dataset.key] = dataset.value

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [url, dataset])
}

export default useScript
