import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../state/hooks";
import { IUser, IUserWithBodyHealthInfo, UserRoles } from "../models";
import { Form, Input } from "antd";
import AntdSelect from "../components/ui/AntdSelect";
import userService from "../services/user.service";
import ProgressRecordTable from "../components/organisms/ProgressRecordTable";
import { ScrollArea } from "../components/ui/scroll-area";

const UserPage = () => {
  const { userId } = useParams();
  const allUser = useAppSelector((state) => state.global.allUsers);
  const [user, setUser] = useState<IUserWithBodyHealthInfo | null | undefined>(null);
  const [trainerList, setTrainerList] = useState<IUser[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<any>();

  useEffect(() => {
    async function getData() {
      const res = await userService.getUsers([UserRoles.TRAINER]);
      setTrainerList(res);
    }

    getData();
    if (allUser) {
      const user = allUser.find((user) => {
        console.log("🚀 ~ file: UserPage.tsx:23 ~ useEffect ~ user:", user);
        return user._id === userId;
      });
      setSelectedTrainer({ label: user?.trainerId?.name || "", value: user?.trainerId?._id });
      setUser(user);
    }
  }, [userId, allUser]);

  return (
    <div className='flex flex-col gap-5 h-screen'>
      <ScrollArea className='h-5/6 w-100 rounded-md px-2'>
        <div>
          <div className='font-semibold text-lg mb-3'>User Details</div>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  w-full items-center gap-4'>
            <Form.Item label='Name'>
              <Input value={user?.name} disabled />
            </Form.Item>
            <Form.Item label='Phone'>
              <Input value={user?.phone} disabled />
            </Form.Item>
            <Form.Item label='User type'>
              <Input value={user?.role} disabled />
            </Form.Item>
            <Form.Item label='Email'>
              <Input value={user?.email} disabled />
            </Form.Item>
            <Form.Item label='Trainer'>
              <AntdSelect
                options={trainerList.map((user) => {
                  return { value: user?._id, label: user?.name };
                })}
                value={selectedTrainer}
                onChange={(value) => setSelectedTrainer(value)}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <div className='font-semibold text-lg mb-3'>All Progress Records</div>
          <ProgressRecordTable records={user?.progressRecords || []} />
        </div>
      </ScrollArea>
    </div>
  );
};

export default UserPage;
