import { BODY_HEALTH_INFO_RECORD_STATUS, BodyHealthInfoPayload, IUser, IUserWithBodyHealthInfo, SignupUser, UserRoles } from "../models";
import { HTTPS_METHODS, restClient } from "../utils/restClient";

const signUp = async (payload: SignupUser) => {
  const res = await restClient(HTTPS_METHODS.POST, "/auth/signup", payload);
  return res?.data;
};

const getUserByClerkId = async (clerkId: string) => {
  const res = await restClient(HTTPS_METHODS.GET, `/users/${clerkId}`);
  return res?.data;
};

const createBodyHealthInfo = async (memberId: string, payload: BodyHealthInfoPayload) => {
  const url = `/users/${memberId}/body-health-info`;

  const res = await restClient(HTTPS_METHODS.POST, url, payload);
  return res;
};

const getExercisePlansByUserId = async (memberId: string) => {
  const url = `/users/${memberId}/body-health-info`;

  const res = await restClient(HTTPS_METHODS.GET, url, undefined, undefined, { status: BODY_HEALTH_INFO_RECORD_STATUS.COMPLETED });
  return res?.data;
};

const getUsers = async (roles: UserRoles[]): Promise<IUser[]> => {
  const rolesString = roles.join(",");
  const res = await restClient(HTTPS_METHODS.GET, "/users", undefined, undefined, { userRoles: rolesString });
  return res?.data;
};

const getUserWithBodyHealthInfo = async (trainerId: string | undefined = undefined): Promise<IUserWithBodyHealthInfo[]> => {
  const params: any = {};

  if (trainerId) {
    params["trainerId"] = trainerId;
  }
  const res = await restClient(HTTPS_METHODS.GET, `/users/details`, undefined, undefined, params);
  return res?.data;
};

const updateUser = async (userId: string, payload: any) => {
  const res  = await restClient(HTTPS_METHODS.PUT, `/users/${userId}`, payload);
  return res?.data
}

export default {
  signUp,
  getUserByClerkId,
  createBodyHealthInfo,
  getExercisePlansByUserId,
  getUsers,
  getUserWithBodyHealthInfo,
  updateUser
};
