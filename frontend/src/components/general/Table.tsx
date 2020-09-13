import { BronzeIcon, FlagIcon, SilverIcon, TrophyIcon } from 'components/icons'
import { runtimeFormat } from 'components/util/filters'
import React, { useEffect, useMemo, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'

interface TableColumn {
  key: string
  header?: string
  sortable?: boolean
  type?: string
}

interface Props {
  columns: TableColumn[]
  data: any[]
  sort: { key: string; desc: boolean }
  noHead?: boolean
  className?: string
  filters?: { key: string; value: string }[]
  itemsPerPage?: number
}

const Table = (props: Props) => {
  const [sortKey, setSortKey] = useState(props.sort.key)
  const [sortDesc, setSortDesc] = useState(props.sort.desc)
  const [filters, setFilters] = useState(props.filters)
  const [data, setData] = useState<any>([])
  const [currentData, setCurrentData] = useState<any>([])
  const [pageCount, setPageCount] = useState(0)
  const [offset, setOffset] = useState(0)

  const sortByColumn = (e: React.MouseEvent) => {
    const targetKey = (e.target as HTMLTableHeaderCellElement).dataset.key
    if (targetKey === sortKey) setSortDesc(!sortDesc)
    if (targetKey) setSortKey(targetKey)
  }

  useEffect(() => {
    let arr = props.data

    if (filters) {
      filters.forEach((f) => {
        if (!f.value || f.value === '') return

        //points filter
        if (f.key === 'points') {
          arr = arr.filter((obj: any) => {
            switch (f.value) {
              case 'gold':
                return obj.points === 1000
              case 'silver':
                return obj.points < 1000 && obj.points > 899
              case 'bronze':
                return obj.points < 900 && obj.points > 749
              case 'rest':
                return obj.points < 750
              default:
                return true
            }
          })
        } else if (f.key === 'teleports') {
          arr = arr.filter((obj: any) => {
            if (f.value === 'pro') return obj.teleports === 0
            if (f.value === 'tp') return obj.teleports > 0
            else return true
          })
        } else {
          arr = arr.filter((obj: any) => {
            if (!obj[f.key]) return false
            return obj[f.key].toLowerCase().includes(f.value.toLowerCase())
          })
        }
      })
    }

    arr = arr.sort((a: any, b: any) => {
      if (typeof a[sortKey] === 'string') return a[sortKey].localeCompare(b[sortKey])
      return a[sortKey] - b[sortKey]
    })
    if (sortDesc) arr.reverse()

    if (props.itemsPerPage && arr.length > props.itemsPerPage) {
      setPageCount(Math.ceil(arr.length / props.itemsPerPage))
      setCurrentData(arr.slice(offset, offset + props.itemsPerPage))
    } else {
      setCurrentData(arr.slice(0))
      setPageCount(1)
    }
    setData(arr)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data, sortKey, sortDesc, filters])

  useMemo(() => {
    setFilters(props.filters)
  }, [props.filters])

  const handlePageChange = (page: any) => {
    if (!props.itemsPerPage) return
    let off = Math.ceil(page.selected * props.itemsPerPage)
    if (data.length < 21) off = 0
    setCurrentData(data.slice(off, off + props.itemsPerPage))
    setOffset(off)
  }

  const renderSortArrow = () => {
    return <> {sortDesc ? String.fromCharCode(9660) : String.fromCharCode(9650)}</>
  }

  const renderCellContent = (obj: any, column: TableColumn) => {
    switch (column.type) {
      case 'datetime':
        if (obj[column.key].slice(0, 4) === '9999') return 'Never'
        return obj[column.key].replace('T', ' ')

      case 'player':
        let playerName = obj[column.key]
        if (!playerName || playerName.length === 0) playerName = '<unknown>'
        if (obj.countrycode)
          return (
            <Link to={`/players/${obj.steamid64}`}>
              {playerName} <FlagIcon code={obj.countrycode} />
            </Link>
          )
        return <Link to={`/players/${obj.steamid64}`}>{playerName}</Link>

      case 'map':
        let mapName = obj[column.key]
        if (!mapName) mapName = '<unknown>'
        return <Link to={`/maps/${obj[column.key]}`}>{mapName}</Link>

      case 'runtime':
        if (obj.points === 1000) return <b className="text-red-500">{runtimeFormat(obj[column.key])}</b>
        return runtimeFormat(obj[column.key])

      case 'points':
        return obj.points === 1000 ? (
          <TrophyIcon width="25" height="25" />
        ) : (
          <>
            {obj.points}
            {obj.points > 899 && <SilverIcon />}
            {obj.points > 749 && obj.points < 900 && <BronzeIcon />}
          </>
        )

      case 'server':
        let serverName = obj[column.key]
        if (!serverName) serverName = '<unknown>'
        return <Link to={`/servers/${obj.server_id}`}>{serverName}</Link>

      default:
        return obj[column.key]
    }
  }

  return (
    <div className={`overflow-x-auto overflow-y-hidden w-full`}>
      <table className={`w-full ${props.className}`}>
        {!props.noHead && (
          <thead>
            <tr>
              {props.columns.map((c: TableColumn, i: number) => (
                <th key={i} data-key={c.key} onClick={sortByColumn}>
                  {c.header ? c.header : c.key.charAt(0).toUpperCase() + c.key.slice(1)}

                  {sortKey === c.key && renderSortArrow()}
                </th>
              ))}
            </tr>
          </thead>
        )}

        <tbody>
          {currentData.map((obj: any, i: number) => (
            <tr key={i}>
              {props.columns.map((c: TableColumn) => (
                <td key={c.key}>{renderCellContent(obj, c)}</td>
              ))}
            </tr>
          ))}
          {currentData.length === 0 && (
            <tr>
              <td>No data available.</td>
            </tr>
          )}
        </tbody>
      </table>

      {pageCount > 1 && (
        <div className="flex justify-center">
          <ReactPaginate
            previousLabel={'«'}
            nextLabel={'»'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageChange}
            containerClassName={'pagination-container'}
            activeClassName={'pagination-active'}
          />
        </div>
      )}
    </div>
  )
}

export default Table
