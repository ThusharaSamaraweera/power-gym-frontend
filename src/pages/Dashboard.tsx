import React, { useEffect } from "react";
import { useAppSelector } from "../state/hooks";
import { getProgressRecordsByUserId } from "../services/progrssRecord.service";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from "chart.js";

// Register the necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

const Dashboard = () => {
  const user = useAppSelector((state) => state.global.user);
  const [progressRecordList, setProgressRecordList] = React.useState([]);

  useEffect(() => {
    async function getProgressRecords() {
      if (!user) throw new Error("User not found");
      const res = await getProgressRecordsByUserId(user?._id);
      console.log("🚀 ~ file: Dashboard.tsx:44 ~ getProgressRecords ~ res:", res);
      setProgressRecordList(res);
    }

    getProgressRecords();
  }, [user]);

  const anthropometricData = {
    labels: progressRecordList.map((record, index) => `Record ${index + 1}`),
    datasets: [
      {
        label: "Weight",
        data: progressRecordList.map((record) => record?.progressRecord?.anthropometricMeasurements?.weight),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Height",
        data: progressRecordList.map((record) => record?.progressRecord?.anthropometricMeasurements?.height),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const bodyCompositionData = {
    labels: progressRecordList.map((record, index) => `Record ${index + 1}`),
    datasets: [
      {
        label: "Body Fat Percentage",
        data: progressRecordList.map((record) => record?.progressRecord?.bodyComposition?.bodyFatPercentage),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "BMI",
        data: progressRecordList.map((record) => record?.progressRecord?.bodyComposition?.bodyMassIndex),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const cardiovascularFitnessData = {
    labels: progressRecordList.map((record, index) => `Record ${index + 1}`),
    datasets: [
      {
        label: "Maximum Weight Lifted",
        data: progressRecordList.map((record) => record?.progressRecord?.cardiovascularFitness?.maximumWeightLifted),
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
      {
        label: "One Rep Max",
        data: progressRecordList.map((record) => record?.progressRecord?.cardiovascularFitness?.oneRepMax),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const repsData = {
    labels: progressRecordList.map((record, index) => `Record ${index + 1}`),
    datasets: [
      {
        label: "Reps",
        data: progressRecordList.map((record) => record?.progressRecord?.cardiovascularFitness?.reps),
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 50%", padding: "10px" }}>
          <Bar data={anthropometricData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Anthropometric Measurements' } }}} />
        </div>
        <div style={{ flex: "1 1 50%", padding: "10px" }}>
          <Line data={bodyCompositionData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Body Composition' } }}} />
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 50%", padding: "10px" }}>
          <Bar data={cardiovascularFitnessData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Cardiovascular Fitness' } }}} />
        </div>
        <div style={{ flex: "1 1 50%", padding: "10px" }}>
          <Pie data={repsData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Reps Distribution' } }}} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
