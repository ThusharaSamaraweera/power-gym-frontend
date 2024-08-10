export interface IUser extends SignupUser {
  _id: string;
  dateOfBirth?: string;
  gender?: string;
  image?: string;
  phone?: string;
  status: UserStatus;
}

export interface SignupUser {
  name: string;
  email: string;
  role: UserRoles;
  clerkUserId: string;
}

export enum UserRoles {
  ADMIN = "ADMIN",
  TRAINER = "TRAINER",
  MEMBER = "MEMBER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED",
}

export interface BodyHealthInfoDto {
  anthropometricMeasurements: {
    age: string;
    weight: string;
    height: string;
    waistCircumference: string;
    hipCircumference: string;
    chestCircumference: string;
    armCircumference: string;
    thighCircumference: string;
    abdomenCircumference: string;
    tricepsCircumference: string;
    supraIliacCircumference: string;
    waistToHipRatio: string;
  };
  bodyComposition: {
    bodyMassIndex: string;
    bodyDensity: string;
    bodyFatPercentage: string;
  };
  cardiovascularFitness: {
    restingHeartRate: string;
    estimatedMaximumHeartRate: string;
    maximumWeightLifted: string;
    reps: string;
    oneRepMax: string;
  };
  flexibility?: {
    sitAndReach?: string;
  };
  endurance?: {
    muscularEndurance?: string;
    cardiorespiratoryEndurance?: string;
  };
  goalsAndPreferences?: {
    fitnessGoals: string[];
    exercisePreferences: string[];
  };
  healthConditions?: {
    medicalHistory: string[];
  };
  lifestyle?: {
    activityLevel: string;
    sleepDuration: string;
    // stressLevel: string;
    // sleepQuality: string;
    // nutrition: string;
    // hydration: string;
    // alcohol: string;
    // smoking: string;
  };
}

export interface BodyHealthInfoPayload {
  bodyHealthInfo: BodyHealthInfoDto;
  note?: string;
  verifiedBy: string;
}


export enum BODY_HEALTH_INFO_RECORD_STATUS {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export interface IRequestedPlan extends BodyHealthInfoPayload {
  _id: string;
  memberId: string;
  status: BODY_HEALTH_INFO_RECORD_STATUS;
  createdAt: string;
  updatedAt: string;
  WorkoutPlan?: IWorkoutPlan;
  trainerId: string
}

export interface IWorkoutPlan {
  duration: number;
  plan: IDayExercisePlan[]
}

export interface IExercise {
  exercise: string;
  frequency: {
    sets?: number;
    reps?: number;
    duration?: number;
  };
}

export interface IDayExercisePlan {
  day: string;
  isRest?: boolean;
  exercises?: IExercise[];
}

export const STRENGTH_EXERCISES = [
  "Bench Press",
  "Incline Bench Press",
  "Decline Bench Press",
  "Dumbbell Flyes",
  "Push-Ups",
  "Chest Dips",
  "Cable Crossovers",
  "Pull-Ups",
  "Lat Pulldowns",
  "Bent-Over Barbell Rows",
  "Dumbbell Rows",
  "T-Bar Rows",
  "Deadlifts",
  "Seated Cable Rows",
  "Military Press",
  "Dumbbell Shoulder Press",
  "Arnold Press",
  "Lateral Raises",
  "Front Raises",
  "Rear Delt Flyes",
  "Upright Rows",
  "Barbell Curls",
  "Dumbbell Curls",
  "Hammer Curls",
  "Preacher Curls",
  "Concentration Curls",
  "Cable Curls",
  "Tricep Dips",
  "Skull Crushers",
  "Tricep Pushdowns",
  "Overhead Tricep Extensions",
  "Close-Grip Bench Press",
  "Kickbacks",
  "Squats",
  "Leg Press",
  "Lunges",
  "Leg Curls",
  "Leg Extensions",
  "Calf Raises",
  "Crunches",
  "Planks",
  "Russian Twists",
  "Leg Raises",
  "Bicycle Crunches",
  "Mountain Climbers",
  "Burpees",
  "Kettlebell Swings",
  "Clean and Press",
  "Snatches",
  "Farmer's Walk",
  "Running (Treadmill)",
  "Cycling (Stationary Bike)",
  "Rowing Machine",
  "Jump Rope",
  "Elliptical Trainer",
  "Stair Climber",
];

export const CARDIO_EXERCISES = ["Running (Treadmill)", "Cycling (Stationary Bike)", "Rowing Machine", "Jump Rope", "Elliptical Trainer", "Stair Climber"];