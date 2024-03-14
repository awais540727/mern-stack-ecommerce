import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import "../../styles/Register.css";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [answer, setAnswer] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(process.env.REACT_APP_API);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}api/v1/auth/register`,
        { name, email, password, phone, address, answer }
      );

      if (res.data.success) {
        console.log(res.data.success);
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              className="form-control"
              placeholder="Enter Your Name"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            {/* <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label> */}
            <input
              value={email}
              type="email"
              placeholder="Enter Your Email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            {/* <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label> */}
            <input
              type="password"
              value={password}
              placeholder="Enter Your Password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            {/* <label htmlFor="exampleInputEmail1" className="form-label">
              Phone
            </label> */}
            <input
              type="text"
              value={phone}
              placeholder="Enter Your Phone"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              placeholder="Enter Your Address"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              placeholder="What is your favriout number"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Register;
