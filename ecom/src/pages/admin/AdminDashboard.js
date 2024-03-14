import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { useAuth } from "../../context/auth";
const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        {/* <h4 className="mt-4">Admin Dashboard</h4> */}
        <div className="row">
          <div className="col-lg-3 col-md-3">
            <AdminMenu />
          </div>
          <div className="col-lg-9 col-md-9">
            <div className="card w-75 p-3">
              <h2 className="text-center">{auth?.user?.name}</h2>
              <h3 className="text-center">{auth?.user?.email}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
