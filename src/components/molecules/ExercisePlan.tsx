import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { IDayExercisePlan, PLAN } from "./data";
import { Card, CardContent } from "../ui/card";
import imageSrc from "../../assets/Arnold Press.jpg";

interface IOneDayProps {
  dayExercise: IDayExercisePlan;
}

const OneDay: React.FC<IOneDayProps> = ({ dayExercise }) => {
  return (
    <AccordionItem value={dayExercise?.day}>
      <AccordionTrigger>{dayExercise?.day}</AccordionTrigger>
      <AccordionContent>
        <ul>
          {dayExercise?.exercises.map((exercise) => {
            return (
              <div className='flex'>
                <img src={imageSrc} className='w-24' />
                <li key={exercise.exerciseName} className="flex gap-3">
                  <span>{exercise.exerciseName}</span>
                  <span>
                    sets {exercise.frequency.sets} x reps {exercise.frequency.reps}
                  </span>
                </li>
              </div>
            );
          })}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};

const ExercisePlan = () => {
  return (
    <div className='flex'>
      <div className='basis-1/2'>
        <Card x-chunk='dashboard-06-chunk-0'>
          <CardContent>
            <Accordion type='single' collapsible className='w-full'>
              {PLAN?.map((dayExercise) => {
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
