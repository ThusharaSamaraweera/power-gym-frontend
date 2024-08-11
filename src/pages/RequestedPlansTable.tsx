import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { REQUESTED_PLANS_DATA } from "../assets/data";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as trainerService from "../services/trainer.service";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { setRequestedPlans } from "../state/global/globalSlice";
import { IBodyHealthInfo } from "../models";

const RequestedPlansTable = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.global.user);
  const dispatch = useAppDispatch();
  const [requestedPlanList, setRequestedPlanList] = useState<IBodyHealthInfo[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;

      const res = await trainerService.getExercisePlanRequests(user?._id);
      dispatch(setRequestedPlans(res));
      setRequestedPlanList(res);
      console.log("🚀 ~ file: RequestedPlansTable.tsx:19 ~ fetchData ~ res:", res);
    }

    fetchData();
  }, [user]);

  const handleOnClickRow = (planId: string) => {
    navigate(`/requested-plans/${planId}`);
  };

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
              {requestedPlanList?.map((plan, i) => (
                <TableRow key={i} className='cursor-pointer' onClick={() => handleOnClickRow(plan?._id)}>
                  <TableCell className='hidden sm:table-cell'></TableCell>
                  <TableCell className='font-medium'>{plan?.memberId?.name}</TableCell>
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
