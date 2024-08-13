import React, { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import userService from "../services/user.service";
import { SignupUser, UserRoles } from "../models";
import { Radio } from "antd";

const userRoleOptions = [
  { label: "Member", value: UserRoles.MEMBER },
  { label: "Coach", value: UserRoles.TRAINER },
];
const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmail] = useState("");
  const [userRole, setUserRole] = useState(UserRoles.MEMBER);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  // Form Submit
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName: firstName,
        lastName: lastName,
        emailAddress: email,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Verify User Email Code
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPressVerify = async (e: any) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });

        const payload: SignupUser = {
          name: `${completeSignUp?.firstName} ${completeSignUp?.lastName}`,
          email: completeSignUp?.emailAddress ?? "",
          role: UserRoles.TRAINER,
          clerkUserId: completeSignUp?.createdUserId ?? "",
        };
        await userService.signUp(payload);
        navigate("/login");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const handleOnChangeUser = (e: any) => {
    setUserRole(e.target.value);
  };

  return (
    <div className='border rounded h-screen w-full flex items-center'>
      <div className='w-1/2 px-10'>
        <div className='flex gap-4 h-20 justify-center'>
          <img src='/logo.png' alt='logo' className='w-20 h-auto' />
          <div className='flex items-center'>
            <div className='text-4xl font-bold border-red-500 border-solid border-b-4'>POWER GYM</div>
          </div>
        </div>
        <div className='text-lg text-center mb-8 text-gray-500 font-medium pb-2'>Enter your details below to create your account</div>
        {!pendingVerification && (
          <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6'>
            <div className='flex gap-5 items-center'>
              <label className='block text-xl text-gray-900 font-semibold'>I want to register as a </label>
              <Radio.Group options={userRoleOptions} onChange={handleOnChangeUser} value={userRole} optionType='button' buttonStyle='solid' />
            </div>
            <div>
              <label htmlFor='firstName' className='block mb-2 text-sm font-medium text-gray-900'>
                First Name
              </label>
              <input
                type='text'
                name='firstName'
                id='firstName'
                onChange={(e) => setFirstName(e.target.value)}
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5'
                required={true}
              />
            </div>
            <div>
              <label htmlFor='lastName' className='block mb-2 text-sm font-medium text-gray-900'>
                Last Name
              </label>
              <input
                type='text'
                name='lastName'
                id='lastName'
                onChange={(e) => setLastName(e.target.value)}
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5'
                required={true}
              />
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900'>
                Email Address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                onChange={(e) => setEmail(e.target.value)}
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5'
                placeholder='name@company.com'
                required={true}
              />
            </div>
            <div>
              <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900'>
                Password
              </label>
              <input
                type='password'
                name='password'
                id='password'
                onChange={(e) => setPassword(e.target.value)}
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5'
                required={true}
              />
            </div>
            <button type='submit' className='w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
              Create an account
            </button>
          </form>
        )}
        {pendingVerification && (
          <div>
            <form className='space-y-4 md:space-y-6'>
              <input
                value={code}
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5'
                placeholder='Enter Verification Code...'
                onChange={(e) => setCode(e.target.value)}
              />
              <button
                type='submit'
                onClick={onPressVerify}
                className='w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                Verify Email
              </button>
            </form>
          </div>
        )}
      </div>
      <div className='w-1/2'>
        <img src='/sign-up-image.png' alt='signup' className='h-screen w-full object-cover' />
      </div>
    </div>
  );
};

export default SignUp;
