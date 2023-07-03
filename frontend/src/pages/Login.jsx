import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import {toast} from 'react-toastify'
import {useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/spinner";
import { login } from "../features/auth/authSlice";

function Login() {
const dispatch=useDispatch()
const navigate=useNavigate()
const{user,isLoading,isSuccess,isError,message}=useSelector((state)=>state.auth)

useEffect(()=>{
  if(isError){
    toast.error(message)
  }
  if(isSuccess || user){
    navigate('/')
  }


},[user,isSuccess,isError,message,navigate])
  
  const [formData, setFormData] = useState({
   
    email: "",
    password: "",
   
  });
  const {email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState)=>({
    ...prevState,
    [e.target.name]:e.target.value
    }))
  };

  const onSubmit=(e)=>{
    e.preventDefault()
    let userData={
      email,
      password
    }
    dispatch(login(userData))

  }
  if(isLoading){
    return <Spinner/>
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />
           Login
        </h1>
        <p>Login For Setting The Goals</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>  
          <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            onChange={onChange}
            id="email"
            name="email"
            value={email}
          />

          </div>
          <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={onChange}
            id="password"
            name="password"
            value={password}
          />

          </div>
        
        
          <div className="form-group">
            <button type="submit" className="btn btn-block">Login</button>
          </div>
        
        </form>
      </section>
    </>
  );
}

export default Login;
