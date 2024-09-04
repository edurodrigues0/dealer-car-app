import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Vehicle = {
  Make_ID: number
  Make_Name: string
  Model_ID: number
  Model_Name: string
}

type VehiclesTableProps = {
  data: Vehicle[]
  year: string
}

export function VehiclesTable({ data, year }: VehiclesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="max-sm:text-xs">
          <TableHead>Make Name</TableHead>
          <TableHead>Model Name</TableHead>
          <TableHead>Model ID</TableHead>
          <TableHead>Year</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((vehicle) => (
          <TableRow className="max-sm:text-xs" key={vehicle.Model_ID}>
            <TableCell>{vehicle.Make_Name}</TableCell>
            <TableCell>{vehicle.Model_Name}</TableCell>
            <TableCell>{vehicle.Model_ID}</TableCell>
            <TableCell>{year}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
