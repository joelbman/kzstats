import React, { useState } from 'react'
import useApiRequest from '../util/useApiRequest'
import RecordBlock from './RecordBlock'
import InfiniteScroll from 'react-infinite-scroll-component'
import Record from '../../models/Record'
import Panel from '../general/Panel'

interface Props {
  top?: number
}

const LatestRecords = (props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [apiOptions, setApiOptions] = useState({
    limit: 200,
    place_top_at_least: props.top || 20,
    has_teleports: false,
  })
  const { error, isLoaded, data } = useApiRequest(
    '/records/top/recent',
    apiOptions
  )
  const [hasMore, setHasMore] = useState(true)
  const [items, setItems] = useState([])
  const [wrOnly, setWrOnly] = useState(true)

  const fetchData = () => {
    if (items.length >= 50) {
      setHasMore(false)
      return
    }
    setTimeout(() => {
      setItems(items.concat(data.slice(items.length, items.length + 10)))
    }, 800)
  }

  if (error && error.message) {
    return <div>Error: {error.message}</div>
  }
  if (!isLoaded) {
    return <div>Loading...</div>
  }

  const toggleWROnly = () => {
    setWrOnly(!wrOnly)
    if (wrOnly) {
      setItems(
        data
          .filter((record: Record) => {
            return record.place === 1
          })
          .slice(0, 10)
      )
    } else setItems(data.slice(0, 10))
  }

  if (data.length > 0 && items.length === 0) {
    data
      .sort((a: Record, b: Record) => {
        return (
          new Date(a.updated_on).getTime() - new Date(b.updated_on).getTime()
        )
      })
      .reverse()
    setItems(data.slice(0, 10))
  }

  const panelHeader = () => {
    return (
      <>
        New records
        <div className="float-right">
          <input type="checkbox" onChange={toggleWROnly} checked={wrOnly} /> WRs
          only
        </div>
      </>
    )
  }

  return (
    <Panel header={panelHeader}>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
        scrollThreshold={0.9}
      >
        {items.map((record: Record) => (
          <RecordBlock record={record} key={record.id} />
        ))}
      </InfiniteScroll>
    </Panel>
  )
}

export default LatestRecords
