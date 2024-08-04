import { SignupUser } from "../models";
import { HTTPS_METHODS, restClient } from "../utils/restClient";

const signUp = async (payload: SignupUser) => {
    const res = await restClient(HTTPS_METHODS.POST, '/auth/signup', payload)
    return res?.data
}

const getUserByClerkId = async (clerkId: string) => {
    const res = await restClient(HTTPS_METHODS.GET, `/users/${clerkId}`)
    return res?.data
}

export default {
    signUp,
    getUserByClerkId
}