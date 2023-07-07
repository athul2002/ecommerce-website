import React from 'react'
import { Helmet,HelmetProvider } from 'react-helmet-async'
// import {  } from '';
const MetaData = ({title}) => {
  return (
    <HelmetProvider>
      <div>
      <Helmet>
      <title>{title}</title>
    </Helmet>
      </div>
    </HelmetProvider>
  )
}

export default MetaData
