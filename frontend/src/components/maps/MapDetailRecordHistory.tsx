import React, { useState, useEffect, useMemo } from 'react'
import useApiRequest from '../util/useApiRequest'
// import { VictoryChart, VictoryLine, VictoryAxis } from 'victory'
import Record from '../../models/Record'
import ReactApexChart from 'react-apexcharts'

interface Props {
  mapname: string
}
interface ChartObj {
  name: string
  data: any[]
}

const MapDetailRecordHistory = ({ mapname }: Props) => {
  const [apiOptions, setApiOptions] = useState({
    map_name: mapname,
    stage: 0,
    place_top_at_least: 1,
    modes_list_string: 200,
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
      background: '#3d3d3d',
      foreColor: '#fff',
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 5,
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

  useMemo(() => {
    const chartData = data.map((r: Record) => {
      return { x: r.updated_on, y: r.time }
    })

    setSeries([{ name: 'Runtime', data: chartData }])
  }, [data])

  if (error) return <div>Error: {error.message}</div>
  if (!isLoaded) return <div className="loader"></div>
  return (
    <div>
      <ReactApexChart
        options={graphOptions}
        series={series}
        type="line"
        height={350}
      />
    </div>
  )
}

export default MapDetailRecordHistory
