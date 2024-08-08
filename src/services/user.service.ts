import { BodyHealthInfoDto, BodyHealthInfoPayload, SignupUser } from "../models";
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

export default {
  signUp,
  getUserByClerkId,
  createBodyHealthInfo,
};
