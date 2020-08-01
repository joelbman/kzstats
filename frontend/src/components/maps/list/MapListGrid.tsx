import React, { useState, useMemo } from 'react'
import MapListCard from './MapListCard'
import Map from '../../../models/Map'
import InfiniteScroll from 'react-infinite-scroll-component'

interface Props {
  maps: Map[]
}

const MapListGrid = (props: Props) => {
  const [items, setItems] = useState<Map[]>([])

  const fetchMore = () => {
    setItems(items.concat(props.maps.slice(items.length, items.length + 12)))
  }

  useMemo(() => {
    setItems(props.maps.slice(0, 12))
  }, [props.maps])

  return (
    <div>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMore}
        hasMore={items.length < props.maps.length}
        loader={<div className="loader"></div>}
        scrollThreshold={0.9}
        className="inline-block"
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4">
          {items.map((map: Map) => (
            <MapListCard map={map} key={map.id} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default MapListGrid
