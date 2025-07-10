import{ use, useState } from 'react';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';
import axios from 'axios'

function Signup() {
  const [firstname,setFirstName] = useState('');
  const [lastname,setLastName] = useState('');
  const [username,setUserName] = useState('');
  const [password,setPassword] = useState('');
  return (
    <div className="h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <Heading label="Sign Up" />
        <SubHeading label="Enter your information to create an account" />
        
        <div className="mt-4">
          <InputBox onChange={(e)=>{setFirstName(e.target.value)}} label="First Name"  value={firstname} placeholder="Manan" />
          <InputBox onChange={(e)=>{setLastName(e.target.value)}}  value={lastname} label="Last Name" placeholder="Bhardwaj" />
          <InputBox onChange={(e)=>{setUserName(e.target.value)}}  value={username} label="Username" placeholder="https.manan" />
          <InputBox onChange={(e)=>{setPassword(e.target.value)}}  value={password} label="Password" placeholder="********" />
        </div>

        <div className="pt-4">
<Button onClick={async () => {
 await axios.post('http://localhost:8080/api/v1/user/signup', {
    username,
    password,
    firstName: firstname,
    lastName: lastname
  }).then(res => {
    console.log("Signup success", res.data);
  }).catch(err => {
    console.error("Signup failed", err.response?.data || err.message);
  });
  localStorage.setItem('Token',response.data.token);
  localStorage.removeItem('Token');
}} label="Sign Up" />
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
