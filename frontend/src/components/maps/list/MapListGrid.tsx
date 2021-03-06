import React, { useMemo, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { KZMap } from 'types'
import MapListCard from './MapListCard'

interface Props {
  maps: KZMap[]
}

const MapListGrid = (props: Props) => {
  const [items, setItems] = useState<KZMap[]>([])

  const fetchMore = () => {
    setItems(items.concat(props.maps.slice(items.length, items.length + 12)))
  }

  useMemo(() => {
    setItems(props.maps.slice(0, 12))
  }, [props.maps])

  return (
    <div>
      {items.length < 1 && <p>No maps found. Try different filters.</p>}
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMore}
        hasMore={items.length < props.maps.length}
        loader={<div className="loader"></div>}
        scrollThreshold={0.9}
        className="inline-block"
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4 w-full pr-2">
          {items.map((map: KZMap) => (
            <MapListCard map={map} key={map.id} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default MapListGrid
