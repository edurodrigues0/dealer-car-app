'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

import { api } from '@/lib/api'
import { VehiclesTable } from '@/components/VehiclesTable'

type Vehicle = {
  Make_ID: number
  Make_Name: string
  Model_ID: number
  Model_Name: string
}

type ParamsProps = {
  makeId: string
  year: string
}

export async function generateStaticParams() {
  return [
    { makeId: '441', year: '2024' },
    { makeId: '440', year: '2020' },
  ]
}

function VehiclesList({ makeId, year }: ParamsProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])

  useEffect(() => {
    api
      .get(
        `/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`,
      )
      .then((response) => setVehicles(response.data.Results))
  }, [makeId, year])

  return (
    <div className="mt-8 overflow-auto">
      <VehiclesTable data={vehicles} year={year} />
    </div>
  )
}

export default function ResultPage() {
  const params = useParams<ParamsProps>()

  if (!params?.makeId || !params?.year) {
    return <p>Loading...</p>
  }

  return (
    <div className="w-screen h-screen p-4">
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight max-sm:text-lg">
          Car Dealer App
        </h1>

        <Link className="hover:underline" href="/">
          Back
        </Link>

        <Suspense fallback={<p>Loading vehicles...</p>}>
          <VehiclesList makeId={params.makeId} year={params.year} />
        </Suspense>
      </div>
    </div>
  )
}
