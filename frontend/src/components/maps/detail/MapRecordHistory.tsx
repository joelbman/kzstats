import React, { useState, useMemo, useContext, useEffect } from 'react'
import useApiRequest from '../../util/useApiRequest'
import Record from '../../../models/Record'
import ReactApexChart from 'react-apexcharts'
import { ModeContext } from '../../../context/ModeContext'

interface Props {
  mapname: string
}
interface ChartObj {
  name: string
  data: any[]
}

const MapRecordHistory = ({ mapname }: Props) => {
  const { modeContextState: ctx } = useContext(ModeContext)
  const [apiOptions, setApiOptions] = useState({
    map_name: mapname,
    stage: 0,
    place_top_at_least: 1,
    modes_list_string: ctx.kzMode,
    tickrates: ctx.tickrate,
    has_teleports: false,
  })
  const { error, isLoaded, data } = useApiRequest(
    '/records/top/recent',
    apiOptions
  )
  const [series, setSeries] = useState<ChartObj[]>([])
  const graphOptions = {
    colors: ['#F44336'],
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      background: '#1a202c',
      foreColor: '#fff',
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 3,
    },
    title: {
      text: 'History for ' + mapname,
      align: 'left',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.8,
        stops: [80, 90, 100],
      },
    },
    yaxis: {
      labels: {
        formatter: function (val: number) {
          return new Date(val * 1000).toISOString().split('T')[1].split('.')[0]
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
        formatter: function (val: number) {
          return new Date(val * 1000)
            .toISOString()
            .split('T')[1]
            .replace('Z', '')
        },
      },
    },
  }

  useEffect(() => {
    const chartData = data
      .map((r: Record) => {
        return { x: r.updated_on, y: r.time }
      })
      .sort((a: any, b: any) => {
        return a.y - b.y
      })

    setSeries([{ name: 'Runtime', data: chartData }])
  }, [data])

  useMemo(() => {
    setApiOptions({
      map_name: mapname,
      stage: 0,
      place_top_at_least: 1,
      modes_list_string: ctx.kzMode,
      tickrates: ctx.tickrate,
      has_teleports: false,
    })
  }, [ctx.tickrate, ctx.kzMode, mapname])

  if (error) return <div>Error: {error.message}</div>
  if (!isLoaded) return <div className="loader"></div>
  return (
    <div>
      {data.length > 0 ? (
        <ReactApexChart
          options={graphOptions}
          series={series}
          type="line"
          height={350}
        />
      ) : (
        <div className="text-xl">No data available</div>
      )}
    </div>
  )
}

export default MapRecordHistory
