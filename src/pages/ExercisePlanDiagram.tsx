/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { ScrollArea } from "../components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { GripVertical } from "lucide-react";

const ExercisePlanDiagram = () => {
  let list: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  let sourceElement: any = null;

  const [sortedList, setSortedList] = React.useState(list);

  /* add a new entry at the end of the list.  */
  const newLine = () => {
    console.log(sortedList);
    setSortedList(sortedList.concat(""));
  };

  /* change opacity for the dragged item. 
  remember the source item for the drop later */
  const handleDragStart = (event: any) => {
    event.target.style.opacity = 0.5;
    sourceElement = event.target;
    event.dataTransfer.effectAllowed = "move";
  };

  /* do not trigger default event of item while passing (e.g. a link) */
  const handleDragOver = (event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  /* add class .over while hovering other items */
  const handleDragEnter = (event: any) => {
    event.target.classList.add("over");
  };

  /* remove class .over when not hovering over an item anymore*/
  const handleDragLeave = (event: any) => {
    event.target.classList.remove("over");
  };

  const handleDrop = (event: any) => {
    /* prevent redirect in some browsers*/
    event.stopPropagation();

    /* only do something if the dropped on item is 
    different to the dragged item*/
    if (sourceElement !== event.target) {
      /* remove dragged item from list */
      const list = sortedList.filter((item, i) => i.toString() !== sourceElement.id);

      /* this is the removed item */
      const removed = sortedList.filter((item, i) => i.toString() === sourceElement.id)[0];

      /* insert removed item after this number. */
      let insertAt = Number(event.target.id);

      console.log("list with item removed", list);
      console.log("removed:  line", removed);
      console.log("insertAt index", insertAt);

      let tempList = [];

      /* if dropped at last item, don't increase target id by +1. 
         max-index is arr.length */
      if (insertAt >= list.length) {
        tempList = list.slice(0).concat(removed);
        setSortedList(tempList);
        event.target.classList.remove("over");
      } else if (insertAt < list.length) {
        /* original list without removed item until the index it was removed at */
        tempList = list.slice(0, insertAt).concat(removed);

        console.log("tempList", tempList);
        console.log("insert the rest: ", list.slice(insertAt));

        /* add the remaining items to the list */
        const newList = tempList.concat(list.slice(insertAt));
        console.log("newList", newList);

        /* set state to display on page */
        setSortedList(newList);
        event.target.classList.remove("over");
      }
    } else console.log("nothing happened");
    event.target.classList.remove("over");
  };

  const handleDragEnd = (event: any) => {
    event.target.style.opacity = 1;
    console.log("-------------------------------------------------------------");
  };

  /* log changes in current input field */
  const handleChange = (event: any) => {
    event.preventDefault();
    console.log("event.target.value", event.target.value);

    /* create new list where everything stays the same except that the current
    item replaces the existing value at this index */
    const list = sortedList.map((item, i) => {
      if (i !== Number(event.target.id)) {
        return item;
      } else return event.target.value;
    });
    setSortedList(list);
  };

  /* filter list where only items with id unequal to current id's are allowed */
  const handleDelete = (event: any) => {
    event.preventDefault();
    const list = sortedList.filter((item, i) => i !== Number(event.target.id));
    console.log(event.target.id);
    setSortedList(list);
  };
  /* create list of items */
  const listItems = () => {
    return sortedList.map((item, i) => (
      <div key={i} className='dnd-list border-black border-2 border-solid'>
        <div
          id={i.toString()}
          // type='text'
          className='input-item flex flex-row justify-between'
          draggable='true'
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
          onChange={handleChange}
          // placeholder='Enter text here'
          // value={sortedList[i]}
        >
          <div
          
          >
            <GripVertical className='cursor-pointer' />
          </div>
          {sortedList[i]}
          <div id={i.toString()} className='delButton' onClick={handleDelete}>
            X
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className='page w-100 h-screen'>
      <Card x-chunk='dashboard-06-chunk-0' className='h-5/6'>
        <CardHeader>
          <CardTitle>Exercise Plan Creation Diagram</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className='h-full w-1/2'>
          <Accordion type='multiple' className='w-full border-gray-300 border-2 p-2 border-solid'>
            <AccordionItem value={"monday"}>
              <AccordionTrigger>{"monday"}</AccordionTrigger>
              <AccordionContent>
                <ScrollArea className='h-96 w-100 rounded-md'>
                  <div className='container '>
                    {listItems()}
                    <button className='addButton' onClick={() => newLine()}>
                      +
                    </button>
                  </div>
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExercisePlanDiagram;
