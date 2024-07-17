import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { IDayExercisePlan, PLAN } from "./data";

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
                <div>

              <li key={exercise.exerciseName}>
                <span>{exercise.exerciseName}</span>
                <span>
                  {exercise.frequency.sets} x {exercise.frequency.reps}
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
    <div>
      <Accordion type='single' collapsible className='w-full'>
        {PLAN?.map((dayExercise) => {
          return <OneDay dayExercise={dayExercise} />;
        })}
      </Accordion>
    </div>
  );
};

export default ExercisePlan;
