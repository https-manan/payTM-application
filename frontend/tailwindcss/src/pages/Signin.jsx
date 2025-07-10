import React from 'react';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';

function Signin() {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <Heading label="Sign In" />
        <SubHeading label="Enter your credentials to access your account" />
        
        <div className="mt-4">
          <InputBox label="UserName" placeholder="https.manan" />
          <InputBox label="Password" placeholder="******" />
        </div>

        <div className="pt-4">
          <Button label="Sign In" />
        </div>

        <div className="pt-2 text-center">
          <BottomWarning label="Don’t have an account?" />
          <button className="text-blue-600 hover:underline font-medium ml-1">Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default Signin;
