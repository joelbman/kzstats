import { FlagIcon, TrophyIcon } from 'components/icons'
import { runtimeFormat, textLimiter } from 'components/util/filters'
import React, { useEffect, useState } from 'react'
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
  filters?: { key: string; value: string | number }
  itemsPerPage?: number
}

const Table = (props: Props) => {
  const [sortKey, setSortKey] = useState(props.sort.key)
  const [sortDesc, setSortDesc] = useState(props.sort.desc)
  const [data, setData] = useState<any>([])
  const [currentData, setCurrentData] = useState<any>([])
  const [pageCount, setPageCount] = useState(0)

  const sortByColumn = (e: React.MouseEvent) => {
    const targetKey = (e.target as HTMLTableHeaderCellElement).dataset.key
    if (targetKey === sortKey) setSortDesc(!sortDesc)
    if (targetKey) setSortKey(targetKey)
  }

  useEffect(() => {
    const arr = props.data
    const sorted = arr.sort((a: any, b: any) => {
      if (sortKey === 'updated_on')
        return new Date(a[sortKey]).getTime() - new Date(b[sortKey]).getTime()
      if (typeof a[sortKey] === 'string')
        return a[sortKey].localeCompare(b[sortKey])
      return a[sortKey] - b[sortKey]
    })
    if (sortDesc) sorted.reverse()
    setData(sorted)

    if (props.itemsPerPage && sorted.length > props.itemsPerPage) {
      setPageCount(Math.ceil(sorted.length / props.itemsPerPage))
      setCurrentData(sorted.slice(0, props.itemsPerPage))
    } else setCurrentData(sorted)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data, sortKey, sortDesc])

  const handlePageChange = (page: any) => {
    if (!props.itemsPerPage) return
    let offset = Math.ceil(page.selected * props.itemsPerPage)
    if (data.length < 21) offset = 0
    setCurrentData(data.slice(offset, offset + props.itemsPerPage))
  }

  const renderSortArrow = () => {
    return (
      <> {sortDesc ? String.fromCharCode(9660) : String.fromCharCode(9650)}</>
    )
  }

  const renderCellContent = (obj: any, column: TableColumn) => {
    switch (column.type) {
      case 'datetime':
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
        return <Link to={`/maps/${obj[column.key]}`}>{obj[column.key]}</Link>
      case 'runtime':
        if (obj.points === 1000)
          return (
            <b className="text-red-500">{runtimeFormat(obj[column.key])}</b>
          )
        return runtimeFormat(obj[column.key])
      case 'points':
        return obj.points === 1000 ? <TrophyIcon /> : obj.points
      case 'server':
        let serverName = obj[column.key]
        if (!serverName) serverName = '<unknown>'
        return (
          <Link to={`/servers/${obj.server_id}`}>
            {textLimiter(serverName)}
          </Link>
        )
      default:
        return obj[column.key]
    }
  }

  return (
    <div className={`overflow-x-auto w-full`}>
      <table className={`w-full ${props.className}`}>
        {!props.noHead && (
          <thead>
            <tr>
              {props.columns.map((c: TableColumn, i: number) => (
                <th key={i} data-key={c.key} onClick={sortByColumn}>
                  {c.header
                    ? c.header
                    : c.key.charAt(0).toUpperCase() + c.key.slice(1)}

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
