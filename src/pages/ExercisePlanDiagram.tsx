import React, { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { ScrollArea } from "../components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import AntdSelect from "../components/ui/AntdSelect";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { PLAN } from "../assets/data";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../state/hooks";
import BodyHealthInfo from "../components/organisms/BodyHealthInfo";
import { CARDIO_EXERCISES, IDayExercisePlan, IExercise, IRequestedPlan, IWorkoutPlan, STRENGTH_EXERCISES } from "../models";
import { generateAIExercisePlan, submitPlan } from "../services/trainer.service";

const initialPlan: IDayExercisePlan[] = [
  {
    day: "Monday",
    exercises: [],
  },
  {
    day: "Tuesday",
    exercises: [],
  },
  {
    day: "Wednesday",
    exercises: [],
  },
  {
    day: "Thursday",
    exercises: [],
  },
  {
    day: "Friday",
    exercises: [],
  },
  {
    day: "Saturday",
    exercises: [],
  },
  {
    day: "Sunday",
    exercises: [],
  },
];

const ExercisePlanDiagram = () => {
  const { planId } = useParams();
  const requestedPlans = useAppSelector((state) => state.global.requestedPlans);
  const [requestedPlan, setRequestedPlan] = React.useState<IRequestedPlan>({});
  const [plan, setPlan] = React.useState(initialPlan);
  const [planDuration, setPlanDuration] = React.useState(0);

  console.log("🚀 ~ file: ExercisePlanDiagram.tsx:45 ~ ExercisePlanDiagram ~ planId:", planId);

  useEffect(() => {
    // setPlan(PLAN);
    if (planId) {
      const requestedPlan = requestedPlans?.find((item) => item._id === planId);
      if (requestedPlan) {
        setRequestedPlan(requestedPlan);
        if (requestedPlan?.WorkoutPlan) {
          setPlan(requestedPlan?.WorkoutPlan?.plan);
        }
      }
    }
  }, [planId, requestedPlans]);

  const addNewEmptyExercise = (day: string) => {
    const newPlan = plan?.map((item) => {
      if (item?.day === day) {
        if (!item?.exercises) item.exercises = [];
        item?.exercises.push({ exercise: "", frequency: { sets: 1, reps: 1, duration: 0 } });
      }
      return item;
    });
    setPlan(newPlan);
  };

  const selectExercise = (value: string, index: number, day: string) => {
    const newPlan = plan?.map((item) => {
      if (item?.day === day && item?.exercises) {
        item.exercises[index].exercise = value;
      }
      return item;
    });
    setPlan(newPlan);
  };

  const handleDelete = (index: number, day: string) => {
    const newPlan = plan?.map((item) => {
      if (item?.day === day && item?.exercises) {
        item?.exercises?.splice(index, 1);
      }
      return item;
    });
    setPlan(newPlan);
  };

  const handleOnChangeSet = (value: string, index: number, day: string) => {
    const newPlan = plan?.map((item) => {
      if (item?.day === day && item?.exercises && item?.exercises?.length > 0) {
        item.exercises[index].frequency.sets = parseInt(value);
      }
      return item;
    });
    setPlan(newPlan);
  };

  const handleOnChangeReps = (value: string, index: number, day: string) => {
    const newPlan = plan?.map((item) => {
      if (item?.day === day && item?.exercises && item?.exercises?.length > 0) {
        item.exercises[index].frequency.reps = parseInt(value);
      }
      return item;
    });
    setPlan(newPlan);
  };
  
  const handleOnChangeDuration = (value: string, index: number, day: string) => {
    const newPlan = plan?.map((item) => {
      if (item?.day === day && item?.exercises && item?.exercises?.length > 0) {
        item.exercises[index].frequency.duration = parseInt(value);
      }
      return item;
    });
    setPlan(newPlan);
  };


  const handleOnSave = async () => {
    try {
      const workoutPlan: IWorkoutPlan = { plan: plan, duration: planDuration };
      const res = await submitPlan(requestedPlan?.trainerId, requestedPlan?._id, workoutPlan);
    } catch (error) {
      console.error(error)
    }
  };

  const listItems = (exercises: IExercise[] | undefined, day: string) => {
    return exercises?.map((item, i) => {
      const isCarDioExercise = CARDIO_EXERCISES.includes(item?.exercise);
      return (
        <div key={i} className='grid grid-cols-3 my-2 px-4 py-2 gap-28 items-center border-gray-600 border-2 border-solid'>
          <AntdSelect
            key={i}
            options={STRENGTH_EXERCISES.map((exercise) => {
              return { value: exercise, label: exercise };
            })}
            value={item?.exercise}
            onChange={(value) => selectExercise(value, i, day)}
          />
          {isCarDioExercise ? (
            <div className='flex flex-row items-center gap-4'>
              <label>Duration</label>
              <Input
                type='number'
                className='py-1 h-8 w-16'
                value={item?.frequency?.duration}
                onChange={(event) => handleOnChangeDuration(event?.target.value, i, day)}
                min={1}
              />
              <label>min</label>
            </div>
          ) : (
            <div className='flex'>
              <div className='flex flex-row items-center gap-4'>
                <label>Sets</label>
                <Input
                  type='number'
                  className='py-1 h-8 w-16'
                  value={item?.frequency?.sets}
                  onChange={(event) => handleOnChangeSet(event?.target.value, i, day)}
                />
              </div>
              <div className='flex flex-row items-center gap-4'>
                <label>Reps</label>
                <Input
                  type='number'
                  className='py-1 h-8 w-16'
                  value={item?.frequency?.reps}
                  onChange={(event) => handleOnChangeReps(event?.target.value, i, day)}
                />
              </div>
            </div>
          )}
          <div id={i.toString()} className='delButton' onClick={() => handleDelete(i, day)}>
            X
          </div>
        </div>
      );
    });
  };

  const handleGeneratePlan = async () => {
    const res = await generateAIExercisePlan(requestedPlan?.trainerId, requestedPlan?._id);
    console.log("🚀 ~ file: ExercisePlanDiagram.tsx:160 ~ handleGeneratePlan ~ res:", res);
    setPlan(res?.plan)
    setPlanDuration(res?.duration)
  };


  return (
    <div className='page w-100 h-screen'>
      <Card x-chunk='dashboard-06-chunk-0' className='h-5/6'>
        <CardHeader>
          <div className='flex flex-row w-full'>
            <CardTitle>Create Exercise Plan</CardTitle>
            <Button className='ml-auto' variant='default' size='sm' onClick={handleOnSave}>
              Save
            </Button>
          </div>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className='h-full flex'>
          <div className='w-3/5'>
            <div className='flex mb-5'>
              <div>Generate the plan from AI</div>
              <Button className='ml-auto' variant='default' size='sm' onClick={handleGeneratePlan}>
                Generate The Plan
              </Button>
            </div>
            <div className='flex mb-5 gap-3'>
              <div>Exercise plan duration</div>
              <Input
                type='number'
                className='py-1 h-8 w-16'
                value={planDuration}
                onChange={(event) => setPlanDuration(event?.target?.value ? parseInt(event?.target?.value) : 0)}
              />
              days
            </div>
            <ScrollArea className='h-5/6 w-100 rounded-md px-2'>
              {plan?.map((item) => {
                return (
                  <Accordion type='multiple' className='w-full border-gray-300 p-2 border-solid'>
                    <AccordionItem value={item?.day} className='border-gray-400'>
                      <AccordionTrigger>{item?.day}</AccordionTrigger>
                      <AccordionContent>
                        {/* <ScrollArea className='h-fit w-100 rounded-md'> */}
                        <div className=' w-full px-4 gap-3'>
                          {listItems(item?.exercises, item?.day)}

                          <Button
                            className='flex items-center mt-2 mx-auto'
                            variant='default'
                            size='sm'
                            onClick={() => addNewEmptyExercise(item?.day)}>
                            Add
                          </Button>
                        </div>
                        {/* </ScrollArea> */}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              })}
            </ScrollArea>
          </div>
          <div className='pl-4 w-2/5'>
            <BodyHealthInfo info={requestedPlan?.bodyHealthInfo}></BodyHealthInfo>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExercisePlanDiagram;
