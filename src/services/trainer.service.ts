import { BODY_HEALTH_INFO_RECORD_STATUS, IBodyHealthInfo, IWorkoutPlan } from "../models";
import { HTTPS_METHODS, restClient } from "../utils/restClient";

export const getExercisePlanRequests = async (trainerId: string): Promise<IBodyHealthInfo[]> => {
  const url = `trainers/${trainerId}/plans`;
  const res = await restClient(HTTPS_METHODS.GET, url, undefined,  undefined, { status: BODY_HEALTH_INFO_RECORD_STATUS.PENDING });
  return res.data;
};

export const generateAIExercisePlan = async (trainerId: string, bodyHealthInfoId: string): Promise<IWorkoutPlan> => {
  const url = `trainers/${trainerId}/plans/${bodyHealthInfoId}/generate`;
  const res = await restClient(HTTPS_METHODS.GET, url);
  return res?.data;
};

export const submitPlan = async (trainerId: string, bodyHealthInfoId: string, plan: IWorkoutPlan) => {
  const url =  `trainers/${trainerId}/plans/${bodyHealthInfoId}`

  const res = await restClient(HTTPS_METHODS.PUT, url, plan)
  return res?.data
}
