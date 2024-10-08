import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import userService from "../services/user.service";
import { IProgressRecord, UserRoles } from "../models";
import { Table, TableColumnsType, Tag } from "antd";
import Column from "antd/es/table/Column";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { setAllUsers } from "../state/global/globalSlice";
import { useNavigate } from "react-router-dom";
import UserChart from "../components/organisms/UserChart";

interface IUserRow {
  key: string;
  name: string;
  phone: string;
  trainer?: string;
  userType: string;
}

const columns: TableColumnsType<IUserRow> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Trainer",
    dataIndex: "trainer",
    key: "trainer",
    filters: [
      {
        text: "Assigned",
        value: 1,
      },
      {
        text: "Not Assigned",
        value: 0
      }
    ],
    onFilter: (value, record) => value === 1 ? !!record.trainer : !record.trainer,
  },
  {
    title: "User Type",
    dataIndex: "userType",
    key: "userType",
    render: (tag: string) => (
      <>
        <Tag key={tag}>{tag.toUpperCase()}</Tag>
      </>
    ),
  },
];

const AllUsers = () => {
  const user = useAppSelector((state) => state.global.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const [userList, setUserList] = React.useState<IUserRow[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [progressRecordList, setProgressRecordList] = React.useState<IProgressRecord[]>([])

  useEffect(() => {
    async function getUsers() {
      setLoading(true)
      let trainerId;
      if (user?.role === UserRoles.TRAINER) trainerId = user?._id;

      const res = await userService.getUserWithBodyHealthInfo(trainerId);
      console.log("🚀 ~ file: AllUsers.tsx:15 ~ getUsers ~ res:", res);
      setUserList(
        res?.map((user) => ({
          key: user._id,
          name: user.name,
          phone: user.phone || "",
          trainer: user.trainerId?.name || "",
          userType: user.role,
        }))
      );
      setLoading(false)
      setProgressRecordList(res)
      dispatch(setAllUsers(res));
    }
    getUsers();
  }, [user]);

  const handleOnClickRow = (record: IUserRow) => {
    navigate('/all-users/' + record.key)
  };

  return (
    <div>
      <Card x-chunk='dashboard-06-chunk-0'>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          {/* <div className="flex flex-col"> */}

          {/* <UserChart progressRecordList={progressRecordList} /> */}
          <Table
          loading={loading}
            dataSource={userList}
            onRow={(record) => {
              return {
                onClick: () => handleOnClickRow(record),
              };
            }}
            columns={columns}
            >
          </Table>
          {/* </div> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default AllUsers;
