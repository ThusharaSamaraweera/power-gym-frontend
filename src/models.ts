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
  WorkoutPlan: any;
  trainerId: string
}