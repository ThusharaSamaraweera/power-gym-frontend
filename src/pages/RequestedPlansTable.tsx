import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { REQUESTED_PLANS_DATA } from "../assets/data";

const RequestedPlansTable = () => {
  const handleOnClickRow = (planId: number) => {};

  return (
    <div>
      <Card x-chunk='dashboard-06-chunk-0'>
        <CardHeader>
          <CardTitle>Requested Plans</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='hidden w-[100px] sm:table-cell'>
                  <span className='sr-only'>Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Created at</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {REQUESTED_PLANS_DATA.map((plan) => (
                <TableRow className='cursor-pointer' onClick={() => handleOnClickRow(plan?.id)}>
                  <TableCell className='hidden sm:table-cell'></TableCell>
                  <TableCell className='font-medium'>{plan?.name}</TableCell>
                  <TableCell className='hidden md:table-cell'>{plan?.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestedPlansTable;
