import React from "react";
import { SignUp as SignUpClerk } from "@clerk/clerk-react";

const SignUp = () => {
  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <SignUpClerk />
    </div>
  );
};

export default SignUp;
