import Panel from 'components/general/Panel'
import useApiRequest from 'hooks/useApiRequest'
import React from 'react'

const NewsPanel = () => {
  const { error, loader, data } = useApiRequest('/news', null, true)

  if (loader) return loader
  if (error) return error

  return (
    <Panel header={'News (from Discord)'}>
      {data.length === 0 && (
        <p>There was a problem retrieving the announcement list.</p>
      )}
      {data.map((newspost: { message: string; footer: string }, i: number) => (
        <div className="news-block" key={i}>
          <div className="text-xl font-bold">{newspost.footer}:</div>
          <div
            dangerouslySetInnerHTML={{
              __html: newspost.message,
            }}
          ></div>
        </div>
      ))}
    </Panel>
  )
}

export default NewsPanel
