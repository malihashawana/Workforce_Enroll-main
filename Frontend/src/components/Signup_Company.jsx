import React from 'react';
import { Link } from 'react-router-dom';
import Login_Company from './Login_Company';
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from 'react-hot-toast';
function Signup_Company() {
  const {
    register,
    handleSubmit,
    
    formState: { errors },
  } = useForm()

  const onSubmit = async(data) => {
    const userInfo={
      company_name:data.company_name,
      company_email:data.company_email,
      company_address:data.company_address,
      password:data.password,
    }
    await axios.post("http://localhost:4001/user1/signup_company",userInfo)
    .then((res)=>{
      console.log(res.data)
      if(res.data){
        toast.success('Signup Successful');
        //alert("Signup Successful")
      }
      localStorage.setItem("Users",JSON.stringify(res.data));
    }
  ).catch((err)=>{
    //if(err.response){
      console.log(err)
    //alert("Error:" +err.response.data.message);
    //alert("Already Exists")
    toast.error('Already Exists');
    }
  //}

  )
  };
  return (
    <>
    <div className=" flex h-screen items-center justify-center bg-blue-100 dark:bg-slate-600">
    <div className='w-[600px]'>
      <div className='modal-box  dark:bg-slate-900 dark:text-white'>
      <form onSubmit={handleSubmit(onSubmit)} >
      {/* if there is a button in form, it will close the modal */}
      <p><Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link></p>
      
    <div className="flex justify-center mt-4 border-[3px] border-orange-300 py-3 rounded-md">
  <h3 className="font-bold text-2xl cursor-default mt-[-5px] ">Signup-Form</h3>
</div>


<div className='mt-4 space-y-2'>
  <span>Company-Name</span>
  <br/>
  <input 
  type='text'
  placeholder='Enter Company-Name'
  className='w-80 px-3 py-1 border border-orange-300 rounded-md outline-none dark:text-slate-900'{...register("company_name", { required: true })}/>
  <br/>
  {errors.company_name && <span className="text-sm text-red-500">This field is required</span>}
</div>
{/*<div className='mt-4 space-y-2'>
      <span>Company-ID</span>
      <br/>
      <input 
      type='text'
      placeholder='Enter Company-id'
      className='w-80 px-3 py-1 border border-orange-300 rounded-md outline-none dark:text-slate-900'{...register("com_id", { required: true })}/>
      <br/>
      {errors.com_id && <span className="text-sm text-red-500">This field is required</span>}
    </div>*/}

<div className='mt-4 space-y-2'>
  <span>Company Email</span>
  <br/>
  <input 
  type='email'
  placeholder='Enter Company email'
  className='w-80 px-3 py-1 border  border-orange-300 rounded-md outline-none dark:text-slate-900'{...register("company_email", { required: true })}/>
  <br/>
  {errors.company_email && <span className="text-sm text-red-500">This field is required</span>}
</div>


<div className='mt-4 space-y-2'>
      <span>Address</span>
      <br/>
      <input 
      type='text'
      placeholder='Head Office Address '
      className='w-80 px-3 py-1 border border-orange-300 rounded-md outline-none dark:text-slate-900'{...register("company_address", { required: true })}/>
      <br/>
      {errors.company_address && <span className="text-sm text-red-500">This field is required</span>}
    </div>


  <div className='mt-4 space-y-2'>
  <span>Password</span>
  <br/>
  <input 
  type='password'
  placeholder='Enter Password'
  className='w-80 px-3 py-1 border  border-orange-300 rounded-md outline-none dark:text-slate-900'{...register("password", { required: true })}/>
  <br/>
  {errors.password && <span className="text-sm text-red-500">This field is required</span>}
</div>

<div className='flex justify-around mt-8'>
    <button className='bg-purple-600 text-white rounded-md px-3 py-1 hover:bg-purple-800 duration-300 ml-[-20px]'>Signup</button>
    <p>
        Have account? {" "}<button className='underline text-blue-500 cursor-pointer'
        onClick={()=> document.getElementById("my_modal_company").showModal()}>Login</button>{" "}
        <Login_Company/>
    </p>
</div>
</form>
</div>
</div>
    </div>
    </>
  )
}

export default Signup_Company

