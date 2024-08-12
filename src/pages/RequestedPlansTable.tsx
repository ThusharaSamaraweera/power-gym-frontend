import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { REQUESTED_PLANS_DATA } from "../assets/data";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as trainerService from "../services/trainer.service";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { setRequestedPlans } from "../state/global/globalSlice";
import { IBodyHealthInfo } from "../models";
import { Table, TableColumnsType } from "antd";
import moment from "moment";

interface IRequestedPlanRow {
  key: string;
  name: string;
  createdAt: string;
}

const columns: TableColumnsType<IRequestedPlanRow> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Created at",
    dataIndex: "createdAt",
    key: "createdAt",
  },
];
const RequestedPlansTable = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.global.user);
  const dispatch = useAppDispatch();
  const [requestedPlanList, setRequestedPlanList] = useState<IRequestedPlanRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      if (!user) return;

      const res = await trainerService.getExercisePlanRequests(user?._id);
      const data: IRequestedPlanRow[] = res?.map((plan) => ({ name: plan?.memberId?.name, key: plan._id, createdAt: moment(plan.createdAt).format('LLL') }));

      dispatch(setRequestedPlans(res));
      setRequestedPlanList(data);
      setLoading(false);
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
          <Table
            columns={columns}
            dataSource={requestedPlanList}
            loading={loading}
            onRow={(record) => {
              return {
                onClick: () => handleOnClickRow(record.key),
              };
            }}></Table>
        
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestedPlansTable;
