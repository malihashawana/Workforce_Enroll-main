import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from 'react-hot-toast';

function Login_Company() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async(data) => {
    const userInfo={
      company_name:data.company_name,
      company_email:data.company_email,
      password:data.password,
    }
    await axios.post("http://localhost:4001/user1/login_company",userInfo)
    .then((res)=>{
      console.log(res.data)
      if(res.data){
        //alert("Login Successful")
        toast.success('Login Successful');
      }
      localStorage.setItem("Users",JSON.stringify(res.data));
    }
  ).catch((err)=>{
    if(err.response){
      console.log(err)
    //alert("Error:" +err.response.data.message);
    //alert("Wrong Email or Password")
    toast.error("Error:" +err.response.data.message);
    }
  }

  )
  //}; // Log form data for testing
    document.getElementById("my_modal_company").close();
    //console.log(data);
    //document.getElementById("my_modal_company").close(); // Close modal on successful form submission
  };

  const handleCloseModal = (event) => {
    event.preventDefault(); // Prevent form submission
    document.getElementById("my_modal_company").close(); // Close modal
    navigate("/"); // Redirect to home route
  };
  return (
    <div>
      <dialog id="my_modal_company" className="modal">
  <div className="modal-box  dark:bg-slate-900 dark:text-white">
    <form onSubmit={handleSubmit(onSubmit)} >
      
      {/*<p><Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link></p>*/}
      {/*<Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=> document.getElementById("my_modal_company").showModal()}>✕</Link>*/}
      <button
              type="button"
              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
              onClick={handleCloseModal}
            >
              ✕
            </button>
    
  <h3 className="font-bold text-lg cursor-default">Company Login</h3>

    <div className='mt-4 space-y-2'>
      <span>Company-Name</span>
      <br/>
      <input 
      type='text'
      placeholder='Enter Company-name'
      className='w-80 px-3 py-1 border rounded-md outline-none dark:text-slate-900'
      {...register("company_name", { required: true })}/>
  <br/>
  {errors.company_name && <span className="text-sm text-red-500">This field is required</span>}
    </div>
    <div className='mt-4 space-y-2'>
      <span>Company-Email</span>
      <br/>
      <input 
      type='email'
      placeholder='Enter Company-email'
      className='w-80 px-3 py-1 border rounded-md outline-none dark:text-slate-900'
      {...register("company_email", { required: true })}/>
  <br/>
  {errors.company_email && <span className="text-sm text-red-500">This field is required</span>}
    </div>

    {/*<div className='mt-4 space-y-2'>
      <span>Company-ID</span>
      <br/>
      <input 
      type='text'
      placeholder='Enter Company-id'
      className='w-80 px-3 py-1 border rounded-md outline-none dark:text-slate-900'
      {...register("companyId", { required: true })}/>
  <br/>
  {errors.companyId && <span className="text-sm text-red-500">This field is required</span>}
    </div>*/}

    <div className='mt-4 space-y-2'>
      <span>Password</span>
      <br/>
      <input 
      type='password'
      placeholder='Enter Password'
      className='w-80 px-3 py-1 border rounded-md outline-none dark:text-slate-900' {...register("password", { required: true })}/>
      <br/>
      {errors.password && <span className="text-sm text-red-500">This field is required</span>}
    </div>

    <div className='flex justify-around mt-4'>
    <button className='bg-purple-500 text-white rounded-md px-3 py-1 hover:bg-purple-700 duration-300' type="submit">Login</button>
    <p>
    Not registered? <Link to="/signup_company" className='underline text-blue-500 cursor-pointer'>Signup</Link>{" "}
    </p>
</div>
</form>
  </div>
</dialog>
    </div>
  )
}

export default Login_Company
