import React, { useEffect } from "react";
import { useAppSelector } from "../state/hooks";
import { getProgressRecordsByUserId } from "../services/progrssRecord.service";

const Dashboard = () => {
  const user = useAppSelector((state) => state.global.user);
  const [progressRecordList, setProgressRecordList] = React.useState([]);

  useEffect(() => {
    async function getProgressRecords() {
      if (!user) throw new Error("User not found");
      const res = await getProgressRecordsByUserId(user?._id);
      console.log("🚀 ~ file: ProgressRecordsPage.tsx:44 ~ getProgressRecords ~ res:", res);
      setProgressRecordList(res);
    }

    getProgressRecords();
  }, [user]);
  
  return <div>Dashboard</div>;
};

export default Dashboard;
