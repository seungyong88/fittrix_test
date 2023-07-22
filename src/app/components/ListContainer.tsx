'use client'
import React from 'react'
import useSWR from 'swr'

function ListContainer() {

  const { data, isLoading, error } = useSWR('/api/me');

  if(error) return <div>Failed to load</div>
  if(isLoading) return <div>Loading...</div>

  return (
    <div>{data}</div>
  )
}

export default ListContainer