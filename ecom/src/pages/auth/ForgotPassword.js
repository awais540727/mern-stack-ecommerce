import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [answer, setAnswer] = useState();
  const [newPassword, setNewPassword] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}api/v1/auth/forgot-password`,
        { email, newPassword, answer }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
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
          <h4 className="title">FORGET PASSWORD</h4>
          <div className="mb-3">
            <input
              value={email}
              type="email"
              placeholder="Enter Your Email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              value={answer}
              type="text"
              placeholder="What is your favriout Number"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setAnswer(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              placeholder="Enter Your Password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary rounded">
            Reset Password
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default ForgotPassword;
