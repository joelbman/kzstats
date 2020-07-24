import React from 'react'
import Helmet from 'react-helmet'

interface Props {
  title: string
}

const DynamicPageHeader = ({ title }: Props) => {
  return <h1 className="font-bold text-size-xl5">{title}</h1>
}

export default DynamicPageHeader
