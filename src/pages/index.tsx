import Link from 'next/link'
import { useEffect, useState } from 'react'

import { api } from '@/lib/api'
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select'

type Selector = {
  MakeId: string
  MakeName: string
}

const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]

export default function Home() {
  const [selectors, setSelectors] = useState<Selector[]>([])
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>('')
  const [selectedModelYear, setSelectedModelYear] = useState<string>('')

  useEffect(() => {
    api
      .get('GetMakesForVehicleType/car?format=json')
      .then((result) => setSelectors(result.data.Results))
  }, [])

  const isSearchEnabled = selectedVehicleType !== '' && selectedModelYear !== ''

  return (
    <div className="w-screen h-screen p-4">
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight max-sm:text-lg">
          Car Dealer App
        </h1>

        <ShadcnSelect onValueChange={(value) => setSelectedVehicleType(value)}>
          <SelectTrigger className="w-60 max-sm:w-40">
            <SelectValue placeholder="Select vehicle type" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {selectors.map((selector) => {
                return (
                  <SelectItem key={selector.MakeId} value={selector.MakeId}>
                    {selector.MakeName}
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </ShadcnSelect>

        <ShadcnSelect onValueChange={(value) => setSelectedModelYear(value)}>
          <SelectTrigger className="w-60 max-sm:w-40">
            <SelectValue placeholder="Select vehicle type" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {years.map((year) => {
                return (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </ShadcnSelect>

        <div className="w-60 flex max-sm:w-40 rounded-sm focus-within:ring-2 focus-within:ring-green-100">
          <Link
            data-search={isSearchEnabled}
            className="w-full py-1 flex items-center justify-center rounded-sm bg-green-500 text-slate-900 transition-colors hover:bg-green-600 data-[search=false]:cursor-not-allowed data-[search=false]:bg-green-500/70 data-[search=false]:pointer-events-none"
            href={`/result/${selectedVehicleType}/${selectedModelYear}`}
          >
            NEXT
          </Link>
        </div>
      </div>
    </div>
    // <div className="max-w-[1440px] h-screen mx-auto bg-slate-800 text-slate-100">
    //   <main className="p-5">
    //     <div className="flex flex-col gap-3">
    //       <h1 className="text-2xl text-slate-100 font-bold tracking-tight">
    //         Car Dealer App
    //       </h1>
    //       <span className="text-slate-300 text-lg">
    //         Explore our wide selection of vehicles by type and model year
    //       </span>
    //     </div>

    //     <div className="flex items-end gap-6">
    //       <div className="flex flex-col items-start gap-1">
    //         <label htmlFor="vehicle-type">Vehicle Type</label>
    //         <ShadcnSelect onValueChange={(value) => setSelectedVehicleType(value)}>
    //           <SelectTrigger>
    //             <SelectValue placeholder="Select vehicle type" />
    //           </SelectTrigger>

    //           <SelectContent>
    //             <SelectGroup>
    //               {selectors.map((selector) => {
    //                 return (
    //                   <SelectItem key={selector.MakeId} value={selector.MakeId}>
    //                     {selector.MakeName}
    //                   </SelectItem>
    //                 )
    //               })}
    //             </SelectGroup>
    //           </SelectContent>
    //         </ShadcnSelect>
    //       </div>

    //       <div className="flex flex-col items-start gap-1">
    //         <label htmlFor="model-year">Select model year</label>
    //         <ShadcnSelect onValueChange={(value) => setSelectedModelYear(value.toString())}>
    //           <SelectTrigger>
    //             <SelectValue placeholder="Select vehicle type" />
    //           </SelectTrigger>

    //           <SelectContent>
    //             <SelectGroup>
    //               {years.map((year) => {
    //                 return (
    //                   <SelectItem key={year} value={year.toString()}>
    //                     {year}
    //                   </SelectItem>
    //                 )
    //               })}
    //             </SelectGroup>
    //           </SelectContent>
    //         </ShadcnSelect>
    //       </div>

    //       <Link
    //         href={`/result/${selectedVehicleType}/${selectedModelYear}`}
    //         data-search={isSearchEnabled}
    //         className="py-2 px-4 bg-zinc-600 rounded-lg transition-colors hover:bg-zinc-500 data-[search=false]:cursor-not-allowed data-[search=false]:bg-zinc-500/70 data-[search=false]:pointer-events-none"
    //       >
    //         NEXT
    //       </Link>
    //     </div>
    //   </main>
    // </div>
  )
}
