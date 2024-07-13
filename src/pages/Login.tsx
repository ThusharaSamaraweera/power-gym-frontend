import { SignIn } from '@clerk/clerk-react';
import React from 'react'

const Login = () => {
  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <SignIn />
    </div>
  );
}

export default Login