import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/routes/UserMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}api/v1/auth/update-profile`,
        { name, email, password, phone, address }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data?.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // get user from auth

  useEffect(() => {
    const { name, email, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, []);

  return (
    <Layout title={"manage profile"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-md-3">
            <UserMenu />
          </div>
          <div className="col-lg-9 col-md-9">
            <div className="form-container">
              <form onSubmit={handleUpdateSubmit}>
                <h4 className="title">Manage Profile</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    className="form-control"
                    placeholder="Enter Your Name"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <input
                    value={email}
                    type="email"
                    placeholder="Enter Your Email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    placeholder="Enter Your Password"
                    className="form-control"
                    id="exampleInputPassword1"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    placeholder="Enter Your Phone"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={(e) => setPhone(e.target.value)}
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
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
