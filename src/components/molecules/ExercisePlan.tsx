import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Card, CardContent } from "../ui/card";
import imageSrc from "../../assets/Arnold Press.jpg";
import { CARDIO_EXERCISES, IBodyHealthInfo, IDayExercisePlan, IWorkoutPlan } from "../../models";

interface IOneDayProps {
  dayExercise: IDayExercisePlan;
}

const OneDay: React.FC<IOneDayProps> = ({ dayExercise }) => {
  return (
    <AccordionItem value={dayExercise?.day}>
      <AccordionTrigger>{dayExercise?.day}</AccordionTrigger>
      <AccordionContent>
        {dayExercise?.isRest ? (
          <span className="flex justify-center w-full text-gray-400">Rest day</span>
        ) : (
          <ul>
            {dayExercise?.exercises?.map((exercise) => {
              const isCarDioExercise = CARDIO_EXERCISES.includes(exercise?.exercise);

              return (
                <div className='flex'>
                  <img src={imageSrc} className='w-24' />
                  <li key={exercise.exercise} className='flex gap-3'>
                    <span>{exercise.exercise}</span>
                    {isCarDioExercise ? (
                      <span>{exercise.frequency.duration} minutes</span>
                    ) : (
                      <span>
                        sets {exercise.frequency.sets} x reps {exercise.frequency.reps}
                      </span>
                    )}
                  </li>
                </div>
              );
            })}
          </ul>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

interface ExercisePlanProps {
  currentPlan: IBodyHealthInfo | null;
}

const ExercisePlan: React.FC<ExercisePlanProps> = ({ currentPlan }) => {
  return (
    <div className='flex'>
      <div className='basis-1/2'>
        <Card x-chunk='dashboard-06-chunk-0'>
          <CardContent>
            <Accordion type='multiple' className='w-full'>
              {currentPlan?.WorkoutPlan?.plan?.map((dayExercise) => {
                return <OneDay dayExercise={dayExercise} />;
              })}
            </Accordion>
          </CardContent>
        </Card>
      </div>
      <div className='basis-1/2'></div>
    </div>
  );
};

export default ExercisePlan;
