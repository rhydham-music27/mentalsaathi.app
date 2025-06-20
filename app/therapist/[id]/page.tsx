"use client"
import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'

export default function page() {
    const userId = useParams()
    const query = useSearchParams()
    const therapistId = query.get('t')
    console.log(therapistId)
  return (
    <div>page</div>
  )
}
