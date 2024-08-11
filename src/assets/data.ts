import { IDayExercisePlan } from "../models";

export interface BodyHealthInfoDto {
  anthropometricMeasurements: {
    weight: number;
    height: number;
    waistCircumference: number;
    hipCircumference: number;
    chestCircumference: number;
    armCircumference: number;
    thighCircumference: number;
    abdomenCircumference: number;
    tricepsCircumference: number;
    supraIliacCircumference: number;
    waistToHipRatio: number;
  };
  bodyComposition: {
    bodyMassIndex: number;
    bodyDensity: number;
    bodyFatPercentage: number;
  };
  cardiovascularFitness: {
    restingHeartRate: number;
    estimatedMaximumHeartRate: number;
    maximumWeightLifted: number;
    reps: number;
    oneRepMax: number;
  };
  flexibility: {
    sitAndReach: number;
  };
  endurance: {
    muscularEndurance: number;
    cardiorespiratoryEndurance: number;
  };
  goalsAndPreferences: {
    fitnessGoals: string[];
    exercisePreferences: string[];
  };
  healthConditions: {
    medicalHistory: string[] | null;
  };
  lifestyle: {
    activityLevel: string;
    sleepDuration: number;
  };
}

interface RequestedPlan {
  id: number;
  name: string;
  bodyHealthInfo: BodyHealthInfoDto;
  createdAt: string;
  plan: IDayExercisePlan[];
  statue: PlanStatus;
}

export enum PlanStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export const REQUESTED_PLANS_DATA: RequestedPlan[] = [
  {
    id: 1,
    name: "John Doe",
    bodyHealthInfo: {
      anthropometricMeasurements: {
        weight: 180,
        height: 72,
        waistCircumference: 36,
        hipCircumference: 40,
        chestCircumference: 42,
        armCircumference: 15,
        thighCircumference: 24,
        abdomenCircumference: 38,
        tricepsCircumference: 12,
        supraIliacCircumference: 10,
        waistToHipRatio: 0.9,
      },
      bodyComposition: {
        bodyMassIndex: 24.4,
        bodyDensity: 1.1,
        bodyFatPercentage: 15,
      },
      cardiovascularFitness: {
        restingHeartRate: 60,
        estimatedMaximumHeartRate: 180,
        maximumWeightLifted: 200,
        reps: 10,
        oneRepMax: 225,
      },
      flexibility: {
        sitAndReach: 12,
      },
      endurance: {
        muscularEndurance: 10,
        cardiorespiratoryEndurance: 15,
      },
      goalsAndPreferences: {
        fitnessGoals: ["Lose weight", "Gain muscle"],
        exercisePreferences: ["Cardio", "Strength training"],
      },
      healthConditions: {
        medicalHistory: null,
      },
      lifestyle: {
        activityLevel: "Moderate",
        sleepDuration: 8,
      },
    },
    createdAt: "2023-07-12 10:42 AM",
    plan: [
      {
        day: "Monday",
        exercises: [
          {
            exercise: "Squats",
            frequency: {
              sets: 3,
              reps: 10,
            },
          },
          {
            exercise: "Kettlebell Swings",
            frequency: {
              sets: 3,
              reps: 10,
            },
          },
          {
            exercise: "Leg Press",
            frequency: {
              sets: 3,
              reps: 10,
            },
          },
        ],
      },
      {
        day: "Tuesday",
        exercises: [],
      },
      {
        day: "Wednesday",
        exercises: [
          {
            exercise: "Bench Press",
            frequency: {
              sets: 3,
              reps: 10,
            },
          },
          {
            exercise: "Shoulder Press",
            frequency: {
              sets: 3,
              reps: 10,
            },
          },
          {
            exercise: "Tricep Extension",
            frequency: {
              sets: 3,
              reps: 10,
            },
          },
        ],
      },
      {
        day: "Thursday",
      },
      {
        day: "Friday",
      },
      {
        day: "Saturday",
      },
      {
        day: "Sunday",
      },
    ],
    statue: PlanStatus.APPROVED,
  },
  {
    id: 2,
    name: "John Doe2",
    bodyHealthInfo: {
      anthropometricMeasurements: {
        weight: 180,
        height: 72,
        waistCircumference: 36,
        hipCircumference: 40,
        chestCircumference: 42,
        armCircumference: 15,
        thighCircumference: 24,
        abdomenCircumference: 38,
        tricepsCircumference: 12,
        supraIliacCircumference: 10,
        waistToHipRatio: 0.9,
      },
      bodyComposition: {
        bodyMassIndex: 24.4,
        bodyDensity: 1.1,
        bodyFatPercentage: 15,
      },
      cardiovascularFitness: {
        restingHeartRate: 60,
        estimatedMaximumHeartRate: 180,
        maximumWeightLifted: 200,
        reps: 10,
        oneRepMax: 225,
      },
      flexibility: {
        sitAndReach: 12,
      },
      endurance: {
        muscularEndurance: 10,
        cardiorespiratoryEndurance: 15,
      },
      goalsAndPreferences: {
        fitnessGoals: ["Lose weight", "Gain muscle"],
        exercisePreferences: ["Cardio", "Strength training"],
      },
      healthConditions: {
        medicalHistory: null,
      },
      lifestyle: {
        activityLevel: "Moderate",
        sleepDuration: 8,
      },
    },
    createdAt: "2023-07-12 10:42 AM",
    plan: [
      {
        day: "Monday",
        exercises: [
          {
            exercise: "Squats",
            frequency: {
              sets: 3,
              reps: 10,
            },
          },
          {
            exercise: "Kettlebell Swings",
            frequency: {
              sets: 3,
              reps: 10,
            },
          },
          {
            exercise: "Leg Press",
            frequency: {
              sets: 3,
              reps: 10,
            },
          },
        ],
      },
      {
        day: "Tuesday",
        exercises: [],
      },
      {
        day: "Wednesday",
        exercises: [
          {
            exercise: "Bench Press",
            frequency: {
              sets: 3,
              reps: 10,
            },
          },
          {
            exercise: "Shoulder Press",
            frequency: {
              sets: 3,
              reps: 10,
            },
          },
          {
            exercise: "Tricep Extension",
            frequency: {
              sets: 3,
              reps: 10,
            },
          },
        ],
      },
      {
        day: "Thursday",
      },
      {
        day: "Friday",
      },
      {
        day: "Saturday",
      },
      {
        day: "Sunday",
      },
    ],
    statue: PlanStatus.PENDING,
  },
];

export const PLAN: IDayExercisePlan[] = [
  {
    day: "Monday",
    isRest: false,
    exercises: [
      {
        exercise: "Bench Press",
        frequency: {
          sets: 3,
          reps: 10,
        },
      },
      {
        exercise: "Tricep Dips",
        frequency: {
          sets: 3,
          reps: 15,
        },
      },
      {
        exercise: "Running (Treadmill)",
        frequency: {
          duration: 30,
        },
      },
    ],
  },
  {
    day: "Tuesday",
    isRest: false,
    exercises: [
      {
        exercise: "Pull-Ups",
        frequency: {
          sets: 3,
          reps: 10,
        },
      },
      {
        exercise: "Bent-Over Barbell Rows",
        frequency: {
          sets: 3,
          reps: 10,
        },
      },
      {
        exercise: "Cycling (Stationary Bike)",
        frequency: {
          duration: 30,
        },
      },
    ],
  },
  {
    day: "Wednesday",
    isRest: true,
    exercises: [],
  },
  {
    day: "Thursday",
    isRest: false,
    exercises: [
      {
        exercise: "Squats",
        frequency: {
          sets: 3,
          reps: 12,
        },
      },
      {
        exercise: "Lunges",
        frequency: {
          sets: 3,
          reps: 12,
        },
      },
      {
        exercise: "Rowing Machine",
        frequency: {
          duration: 30,
        },
      },
    ],
  },
  {
    day: "Friday",
    isRest: false,
    exercises: [
      {
        exercise: "Military Press",
        frequency: {
          sets: 3,
          reps: 10,
        },
      },
      {
        exercise: "Lateral Raises",
        frequency: {
          sets: 3,
          reps: 12,
        },
      },
      {
        exercise: "Elliptical Trainer",
        frequency: {
          duration: 30,
        },
      },
    ],
  },
  {
    day: "Saturday",
    isRest: true,
    exercises: [],
  },
  {
    day: "Sunday",
    isRest: false,
    exercises: [
      {
        exercise: "Deadlifts",
        frequency: {
          sets: 3,
          reps: 10,
        },
      },
      {
        exercise: "Seated Cable Rows",
        frequency: {
          sets: 3,
          reps: 12,
        },
      },
      {
        exercise: "Jump Rope",
        frequency: {
          duration: 15,
        },
      },
    ],
  },
];



export const members = [
  {
    id: "66af479c34815a0061bf8ab9",
    name: "John Doe1",
  },
  {
    id: 2,
    name: "John Doe2",
  },
  {
    id: 3,
    name: "John Doe3",
  },
  {
    id: 4,
    name: "John Doe4",
  },
];

export const trainer = [
  {
    id: "66af479c34815a0061bf8ab9",
    name: "Trainer 1",
  },
  {
    id: 2,
    name: "Trainer 2",
  },
  {
    id: 3,
    name: "Trainer 3",
  },
  {
    id: 4,
    name: "Trainer 4",
  },
];
