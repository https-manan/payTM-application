import React from 'react';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';

function Signup() {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <Heading label="Sign Up" />
        <SubHeading label="Enter your information to create an account" />
        
        <div className="mt-4">
          <InputBox label="First Name" placeholder="Manan" />
          <InputBox label="Last Name" placeholder="Bhardwaj" />
          <InputBox label="Email" placeholder="manan@gmail.com" />
          <InputBox label="Password" placeholder="********" />
        </div>

        <div className="pt-4">
          <Button label="Sign Up" />
        </div>

        <div className="pt-2 text-center">
          <BottomWarning label="Already have an account?" />
          <button className="text-blue-600 hover:underline font-medium ml-1">Login</button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
