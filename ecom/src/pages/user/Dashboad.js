import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/routes/UserMenu";
import { useAuth } from "../../context/auth";
const Dashboad = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"dashboard"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-lg-3 col-md-3">
            <UserMenu />
          </div>
          <div className="col-lg-9 col-md-9">
            <div className="card w-75 p-3">
              <h2 className="text-center">{auth?.user?.name}</h2>
              <h2 className="text-center">{auth?.user?.email}</h2>
              {/* <h2 className="text-center">{auth?.user?.number}</h2> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboad;
