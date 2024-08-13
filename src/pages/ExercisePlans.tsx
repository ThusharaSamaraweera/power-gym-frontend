import { useNavigate } from "react-router-dom";
import ExercisePlan from "../components/molecules/ExercisePlan";
import { Button } from "../components/ui/button";
import { useAppSelector } from "../state/hooks";
import { useEffect, useState } from "react";
import { IBodyHealthInfo, IWorkoutPlan } from "../models";
import userService from "../services/user.service";

const ExercisePlans = () => {
  const user = useAppSelector((state) => state.global.user);
  const navigate = useNavigate();
  const [plans, setPlans] = useState<IBodyHealthInfo[]>([]);
  const [currentPlan, setCurrentPlan] = useState<IBodyHealthInfo | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;

      const res = await userService.getExercisePlansByUserId(user?._id);
      console.log("🚀 ~ file: ExercisePlans.tsx:19 ~ fetchData ~ res:", res);
      setPlans(res);
      setCurrentPlan(res[0]);
    }

    fetchData();
  }, []);

  const navigateToAllPlans = () => {
    navigate("/exercise-plans/all");
  };
  return (
    <div className='px-10 w-full'>
      <div className='text-xl mb-6 flex w-full justify-between'>
        <div className='text-2xl font-semibold leading-none tracking-tight'>Current Exercise Plan</div>
        {/* <Button onClick={navigateToAllPlans}>All Plans</Button> */}
      </div>
      <div className='w-full flex'>
        <div className='w-1/2'>
          <ExercisePlan currentPlan={currentPlan} />
        </div>
        <div className='basis-1/2'>
          <img src='/img2.jpg' alt='signup' className='h-screen w-full object-cover' />
        </div>
      </div>
    </div>
  );
};

export default ExercisePlans;
