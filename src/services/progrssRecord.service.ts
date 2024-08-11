import { ProgressRecordInfo } from "../models";
import { HTTPS_METHODS, restClient } from "../utils/restClient";

export const createProgressRecord = async (memberId: string, progressRecord: any) => {
  const res = await restClient(HTTPS_METHODS.POST, `users/${memberId}/progressRecords`, progressRecord);
  console.log("🚀 ~ file: progrssRecord.service.ts:7 ~ createProgressRecord ~ res:", res);
  return res.data;
};

export const getProgressRecordsByUserId = async (memberId: string) => {
  const res = await restClient(HTTPS_METHODS.GET, `users/${memberId}/progressRecords`);
  return res.data;
};
