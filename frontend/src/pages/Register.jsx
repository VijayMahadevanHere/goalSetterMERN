import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

function Register() {
  "";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const onChange = (e) => {
    setFormData((prevState)=>({
    ...prevState,
    [e.target.name]:e.target.value
    }))
  };
  const onSubmit=(e)=>{
    e.preventDefault()

  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser />
          Register
        </h1>
        <p>Please Create an Account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your Name"
            onChange={onChange}
            id="name"
            name="name"
            value={name}
          />

          </div>
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
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            onChange={onChange}
            id="password2"
            name="password2"
            value={password2}
          />

          </div>
        
          <div className="form-group">
            <button type="submit" className="btn btn-block">Submit</button>
          </div>
        
        </form>
      </section>
    </>
  );
}

export default Register;
