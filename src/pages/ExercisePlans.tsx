import { useNavigate } from "react-router-dom";
import ExercisePlan from "../components/molecules/ExercisePlan";
import { Button } from "../components/ui/button";

const ExercisePlans = () => {
  const navigate = useNavigate()

  const navigateToAllPlans = () => {
    navigate('/exercise-plans/all')
  }
  return (
    <div className='px-10 w-full'>
      <div className='text-xl mb-6 flex w-full justify-between'>
        <div className='text-2xl font-semibold leading-none tracking-tight'>Current Exercise Plan</div>
        <Button onClick={navigateToAllPlans}>All Plans</Button>
      </div>
      <ExercisePlan />
    </div>
  );
};

export default ExercisePlans;
