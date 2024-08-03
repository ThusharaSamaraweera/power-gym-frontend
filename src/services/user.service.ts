import { SignupUser } from "../models";
import { HTTPS_METHODS, restClient } from "../utils/restClient";

export const signUp = async (payload: SignupUser) => {
    const res = await restClient(HTTPS_METHODS.POST, '/users', payload)
    return res?.data
}

export default {
    signUp
}