export const PLAN: IDayExercisePlan[] = [
  {
    day: "Monday",
    exercises: [
      {
        exerciseName: "Squats",
        frequency: {
          sets: 3,
          reps: 10,
        },
      },
      {
        exerciseName: "Kettlebell Swings",
        frequency: {
          sets: 3,
          reps: 10,
        },
      },
      {
        exerciseName: "Leg Press",
        frequency: {
          sets: 3,
          reps: 10,
        },
      }
    ],
  },
  {
    day: "Tuesday",
    exercises: [
      {
        exerciseName: "Bench Press",
        frequency: {
          sets: 3,
          reps: 10,
        },
      },
      {
        exerciseName: "Shoulder Press",
        frequency: {
          sets: 3,
          reps: 10,
        },
      },
      {
        exerciseName: "Tricep Extension",
        frequency: {
          sets: 3,
          reps: 10,
        },
      },
    ],
  },
  {
    day: "Wednesday",
    exercises: [
      {
        exerciseName: "Bench Press",
        frequency: {
          sets: 3,
          reps: 10,
        },
      },
      {
        exerciseName: "Shoulder Press",
        frequency: {
          sets: 3,
          reps: 10,
        },
      },
      {
        exerciseName: "Tricep Extension",
        frequency: {
          sets: 3,
          reps: 10,
        },
      },
    ],
  },
];

export interface IExercise {
  exerciseName: string;
  frequency: {
    sets: number;
    reps: number;
  };
}

export interface IDayExercisePlan {
  day: string;
  exercises: IExercise[];
}
