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
  createdAt: string
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
  },

];
