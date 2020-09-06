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
    apiOptions
  )
  const [series, setSeries] = useState<ChartObj[]>([])
  const [bugged, setBugged] = useState(false)

  const graphOptions = {
    colors: ['#F44336'],
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor:
        localStorage.getItem('kzTheme') === 'dark' ? '#fff' : '#3d3d3d',
      background:
        localStorage.getItem('kzTheme') === 'dark' ? '#1a202c' : '#fff',
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 7,
    },
    title: {
      text: `WR history for ${mapname} (PRO)`,
      align: 'left',
    },

    yaxis: {
      labels: {
        formatter: function (val: number) {
          return runtimeFormat(val)
        },
        style: { cssClass: 'chart-text' },
      },
      title: {
        text: 'Runtime',
        style: { cssClass: 'chart-text' },
      },
    },
    xaxis: {
      type: 'datetime',
      labels: { style: { cssClass: 'chart-text' } },
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

  if (error) return error
  if (loader) return loader

  return (
    <div>
      <h2>Statistics</h2>
      {data.length > 0 && !bugged ? (
        <ReactApexChart
          options={graphOptions}
          series={series}
          type="line"
          height={350}
        />
      ) : (
        <div>No data available</div>
      )}
    </div>
  )
}

export default MapRecordHistory
