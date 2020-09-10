import Table from 'components/general/Table'
import { runtimeFormat } from 'components/util/filters'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { ModeContext } from '../../../context/ModeContext'
import useApiRequest from '../../../hooks/useApiRequest'
import KZRecord from '../../../models/KZRecord'

interface Props {
  mapname: string
}
interface ChartObj {
  name: string
  data: any[]
}

const MapRecordHistory = ({ mapname }: Props) => {
  const { state: modeState } = useContext(ModeContext)
  const [runtype, setRuntype] = useState('PRO')
  const [apiOptions, setApiOptions] = useState({
    map_name: mapname,
    stage: 0,
    place_top_at_least: 1,
    modes_list_string: modeState.kzMode,
    tickrate: modeState.tickrate,
    has_teleports: false,
  })
  const { error, loader, data } = useApiRequest(
    '/records/top/recent',
    apiOptions,
    false,
    true
  )
  const [series, setSeries] = useState<ChartObj[]>([])
  const [bugged, setBugged] = useState(false)

  const graphOptions = {
    colors: ['#F44336'],
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      toolbar: { show: true },
      zoom: { enabled: true },
      foreColor:
        localStorage.getItem('kzTheme') === 'dark' ? '#fff' : '#3d3d3d',
      background:
        localStorage.getItem('kzTheme') === 'dark' ? '#1a202c' : '#fff',
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 3,
      offsetY: 0,
      offsetX: 0,
      hover: {
        sizeOffset: 2,
      },
    },
    title: {
      text: `WR history for ${mapname} (${runtype})`,
      align: 'left',
    },

    yaxis: {
      labels: {
        formatter: function (val: number) {
          return runtimeFormat(val)
        },
      },
      title: {
        text: 'Runtime',
      },
    },
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      theme: 'dark',
      shared: false,
      y: {
        formatter: (val: number) => {
          return new Date(val * 1000)
            .toISOString()
            .split('T')[1]
            .replace('Z', '')
        },
      },

      z: {
        formatter: undefined,
        title: 'Player: ',
      },
    },
  }

  useEffect(() => {
    const chartData = data
      .map((r: KZRecord) => {
        if (r.map_name !== mapname) setBugged(true)
        return { x: r.updated_on, y: r.time, z: r.player_name }
      })
      .sort((a: any, b: any) => {
        return a.y - b.y
      })

    setSeries([{ name: 'Runtime', data: chartData }])
  }, [data, mapname])

  useMemo(() => {
    setApiOptions({
      ...apiOptions,
      map_name: mapname,
      modes_list_string: modeState.kzMode,
      tickrate: modeState.tickrate,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modeState.tickrate, modeState.kzMode, mapname])

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRuntype(e.target.value)
    setApiOptions({ ...apiOptions, has_teleports: e.target.value === 'TP' })
  }

  if (error) return error
  if (loader) return loader

  return (
    <div>
      <h2 className="mb-4">Record history</h2>
      Runtype
      <select onChange={handleSelect} className="ml-2">
        <option value="PRO">PRO</option>
        <option value="TP">TP</option>
      </select>
      {data.length > 0 && !bugged ? (
        <div className="mt-4">
          <ReactApexChart
            options={graphOptions}
            series={series}
            type="line"
            height={350}
          />

          <Table
            className="mt-8"
            data={data}
            columns={[
              { key: 'player_name', type: 'player', header: 'Player' },
              { key: 'time', type: 'runtime' },
              { key: 'teleports', header: 'TPs' },
              { key: 'updated_on', type: 'datetime', header: 'Date' },
              { key: 'server_name', type: 'server', header: 'Server' },
            ]}
            sort={{ key: 'time', desc: false }}
          />
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  )
}

export default MapRecordHistory
