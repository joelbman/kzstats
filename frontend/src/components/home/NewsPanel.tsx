import Panel from 'components/general/Panel'
import useApiRequest from 'hooks/useApiRequest'
import React from 'react'

const NewsPanel = () => {
  const { error, loader, data } = useApiRequest('/news', null, true)

  if (loader) return loader
  if (error) return error

  const renderHeader = () => {
    return (
      <>
        News
        <span className="ml-2 text-sm float-right">
          via
          <a href="https://discord.gg/csgokz" target="_blank" rel="noopener noreferrer">
            <img className="inline-block ml-2" src="/img/icon/discord.svg" width="100" height="40" alt="Discord" />
          </a>
        </span>
      </>
    )
  }

  return (
    <Panel header={renderHeader()}>
      {data.length === 0 && <p>There was a problem retrieving the announcement list.</p>}
      {data.map((newspost: { message: string; footer: string }, i: number) => (
        <div className="news-block" key={i}>
          <div className="text-xl font-bold">{newspost.footer}:</div>
          <div
            className="news-post"
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
