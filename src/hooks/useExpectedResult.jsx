import React from 'react'
import useExpResultApi from './useExpResultApi'

const useExpectedResult = (props, apiFirst) => {
  const { child } = props
  const { data, isLoading, refetch, isFetching } = useExpResultApi(child === "Polling Unit" && 'pu' || child === "National" && "country" || child.toLowerCase(), apiFirst)

  return {menuSelected : child, data, isLoading, isFetching, refetch }
}

export default useExpectedResult