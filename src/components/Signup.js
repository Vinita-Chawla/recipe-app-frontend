import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [profile, setProfile] = useState();

  const navigate = useNavigate();

  useEffect(()=>{
    let auth = localStorage.getItem("user");
    if(auth){
      navigate("/")
    }
  },[navigate])


  const handleData = async()=>{
    let formdata = new FormData();
    formdata.append("name", name)
    formdata.append("email", email)
    formdata.append("password", password)
    formdata.append("profile", profile)
    formdata.append("premium", false)

    let response = await axios.post("https://recipe-app-backend-orcin.vercel.app/auth/register", formdata);
    console.log(response.data)
    if(response.data){
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("auth", JSON.stringify(response.data.auth));
      setName(""); setEmail(""); setPassword("");
      navigate("/")
    }
  }

  return (
    <div className='mt-[8rem] flex flex-col justify-center gap-[1rem] max-w-[30rem] mx-auto'>
      <h2 className='mb-[1.5rem] text-[#674188] font-bold text-[2rem]'>Register</h2>

      <p>
          Please fill in this form to create an account. or
          &nbsp;  <Link className='text-[#674188] font-semibold' to="/login">Login</Link>
        </p>

      <div className='w-full flex flex-col items-center gap-[1rem]'>
      <input type='text' placeholder='Enter Name' className='w-full py-[0.6rem] px-[1rem] border-solid border-[1px] border-black rounded' onChange={(e)=> setName(e.target.value)} value={name}/>

      <input type='text' placeholder='Enter Email' className='w-full py-[0.6rem] px-[1rem] border-solid border-[1px] border-black rounded' onChange={(e)=> setEmail(e.target.value)} value={email}/>

      <input type='password' placeholder='Enter Password' className='w-full py-[0.6rem] px-[1rem] border-solid border-[1px] border-black rounded' onChange={(e)=> setPassword(e.target.value)} value={password}/>

      <input type='file' name='profile' onChange={(e)=> setProfile(e.target.files[0])} className='w-full py-[0.6rem] px-[1rem]'/>

      <button className='px-[1.5rem] py-[0.4rem] bg-[#674188] rounded mt-[1rem] text-white shadow-md shadow-black-300/40 ' onClick={handleData}>Signup</button>
      </div>
    </div>
  )
}

export default Signup;
