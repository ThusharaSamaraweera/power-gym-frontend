import { SignIn, useUser } from "@clerk/clerk-react";
import React from "react";

const Login = () => {
      const user = useUser();
      console.log("🚀 ~ file: Dashboard.tsx:18 ~ Dashboard ~ user:", user);
  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <SignIn signUpUrl="/sign-up" forceRedirectUrl='/dashboard'  />
    </div>
  );
};

export default Login;
