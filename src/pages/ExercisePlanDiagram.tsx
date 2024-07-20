/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { ScrollArea } from "../components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { GripVertical } from "lucide-react";
import { IExercise, PLAN } from "../components/molecules/data";
import { STRENGTH_EXERCISES } from "../constant";
import AntdSelect from "../components/ui/AntdSelect";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const ExercisePlanDiagram = () => {
  const [plan, setPlan] = React.useState(PLAN);

  const addNewEmptyExercise = (day: string) => {
    const newPlan = plan?.map((item) => {
      if (item?.day === day) {
        item?.exercises.push({ exerciseName: "", frequency: { sets: 1, reps: 1 } });
      }
      return item;
    });
    setPlan(newPlan);
  };

  const selectExercise = (value: string, index: number, day: string) => {
    const newPlan = plan?.map((item) => {
      if (item?.day === day) {
        item.exercises[index].exerciseName = value;
      }
      return item;
    });
    setPlan(newPlan);
  };

  const handleDelete = (index: number, day: string) => {
    const newPlan = plan?.map((item) => {
      if (item?.day === day) {
        item?.exercises.splice(index, 1);
      }
      return item;
    });
    setPlan(newPlan);
  };

  const handleOnChangeSet = (value: string, index: number, day: string) => {
    const newPlan = plan?.map((item) => {
      if (item?.day === day) {
        item.exercises[index].frequency.sets = parseInt(value);
      }
      return item;
    });
    setPlan(newPlan);
  };

  const handleOnChangeReps = (value: string, index: number, day: string) => {
    const newPlan = plan?.map((item) => {
      if (item?.day === day) {
        item.exercises[index].frequency.reps = parseInt(value);
      }
      return item;
    });
    setPlan(newPlan);
  };

  const listItems = (exercises: IExercise[], day: string) => {
    return exercises.map((item, i) => (
      <div key={i} className='flex flex-row px-4 py-2 justify-around items-center border-black border-2 border-solid'>
        <AntdSelect
          key={i}
          options={STRENGTH_EXERCISES.map((exercise) => {
            return { value: exercise, label: exercise };
          })}
          value={item?.exerciseName}
          onChange={(value) => selectExercise(value, i, day)}
        />
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
        <div id={i.toString()} className='delButton' onClick={() => handleDelete(i, day)}>
          X
        </div>
      </div>
    ));
  };

  return (
    <div className='page w-100 h-screen'>
      <Card x-chunk='dashboard-06-chunk-0' className='h-5/6'>
        <CardHeader>
          <div className='flex flex-row w-full'>
            <CardTitle>Exercise Plan Creation Diagram</CardTitle>
            <Button className='ml-auto' variant='default' size='sm'>
              Save
            </Button>
          </div>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className='h-full w-1/2'>
          <ScrollArea className='h-5/6 w-100 rounded-md'>
            {plan?.map((item) => {
              return (
                <Accordion type='multiple' className='w-full border-gray-300 p-2 border-solid'>
                  <AccordionItem value={item?.day} className='border-gray-400'>
                    <AccordionTrigger>{item?.day}</AccordionTrigger>
                    <AccordionContent>
                      {/* <ScrollArea className='h-fit w-100 rounded-md'> */}
                      <div className='container '>
                        {listItems(item?.exercises, item?.day)}
                        <button className='addButton' onClick={() => addNewEmptyExercise(item?.day)}>
                          +
                        </button>
                      </div>
                      {/* </ScrollArea> */}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              );
            })}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExercisePlanDiagram;
